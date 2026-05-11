import { useEffect, useMemo, useRef, useState } from "react";
import { TAROT_DECK, getTarotText } from "./tarotDeck";

type Lang = "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt";
type FateCard = {
  id: string;
  orientation: "upright" | "reversed";
  arcana: "major" | "minor";
  luckyColor: string;
  luckyNumber: number;
  symbol: string;
  archetype: string;
  title: string;
  subtitle: string;
  aura: string;
  tone: string;
  warning: string;
  mission: string;
  love: number;
  money: number;
  work: number;
  mind: number;
};
type Metrics = {
  totalPageViews: number;
  uniqueVisitors: number;
  todayPageViews: number;
  todayUniqueVisitors: number;
  draws: number;
  shares: number;
  lastVisitKst: string | null;
  dateKey: string;
  timeZone: string;
  nextResetIso: string;
  accuracy: string;
  siteUrl?: string;
};
type DailyStatus = {
  drawnToday: boolean;
  cardId: string | null;
  dateKey: string;
  timeZone: string;
  nextResetIso: string;
};

const DEFAULT_EMAIL = "tbvjrkrh@gmail.com"; type RuntimeConfig = { siteUrl: string; configuredSiteUrl: string; hostUrl: string; sponsorEmail: string; supportUrl: string; premiumUrl: string; };

const LANGS: Record<Lang, { label: string; native: string; locale: string; timeZone: string | "device" }> = {
  en: { label: "English", native: "English", locale: "en-US", timeZone: "device" },
  ko: { label: "Korean", native: "한국어", locale: "ko-KR", timeZone: "Asia/Seoul" },
  ja: { label: "Japanese", native: "日本語", locale: "ja-JP", timeZone: "Asia/Tokyo" },
  zh: { label: "Chinese", native: "中文", locale: "zh-CN", timeZone: "Asia/Shanghai" },
  es: { label: "Spanish", native: "Español", locale: "es-ES", timeZone: "Europe/Madrid" },
  fr: { label: "French", native: "Français", locale: "fr-FR", timeZone: "Europe/Paris" },
  de: { label: "German", native: "Deutsch", locale: "de-DE", timeZone: "Europe/Berlin" },
  pt: { label: "Portuguese", native: "Português", locale: "pt-BR", timeZone: "America/Sao_Paulo" }
};

