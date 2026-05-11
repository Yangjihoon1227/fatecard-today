const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 8787);
const API_ONLY = process.argv.includes("--api-only");
const SITE_URL = process.env.SITE_URL || "";
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "server", "data");
const DATA_FILE = path.join(DATA_DIR, "metrics.json");
const DIST_DIR = path.join(ROOT, "dist");

fs.mkdirSync(DATA_DIR, { recursive: true });

const ALLOWED_TIMEZONES = new Set([
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "Asia/Jakarta",
  "Asia/Bangkok",
  "Asia/Kolkata"
]);

function isValidTimeZone(tz) {
  if (typeof tz !== "string" || tz.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

function normalizeTimeZone(tz) {
  if (isValidTimeZone(tz)) return tz;
  return "Asia/Seoul";
}

function dateKeyForTimeZone(timeZone, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function nextResetForTimeZone(timeZone) {
  const now = Date.now();
  const currentKey = dateKeyForTimeZone(timeZone, new Date(now));
  let lo = now;
  let hi = now + 48 * 60 * 60 * 1000;
  while (dateKeyForTimeZone(timeZone, new Date(hi)) === currentKey) {
    hi += 24 * 60 * 60 * 1000;
  }
  for (let i = 0; i < 42; i++) {
    const mid = Math.floor((lo + hi) / 2);
    if (dateKeyForTimeZone(timeZone, new Date(mid)) === currentKey) lo = mid;
    else hi = mid;
  }
  return new Date(hi).toISOString();
}

function kstStamp() {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function emptyMetrics() {
  return {
    totalPageViews: 0,
    draws: 0,
    shares: 0,
    lastVisitKst: null,
    daily: {},
    visitors: {},
    drawLocks: {}
  };
}

function readMetrics() {
  try {
    if (!fs.existsSync(DATA_FILE)) return emptyMetrics();
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    return {
      ...emptyMetrics(),
      ...raw,
      daily: raw.daily || {},
      visitors: raw.visitors || {},
      drawLocks: raw.drawLocks || {}
    };
  } catch {
    return emptyMetrics();
  }
}

function writeMetrics(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function parseCookies(req) {
  const out = {};
  (req.headers.cookie || "").split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx >= 0) out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1));
  });
  return out;
}

function visitorId(req) {
  let id = parseCookies(req).fate_vid;
  if (!id || !/^[a-f0-9]{32}$/.test(id)) id = crypto.randomBytes(16).toString("hex");
  return id;
}

function cookieHeader(id) {
  return `fate_vid=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`;
}

function sendJson(res, status, obj, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); }
    });
  });
}

function cleanupOldDrawLocks(data) {
  const now = Date.now();
  const maxAge = 14 * 24 * 60 * 60 * 1000;
  for (const [key, value] of Object.entries(data.drawLocks || {})) {
    if (!value || typeof value.ts !== "number" || now - value.ts > maxAge) delete data.drawLocks[key];
  }
}

function metricsPublic(data, timeZone) {
  const dateKey = dateKeyForTimeZone(timeZone);
  const dailyKey = `${timeZone}|${dateKey}`;
  const daily = data.daily[dailyKey] || { pageViews: 0, visitors: {} };
  return {
    totalPageViews: Number(data.totalPageViews || 0),
    uniqueVisitors: Object.keys(data.visitors || {}).length,
    todayPageViews: Number(daily.pageViews || 0),
    todayUniqueVisitors: Object.keys(daily.visitors || {}).length,
    draws: Number(data.draws || 0),
    shares: Number(data.shares || 0),
    lastVisitKst: data.lastVisitKst,
    dateKey,
    timeZone,
    nextResetIso: nextResetForTimeZone(timeZone),
    accuracy: "server_cookie_daily_draw_lock",
    siteUrl: SITE_URL
  };
}

function getQuery(req) {
  try {
    return new URL(req.url, "http://127.0.0.1").searchParams;
  } catch {
    return new URLSearchParams();
  }
}