const UI: Record<Lang, any> = {
  en: {
    brandSmall: "One card for today · one draw per local day",
    ad: "Ad & sponsor inquiries",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "One card.\nToday’s fate.",
    desc: "FateCard.today gives each visitor one daily fate card. The result is for entertainment and self-reflection only, not medical, legal, or financial advice.",
    nickname: "Nickname",
    birth: "Birth date",
    optional: "optional",
    placeholder: "e.g. Luna",
    draw: "Draw today’s card",
    locked: "Already drawn today",
    show: "Show today’s card",
    reset: "Resets at local midnight",
    lockedNotice: "You already drew today’s card. Come back after midnight in the selected time zone.",
    metrics: ["Total visits", "Unique visitors", "Today visits", "Today unique", "Draws", "Shares"],
    love: "Love", money: "Money", work: "Work", mind: "Mind",
    warning: "Warning", mission: "Mission",
    save: "Save share card", copy: "Copy share text", copied: "Copied",
    nativeShare: "Share", copyLink: "Copy link", shareX: "Share on X",
    entertainment: "Entertainment only · Not medical, legal, or financial advice.",
    visitorOk: "Visitor metrics are recorded by the server using a cookie-based daily counter.",
    visitorLoading: "Checking visitor server...",
    visitorOffline: "Visitor API failed. Run npm run dev so the Node API starts together.",
    language: "Language"
  },
  ko: {
    brandSmall: "하루 한 장 · 선택 언어 시간대 기준 1일 1회",
    ad: "광고/스폰서 문의",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "하루 한 장,\n오늘의 운명카드.",
    desc: "FateCard.today는 방문자 한 명당 하루 한 장의 운명카드를 제공한다. 결과는 재미/자기성찰용이며 건강·투자·법률 판단에 쓰면 안 된다.",
    nickname: "닉네임",
    birth: "생년월일",
    optional: "선택",
    placeholder: "예: Jisoo",
    draw: "오늘의 카드 뽑기",
    locked: "오늘 카드는 이미 뽑음",
    show: "오늘 카드 보기",
    reset: "선택 언어 시간대 00시에 초기화",
    lockedNotice: "오늘 카드는 이미 뽑았다. 선택한 언어/국가 시간대의 00시 이후 다시 뽑을 수 있다.",
    metrics: ["누적 방문", "고유 방문자", "오늘 방문", "오늘 고유", "카드 뽑기", "공유"],
    love: "연애", money: "돈", work: "일", mind: "멘탈",
    warning: "오늘의 경고", mission: "오늘의 미션",
    save: "공유 카드 저장", copy: "공유 문구 복사", copied: "복사됨",
    nativeShare: "공유하기", copyLink: "링크 복사", shareX: "X에 공유",
    entertainment: "Entertainment only · Not medical, legal, or financial advice.",
    visitorOk: "방문자수는 서버 쿠키 기반으로 기록 중이다.",
    visitorLoading: "방문자 서버 연결 확인 중...",
    visitorOffline: "방문자 API 연결 실패. npm run dev로 서버가 함께 실행되어야 한다.",
    language: "언어"
  },
  ja: {
    brandSmall: "1日1枚 · 選択言語のタイムゾーンでリセット",
    ad: "広告/スポンサーのお問い合わせ",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "一日一枚。\n今日の運命カード。",
    desc: "FateCard.today は一人につき一日一枚のカードを提供します。娯楽と自己理解のための内容です。",
    nickname: "ニックネーム", birth: "生年月日", optional: "任意", placeholder: "例: Sora",
    draw: "今日のカードを引く", locked: "今日はすでに引きました", show: "今日のカードを見る",
    reset: "選択タイムゾーンの午前0時にリセット", lockedNotice: "今日のカードはすでに引かれています。選択したタイムゾーンの午前0時以降に戻ってください。",
    metrics: ["総訪問", "ユニーク", "今日の訪問", "今日のユニーク", "ドロー", "共有"],
    love: "恋愛", money: "お金", work: "仕事", mind: "心",
    warning: "警告", mission: "ミッション", save: "カード保存", copy: "共有文をコピー", copied: "コピー済み",
    nativeShare: "共有", copyLink: "リンクをコピー", shareX: "Xで共有",
    entertainment: "娯楽用です。医療・法律・金融助言ではありません。",
    visitorOk: "訪問者数はサーバーのCookieベースで記録されます。", visitorLoading: "サーバー確認中...", visitorOffline: "API接続失敗。", language: "言語"
  },
  zh: {
    brandSmall: "每天一张 · 按所选语言时区重置",
    ad: "广告/赞助咨询",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "每天一张。\n今日命运卡。",
    desc: "FateCard.today 每位访客每天只能抽一张卡。结果仅供娱乐和自我反思。",
    nickname: "昵称", birth: "出生日期", optional: "可选", placeholder: "例如: Luna",
    draw: "抽取今日卡", locked: "今天已抽取", show: "查看今日卡",
    reset: "所选时区 00:00 重置", lockedNotice: "你今天已经抽过卡。请在所选时区午夜后再来。",
    metrics: ["总访问", "独立访客", "今日访问", "今日独立", "抽卡", "分享"],
    love: "爱情", money: "金钱", work: "工作", mind: "心态",
    warning: "提醒", mission: "任务", save: "保存分享卡", copy: "复制分享文案", copied: "已复制",
    nativeShare: "分享", copyLink: "复制链接", shareX: "分享到 X",
    entertainment: "仅供娱乐，不构成医疗、法律或金融建议。",
    visitorOk: "访客数由服务器 Cookie 计数。", visitorLoading: "正在检查服务器...", visitorOffline: "API 连接失败。", language: "语言"
  },
  es: {
    brandSmall: "Una carta al día · reinicio por zona horaria",
    ad: "Contacto para anuncios/patrocinios",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "Una carta.\nTu destino de hoy.",
    desc: "FateCard.today ofrece una carta diaria por visitante. Es entretenimiento y reflexión personal.",
    nickname: "Nombre", birth: "Fecha de nacimiento", optional: "opcional", placeholder: "ej. Luna",
    draw: "Sacar carta de hoy", locked: "Ya sacaste la carta", show: "Ver carta de hoy",
    reset: "Se reinicia a medianoche local", lockedNotice: "Ya sacaste la carta de hoy. Vuelve después de medianoche en la zona seleccionada.",
    metrics: ["Visitas", "Visitantes", "Visitas hoy", "Únicos hoy", "Cartas", "Compartidos"],
    love: "Amor", money: "Dinero", work: "Trabajo", mind: "Mente",
    warning: "Advertencia", mission: "Misión", save: "Guardar tarjeta", copy: "Copiar texto", copied: "Copiado",
    nativeShare: "Compartilhar", copyLink: "Copiar link", shareX: "Compartilhar no X",
    entertainment: "Solo entretenimiento. No es consejo médico, legal o financiero.",
    visitorOk: "Las métricas se registran en servidor con cookie.", visitorLoading: "Comprobando servidor...", visitorOffline: "Falló la API.", language: "Idioma"
  },
  fr: {
    brandSmall: "Une carte par jour · réinitialisation locale",
    ad: "Contact publicité/sponsor",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "Une carte.\nLe destin du jour.",
    desc: "FateCard.today donne une carte quotidienne par visiteur. C’est un divertissement et une réflexion personnelle.",
    nickname: "Pseudo", birth: "Date de naissance", optional: "optionnel", placeholder: "ex. Luna",
    draw: "Tirer la carte", locked: "Déjà tirée aujourd’hui", show: "Voir la carte",
    reset: "Réinitialisation à minuit", lockedNotice: "Vous avez déjà tiré la carte du jour. Revenez après minuit dans le fuseau choisi.",
    metrics: ["Visites", "Visiteurs", "Visites/jour", "Uniques/jour", "Tirages", "Partages"],
    love: "Amour", money: "Argent", work: "Travail", mind: "Mental",
    warning: "Avertissement", mission: "Mission", save: "Sauver la carte", copy: "Copier le texte", copied: "Copié",
    nativeShare: "Partager", copyLink: "Copier le lien", shareX: "Partager sur X",
    entertainment: "Divertissement uniquement. Pas un conseil médical, légal ou financier.",
    visitorOk: "Les métriques sont enregistrées côté serveur.", visitorLoading: "Vérification serveur...", visitorOffline: "Échec API.", language: "Langue"
  },
  de: {
    brandSmall: "Eine Karte pro Tag · Reset nach Zeitzone",
    ad: "Werbung/Sponsoring",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "Eine Karte.\nDein heutiges Schicksal.",
    desc: "FateCard.today gibt jedem Besucher eine tägliche Karte. Nur Unterhaltung und Selbstreflexion.",
    nickname: "Name", birth: "Geburtsdatum", optional: "optional", placeholder: "z.B. Luna",
    draw: "Heutige Karte ziehen", locked: "Heute schon gezogen", show: "Heutige Karte anzeigen",
    reset: "Reset um lokaler Mitternacht", lockedNotice: "Du hast die heutige Karte bereits gezogen. Komm nach Mitternacht der gewählten Zeitzone zurück.",
    metrics: ["Besuche", "Besucher", "Heute", "Heute eindeutig", "Ziehungen", "Shares"],
    love: "Liebe", money: "Geld", work: "Arbeit", mind: "Mind",
    warning: "Warnung", mission: "Mission", save: "Karte speichern", copy: "Text kopieren", copied: "Kopiert",
    nativeShare: "Teilen", copyLink: "Link kopieren", shareX: "Auf X teilen",
    entertainment: "Nur Unterhaltung. Keine medizinische, rechtliche oder finanzielle Beratung.",
    visitorOk: "Metriken werden serverseitig per Cookie gezählt.", visitorLoading: "Serverprüfung...", visitorOffline: "API fehlgeschlagen.", language: "Sprache"
  },
  pt: {
    brandSmall: "Uma carta por dia · reinicia no horário local",
    ad: "Anúncios/patrocínios",
    eyebrow: "ONE CARD FOR TODAY",
    headline: "Uma carta.\nSeu destino hoje.",
    desc: "FateCard.today dá uma carta diária por visitante. É entretenimento e autorreflexão.",
    nickname: "Apelido", birth: "Data de nascimento", optional: "opcional", placeholder: "ex. Luna",
    draw: "Tirar carta de hoje", locked: "Já tirou hoje", show: "Ver carta de hoje",
    reset: "Reinicia à meia-noite local", lockedNotice: "Você já tirou a carta de hoje. Volte depois da meia-noite no fuso selecionado.",
    metrics: ["Visitas", "Visitantes", "Hoje", "Únicos hoje", "Cartas", "Compart."],
    love: "Amor", money: "Dinheiro", work: "Trabalho", mind: "Mente",
    warning: "Aviso", mission: "Missão", save: "Salvar cartão", copy: "Copiar texto", copied: "Copiado",
    nativeShare: "Compartilhar", copyLink: "Copiar link", shareX: "Compartilhar no X",
    entertainment: "Somente entretenimento. Não é conselho médico, legal ou financeiro.",
    visitorOk: "Métricas registradas no servidor com cookie.", visitorLoading: "Verificando servidor...", visitorOffline: "API falhou.", language: "Idioma"
  }
};

const BASE_CARDS = TAROT_DECK;


function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
function hashString(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function detectDeviceTimeZone() { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul"; }
function getTimeZone(lang: Lang) { return LANGS[lang].timeZone === "device" ? detectDeviceTimeZone() : LANGS[lang].timeZone; }
function normalizeLang(value: string | null): Lang { return value && value in LANGS ? value as Lang : "en"; }

function cardFromBase(base: any, lang: Lang, dateKey: string, reversed: boolean): FateCard {
  const text = getTarotText(base, lang, reversed);
  const seed = hashString(`${dateKey}|${base.id}|${lang}|${reversed ? "R" : "U"}`);
  const n = (offset: number, min: number, max: number) => min + ((seed >> offset) % (max - min + 1));
  return {
    id: base.id,
    orientation: reversed ? "reversed" : "upright",
    arcana: base.arcana,
    luckyColor: base.luckyColor,
    symbol: base.symbol,
    luckyNumber: 1 + (seed % 27),
    love: clamp(base.scores.love + n(1, -6, 6), 1, 99),
    money: clamp(base.scores.money + n(3, -6, 6), 1, 99),
    work: clamp(base.scores.work + n(5, -6, 6), 1, 99),
    mind: clamp(base.scores.mind + n(7, -6, 6), 1, 99),
    ...text
  };
}

function parseCardToken(token: string | null) {
  if (!token) return { id: null, reversed: false };
  const [id, orientation] = token.split("|");
  return { id, reversed: orientation === "R" };
}

function makeCardToken(id: string, reversed: boolean) {
  return `${id}|${reversed ? "R" : "U"}`;
}

function pickCardToken(name: string, birth: string, dateKey: string, lang: Lang) {
  const seed = hashString(`${dateKey}|${name.trim().toLowerCase()}|${birth}|${lang}`);
  const base = BASE_CARDS[seed % BASE_CARDS.length];
  const reversed = ((seed >> 8) % 100) < 28;
  return makeCardToken(base.id, reversed);
}

function getCardById(token: string | null, lang: Lang, dateKey: string) {
  const parsed = parseCardToken(token);
  const base = BASE_CARDS.find((c: any) => c.id === parsed.id) || BASE_CARDS[0];
  return cardFromBase(base, lang, dateKey, parsed.reversed);
}

async function api(path: string, opt?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opt });
  if (!res.ok) throw new Error(path);
  return res.json();
}