async function handleApi(req, res) {
  const id = visitorId(req);
  const params = getQuery(req);

  if (req.method === "GET" && req.url.startsWith("/api/health")) {
    return sendJson(res, 200, { ok: true, siteUrl: SITE_URL, timeKst: kstStamp() });
  }

  if (req.method === "GET" && req.url.startsWith("/api/config")) {
    const host = req.headers.host ? `${req.socket.encrypted ? "https" : "http"}://${req.headers.host}` : "";
    return sendJson(res, 200, {
      ok: true,
      siteUrl: SITE_URL || host,
      configuredSiteUrl: SITE_URL,
      hostUrl: host,
      sponsorEmail: process.env.SPONSOR_EMAIL || "tbvjrkrh@gmail.com",
      supportUrl: process.env.SUPPORT_URL || "",
      premiumUrl: process.env.PREMIUM_URL || ""
    });
  }

  if (req.method === "GET" && req.url.startsWith("/api/metrics")) {
    const tz = normalizeTimeZone(params.get("timeZone") || "Asia/Seoul");
    const data = readMetrics();
    return sendJson(res, 200, { ok: true, metrics: metricsPublic(data, tz) });
  }

  if (req.method === "POST" && req.url.startsWith("/api/visit")) {
    const payload = await readBody(req);
    const timeZone = normalizeTimeZone(payload.timeZone || params.get("timeZone") || "Asia/Seoul");
    const locale = String(payload.locale || "en").slice(0, 12);
    const data = readMetrics();
    const dateKey = dateKeyForTimeZone(timeZone);
    const dailyKey = `${timeZone}|${dateKey}`;
    if (!data.daily[dailyKey]) data.daily[dailyKey] = { pageViews: 0, visitors: {} };

    const firstEver = !data.visitors[id];
    const firstToday = !data.daily[dailyKey].visitors[id];

    data.totalPageViews = Number(data.totalPageViews || 0) + 1;
    data.daily[dailyKey].pageViews = Number(data.daily[dailyKey].pageViews || 0) + 1;
    data.visitors[id] = data.visitors[id] || { firstSeen: Date.now(), firstSeenKst: kstStamp() };
    data.visitors[id].lastSeen = Date.now();
    data.visitors[id].lastSeenKst = kstStamp();
    data.visitors[id].locale = locale;
    data.visitors[id].timeZone = timeZone;
    data.daily[dailyKey].visitors[id] = true;
    data.lastVisitKst = kstStamp();

    cleanupOldDrawLocks(data);
    writeMetrics(data);
    return sendJson(res, 200, {
      ok: true,
      firstEver,
      firstToday,
      metrics: metricsPublic(data, timeZone)
    }, { "Set-Cookie": cookieHeader(id) });
  }

  if (req.method === "POST" && req.url.startsWith("/api/daily-status")) {
    const payload = await readBody(req);
    const timeZone = normalizeTimeZone(payload.timeZone || params.get("timeZone") || "Asia/Seoul");
    const data = readMetrics();
    const dateKey = dateKeyForTimeZone(timeZone);
    const lockKey = `${id}|${timeZone}|${dateKey}`;
    const lock = data.drawLocks[lockKey] || null;
    return sendJson(res, 200, {
      ok: true,
      drawnToday: Boolean(lock),
      cardId: lock?.cardId || null,
      dateKey,
      timeZone,
      nextResetIso: nextResetForTimeZone(timeZone),
      metrics: metricsPublic(data, timeZone)
    }, { "Set-Cookie": cookieHeader(id) });
  }

  if (req.method === "POST" && req.url.startsWith("/api/draw")) {
    const payload = await readBody(req);
    const timeZone = normalizeTimeZone(payload.timeZone || params.get("timeZone") || "Asia/Seoul");
    const locale = String(payload.locale || "en").slice(0, 12);
    const requestedCardId = String(payload.cardId || "danger-genius").slice(0, 80);
    const data = readMetrics();
    const dateKey = dateKeyForTimeZone(timeZone);
    const lockKey = `${id}|${timeZone}|${dateKey}`;

    cleanupOldDrawLocks(data);

    if (data.drawLocks[lockKey]) {
      writeMetrics(data);
      return sendJson(res, 200, {
        ok: true,
        allowed: false,
        drawnToday: true,
        reason: "already_drawn_today",
        cardId: data.drawLocks[lockKey].cardId,
        dateKey,
        timeZone,
        nextResetIso: nextResetForTimeZone(timeZone),
        metrics: metricsPublic(data, timeZone)
      }, { "Set-Cookie": cookieHeader(id) });
    }

    data.drawLocks[lockKey] = {
      cardId: requestedCardId,
      ts: Date.now(),
      drawAtKst: kstStamp(),
      locale,
      timeZone,
      dateKey
    };
    data.draws = Number(data.draws || 0) + 1;
    writeMetrics(data);
    return sendJson(res, 200, {
      ok: true,
      allowed: true,
      drawnToday: true,
      cardId: requestedCardId,
      dateKey,
      timeZone,
      nextResetIso: nextResetForTimeZone(timeZone),
      metrics: metricsPublic(data, timeZone)
    }, { "Set-Cookie": cookieHeader(id) });
  }

  if (req.method === "POST" && req.url.startsWith("/api/share")) {
    await readBody(req);
    const timeZone = normalizeTimeZone(params.get("timeZone") || "Asia/Seoul");
    const data = readMetrics();
    data.shares = Number(data.shares || 0) + 1;
    writeMetrics(data);
    return sendJson(res, 200, { ok: true, metrics: metricsPublic(data, timeZone) });
  }

  return sendJson(res, 404, { ok: false, error: "not_found" });
}

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".json")) return "application/json; charset=utf-8";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

function serveStatic(req, res) {
  if (API_ONLY) return sendJson(res, 404, { ok: false, error: "api_only" });
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  let file = path.normalize(path.join(DIST_DIR, urlPath));
  if (!file.startsWith(DIST_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(file)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Run npm run build first, or use npm run dev.");
  }
  res.writeHead(200, { "Content-Type": contentType(file) });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => req.url.startsWith("/api/") ? handleApi(req, res) : serveStatic(req, res))
  .listen(PORT, "0.0.0.0", () => {
    console.log(`[FateCard.today] API/server listening on http://127.0.0.1:${PORT}`);
    console.log(`[FateCard.today] metrics file: ${DATA_FILE}`);
  });