const emptyMetrics: Metrics = { totalPageViews: 0, uniqueVisitors: 0, todayPageViews: 0, todayUniqueVisitors: 0, draws: 0, shares: 0, lastVisitKst: null, dateKey: "", timeZone: "Asia/Seoul", nextResetIso: "", accuracy: "server_cookie_daily_draw_lock" };

export default function App() {
  const [lang, setLang] = useState<Lang>(normalizeLang(localStorage.getItem("fate-lang")));
  const [name, setName] = useState(localStorage.getItem("fate-name") || "");
  const [birth, setBirth] = useState(localStorage.getItem("fate-birth") || "");
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [status, setStatus] = useState<DailyStatus | null>(null);
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "offline">("loading");
  const [config, setConfig] = useState<RuntimeConfig>({
    siteUrl: "",
    configuredSiteUrl: "",
    hostUrl: "",
    sponsorEmail: import.meta.env.VITE_SPONSOR_EMAIL || DEFAULT_EMAIL,
    supportUrl: import.meta.env.VITE_SUPPORT_URL || "",
    premiumUrl: import.meta.env.VITE_PREMIUM_URL || ""
  });
  const [drawn, setDrawn] = useState(false);
  const [locked, setLocked] = useState(false);
  const [card, setCard] = useState<FateCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareCanvas = useRef<HTMLCanvasElement | null>(null);

  const t = UI[lang];
  const timeZone = getTimeZone(lang);
  const dateKey = status?.dateKey || metrics.dateKey || "";
  const candidateId = useMemo(() => pickCardToken(name || "Guest", birth, dateKey || "preview", lang), [name, birth, dateKey, lang]);
  const previewCard = useMemo(() => getCardById(candidateId, lang, dateKey || "preview"), [candidateId, lang, dateKey]);
  const currentCard = card || previewCard;
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const siteUrl = (import.meta.env.VITE_SITE_URL || config.siteUrl || currentOrigin || "https://fatecard.today").replace(/\/$/, "");
  const sponsorEmail = config.sponsorEmail || import.meta.env.VITE_SPONSOR_EMAIL || DEFAULT_EMAIL;
  const supportUrl = config.supportUrl || import.meta.env.VITE_SUPPORT_URL || "";
  const premiumUrl = config.premiumUrl || import.meta.env.VITE_PREMIUM_URL || "";
  const isLocal = typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
  const isTemporaryPublic = !isLocal && !/fatecard\.today$/i.test(typeof window !== "undefined" ? window.location.hostname : "");

  useEffect(() => {
    document.documentElement.lang = LANGS[lang].locale.slice(0, 2);
    localStorage.setItem("fate-lang", lang);
    const payload = { locale: lang, timeZone };
    setApiStatus("loading");
    api("/api/config")
      .then((data) => {
        if (data?.ok) setConfig((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
    api("/api/visit", { method: "POST", body: JSON.stringify(payload) })
      .then((data) => {
        setMetrics(data.metrics);
        return api("/api/daily-status", { method: "POST", body: JSON.stringify(payload) });
      })
      .then((data) => {
        setStatus({ drawnToday: data.drawnToday, cardId: data.cardId, dateKey: data.dateKey, timeZone: data.timeZone, nextResetIso: data.nextResetIso });
        setMetrics(data.metrics);
        if (data.drawnToday) {
          const lockedCard = getCardById(data.cardId, lang, data.dateKey);
          setCard(lockedCard);
          setDrawn(true);
          setLocked(true);
          setTimeout(() => drawShare((name || "Guest").trim() || "Guest", lockedCard), 120);
        } else {
          setCard(null);
          setDrawn(false);
          setLocked(false);
        }
        setApiStatus("ok");
      })
      .catch(() => setApiStatus("offline"));
  }, [lang]);

  const resetLabel = useMemo(() => {
    if (!status?.nextResetIso) return t.reset;
    try {
      return `${t.reset}: ${new Date(status.nextResetIso).toLocaleString(LANGS[lang].locale, { timeZone, hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" })}`;
    } catch {
      return t.reset;
    }
  }, [status?.nextResetIso, lang, timeZone]);

  const draw = async () => {
    if (locked && card) return;
    const clean = (name || "Guest").trim().slice(0, 24) || "Guest";
    localStorage.setItem("fate-name", clean);
    localStorage.setItem("fate-birth", birth);
    setName(clean);
    setCopied(false);

    const cid = pickCardToken(clean, birth, dateKey || metrics.dateKey || "today", lang);
    try {
      const data = await api("/api/draw", { method: "POST", body: JSON.stringify({ cardId: cid, locale: lang, timeZone }) });
      setMetrics(data.metrics);
      setStatus({ drawnToday: true, cardId: data.cardId, dateKey: data.dateKey, timeZone: data.timeZone, nextResetIso: data.nextResetIso });
      const finalCard = getCardById(data.cardId, lang, data.dateKey);
      setCard(finalCard);
      setDrawn(true);
      setLocked(true);
      setTimeout(() => drawShare(clean, finalCard), 120);
    } catch {
      setApiStatus("offline");
    }
  };

  const drawShare = (who: string, c: FateCard) => {
    const canvas = shareCanvas.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 1080 * dpr;
    canvas.height = 1350 * dpr;
    canvas.style.width = "360px";
    canvas.style.height = "450px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const bg = ctx.createLinearGradient(0, 0, 1080, 1350);
    bg.addColorStop(0, "#12081f");
    bg.addColorStop(0.45, "#241033");
    bg.addColorStop(1, "#030712");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.fillStyle = c.luckyColor;
    ctx.globalAlpha = 0.18;
    ctx.beginPath(); ctx.arc(880, 180, 280, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(140, 1150, 320, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(250,204,21,0.75)";
    ctx.lineWidth = 5;
    round(ctx, 70, 70, 940, 1210, 52);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    round(ctx, 100, 100, 880, 1150, 42);
    ctx.fill();
    ctx.fillStyle = "#facc15";
    ctx.font = "900 42px serif";
    ctx.textAlign = "center";
    ctx.fillText("FateCard.today", 540, 175);
    ctx.fillStyle = "#f8fafc";
    ctx.font = "900 72px serif";
    wrapText(ctx, c.title, 540, 315, 780, 82);
    ctx.fillStyle = "#c4b5fd";
    ctx.font = "700 34px system-ui";
    wrapText(ctx, c.subtitle, 540, 475, 760, 42);
    ctx.fillStyle = c.luckyColor;
    ctx.font = "900 170px serif";
    ctx.fillText(c.symbol, 540, 690);
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "700 34px system-ui";
    wrapText(ctx, c.tone, 540, 805, 760, 44);
    [[t.love, c.love], [t.money, c.money], [t.work, c.work], [t.mind, c.mind]].forEach(([label, value], i) => {
      const x = 210 + i * 220;
      ctx.fillStyle = "rgba(255,255,255,0.09)";
      round(ctx, x - 80, 930, 160, 130, 22);
      ctx.fill();
      ctx.fillStyle = "#94a3b8";
      ctx.font = "800 28px system-ui";
      ctx.fillText(String(label).toUpperCase(), x, 977);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "900 44px system-ui";
      ctx.fillText(String(value), x, 1030);
    });
    ctx.fillStyle = "#facc15";
    ctx.font = "900 30px system-ui";
    ctx.fillText(`Lucky ${c.luckyNumber} · ${who}`, 540, 1150);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "700 25px system-ui";
    ctx.fillText("FateCard.today · entertainment only", 540, 1210);
  };

  const saveCard = () => {
    const canvas = shareCanvas.current;
    if (!canvas || !card) return;
    const a = document.createElement("a");
    a.download = `fatecard-today-${status?.dateKey || "today"}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const shareTitle = () => card ? `FateCard.today — ${card.title}` : "FateCard.today";
  const shareText = () => {
    if (!card) return `FateCard.today\n${siteUrl}`;
    return `FateCard.today: ${card.title}\n${card.subtitle}\n${t.mission}: ${card.mission}\n${siteUrl}`;
  };

  const recordShare = async () => {
    if (!card) return;
    try {
      const data = await api(`/api/share?timeZone=${encodeURIComponent(timeZone)}`, { method: "POST", body: JSON.stringify({ cardId: card.id, locale: lang }) });
      setMetrics(data.metrics);
    } catch {}
  };

  const copyShareText = async () => {
    if (!card) return;
    try {
      await navigator.clipboard.writeText(shareText());
      setCopied(true);
      await recordShare();
    } catch {
      setCopied(true);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      await recordShare();
    } catch {
      setCopied(true);
    }
  };

  const nativeShare = async () => {
    if (!card) return;
    const text = shareText();
    const canvas = shareCanvas.current;
    try {
      if (navigator.share && canvas && "toBlob" in canvas) {
        const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        if (blob && "canShare" in navigator) {
          const file = new File([blob], `fatecard-today-${status?.dateKey || "today"}.png`, { type: "image/png" });
          const payload = { title: "FateCard.today", text, url: siteUrl, files: [file] };
          if ((navigator as any).canShare(payload)) {
            await (navigator as any).share(payload);
            await recordShare();
            return;
          }
        }
        await navigator.share({ title: "FateCard.today", text, url: siteUrl });
        await recordShare();
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      await recordShare();
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } catch {}
    }
  };

  const openShareWindow = async (platform: string) => {
    if (!card) return;
    const title = shareTitle();
    const text = shareText();
    const encUrl = encodeURIComponent(siteUrl);
    const encTitle = encodeURIComponent(title);
    const encText = encodeURIComponent(text);
    const shortText = encodeURIComponent(`I drew "${card.title}" on FateCard.today. What did you get today?`);
    const urls: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${shortText}&url=${encUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      telegram: `https://t.me/share/url?url=${encUrl}&text=${shortText}`,
      whatsapp: `https://wa.me/?text=${encText}`,
      reddit: `https://www.reddit.com/submit?url=${encUrl}&title=${encTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encUrl}`,
      email: `mailto:?subject=${encTitle}&body=${encText}`
    };
    const url = urls[platform];
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    await recordShare();
  };

  const saveCardAndRecord = async () => {
    saveCard();
    await recordShare();
  };

  const shareTargets = [
    { id: "native", icon: "↗", label: t.nativeShare || "Share", action: nativeShare },
    { id: "x", icon: "𝕏", label: "X", action: () => openShareWindow("x") },
    { id: "facebook", icon: "f", label: "Facebook", action: () => openShareWindow("facebook") },
    { id: "telegram", icon: "✈", label: "Telegram", action: () => openShareWindow("telegram") },
    { id: "whatsapp", icon: "☘", label: "WhatsApp", action: () => openShareWindow("whatsapp") },
    { id: "reddit", icon: "👽", label: "Reddit", action: () => openShareWindow("reddit") },
    { id: "linkedin", icon: "in", label: "LinkedIn", action: () => openShareWindow("linkedin") },
    { id: "line", icon: "💬", label: "LINE", action: () => openShareWindow("line") },
    { id: "email", icon: "✉", label: "Email", action: () => openShareWindow("email") },
    { id: "copyText", icon: "✍", label: t.copy || "Copy text", action: copyShareText },
    { id: "copyLink", icon: "🔗", label: t.copyLink || "Copy link", action: copyLink },
    { id: "save", icon: "▣", label: t.save || "Save", action: saveCardAndRecord }
  ];

  const runShareTarget = async (fn: () => void | Promise<void>) => {
    await fn();
    setShareOpen(false);
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="heroAura" aria-hidden="true" />
        <div className="heroGlow one" />
        <div className="heroGlow two" />
        <div className="oracleOrbit orbitOne" aria-hidden="true"><i>✦</i></div>
        <div className="oracleOrbit orbitTwo" aria-hidden="true"><i>☾</i></div>
        <div className="oracleOrbit orbitThree" aria-hidden="true"><i>✧</i></div>
        <div className="floatingSigil sigilOne" aria-hidden="true">✦</div>
        <div className="floatingSigil sigilTwo" aria-hidden="true">☉</div>
        <div className="floatingSigil sigilThree" aria-hidden="true">◆</div>
        <nav className="top">
          <div className="brand">
            <span>✦</span>
            <div>
              <strong>FateCard.today</strong>
              <small>{t.brandSmall}</small>
            </div>
          </div>
          <div className="topRight">
            <label className="languageSelect">
              {t.language}
              <select value={lang} onChange={(e) => setLang(normalizeLang(e.target.value))}>
                {(Object.keys(LANGS) as Lang[]).map((key) => (
                  <option key={key} value={key}>{LANGS[key].native}</option>
                ))}
              </select>
            </label>
          </div>
        </nav>

        <div className="grid">
          <section className="intro">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{String(t.headline).split("\\n").map((line: string, i: number) => <span key={i}>{line}</span>)}</h1>
            <p className="desc">{t.desc}</p>

            <div className="inputPanel">
              <label>{t.nickname}<input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.placeholder} maxLength={24} disabled={locked} /></label>
              <label>{t.birth} <em>{t.optional}</em><input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} disabled={locked} /></label>
              <button onClick={draw} disabled={locked && Boolean(card)}>{locked ? t.locked : t.draw}</button>
            </div>

            <div className="dailyBox">
              <strong>{resetLabel}</strong>
              <span>{LANGS[lang].native} · {timeZone} · {status?.dateKey || metrics.dateKey || ""} · 78 Tarot Cards</span>
              {locked && <p>{t.lockedNotice}</p>}
            </div>
<div className="metrics">
              {t.metrics.map((label: string, i: number) => (
                <Metric key={label} label={label} value={[metrics.totalPageViews, metrics.uniqueVisitors, metrics.todayPageViews, metrics.todayUniqueVisitors, metrics.draws, metrics.shares][i] || 0} />
              ))}
            </div>

            <div className={`status ${apiStatus}`}>
              {apiStatus === "ok" ? t.visitorOk : apiStatus === "loading" ? t.visitorLoading : t.visitorOffline}
            </div>
          </section>

          <section className="cardZone">
            <div
              className={`fateCard ${drawn ? "revealed" : ""}`}
              style={{ ["--accent" as string]: currentCard.luckyColor }}
              onClick={() => {
                if (card) setDrawn(true);
              }}
            >
              <div className="cardBack">
                <span>✦</span>
                <b>FateCard</b>
                <small>one card today</small>
              </div>
              <div className="cardFront">
                <div className="cardHead">
                  <span>{currentCard.symbol}</span>
                  <small>{currentCard.archetype}</small>
                </div>
                <h2>{currentCard.title}</h2>
                <p className="subtitle">{currentCard.subtitle}</p>
                <p>{currentCard.aura}</p>
                <div className="scoreGrid">
                  <Score label={t.love} value={currentCard.love} />
                  <Score label={t.money} value={currentCard.money} />
                  <Score label={t.work} value={currentCard.work} />
                  <Score label={t.mind} value={currentCard.mind} />
                </div>
                <div className="oracleBox"><b>{t.warning}</b><span>{currentCard.warning}</span></div>
                <div className="oracleBox"><b>{t.mission}</b><span>{currentCard.mission}</span></div>
                <div className="lucky"><span>Lucky No. {currentCard.luckyNumber}</span><i style={{ background: currentCard.luckyColor }} /></div>
              </div>
            </div>

            {card && (
              <div className="sharePanel resultSharePanel">
                <canvas ref={shareCanvas} className="hiddenShareCanvas" aria-hidden="true" />
                <div className="shareActions shareActionsClean">
                  <button className="sharePrimary shareOpenButton" onClick={() => setShareOpen(true)}>
                    <span>↗</span>
                    {t.nativeShare || "Share"}
                  </button>
                  <button onClick={saveCardAndRecord}>
                    <span>▣</span>
                    {t.save}
                  </button>
                </div>

                {shareOpen && (
                  <div className="sharePickerBackdrop" onClick={() => setShareOpen(false)}>
                    <div className="sharePicker" onClick={(e) => e.stopPropagation()}>
                      <div className="sharePickerHead">
                        <div>
                          <strong>{t.nativeShare || "Share"}</strong>
                          <span>Choose where to send your Fate Card</span>
                        </div>
                        <button className="shareClose" onClick={() => setShareOpen(false)} aria-label="Close">×</button>
                      </div>
                      <div className="shareIconGrid">
                        {shareTargets.map((target) => (
                          <button
                            key={target.id}
                            className={`shareIconButton ${target.id}`}
                            onClick={() => runShareTarget(target.action)}
                          >
                            <i>{target.icon}</i>
                            <span>{target.id === "copyText" && copied ? t.copied : target.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </section>

      <footer>
        <span>{t.entertainment}</span>
      </footer>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number; key?: string }) {
  return <div className="metric"><span>{label}</span><strong>{value.toLocaleString()}</strong></div>;
}
function Score({ label, value }: { label: string; value: number; key?: string }) {
  return <div className="score"><span>{label}</span><b>{value}</b><i><em style={{ width: `${value}%` }} /></i></div>;
}
function round(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = word + " ";
      yy += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, yy);
}


