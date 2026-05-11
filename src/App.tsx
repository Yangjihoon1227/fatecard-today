import React, { useEffect, useMemo, useState } from "react";
import { TAROT_DECK, getTarotText, type SupportedCardLang, type TarotCardBase } from "./tarotDeck";

type Lang = SupportedCardLang;
type Mode = "home" | "daily" | "three" | "yesno" | "love" | "birth" | "guide" | "sponsor";
type Card = ReturnType<typeof makeCard>;

type Metrics = {
  totalPageViews: number;
  uniqueVisitors: number;
  todayPageViews: number;
  todayUniqueVisitors: number;
  draws: number;
  shares: number;
  dateKey: string;
  timeZone: string;
  nextResetIso: string;
};

const LANGS: Record<Lang, { label: string; timeZone: string }> = {
  en: { label: "English", timeZone: "device" },
  ko: { label: "한국어", timeZone: "Asia/Seoul" },
  ja: { label: "日本語", timeZone: "Asia/Tokyo" },
  zh: { label: "中文", timeZone: "Asia/Shanghai" },
  es: { label: "Español", timeZone: "Europe/Madrid" },
  fr: { label: "Français", timeZone: "Europe/Paris" },
  de: { label: "Deutsch", timeZone: "Europe/Berlin" },
  pt: { label: "Português", timeZone: "America/Sao_Paulo" }
};

const COPY: any = {
  en: {
    brand: "FateCard.today", language: "Language", menu: "Menu", close: "Close",
    eyebrow: "AI TAROT ORACLE", title: "Choose what you want to read.",
    subtitle: "An AI-style tarot experience built around one honest rule: one daily fate card, plus focused readings when you need a clearer mirror.",
    aiLine: "AI reads the card symbols and turns them into a grounded interpretation. Entertainment and self-reflection only.",
    choose: "Choose a reading", start: "Start", draw: "Draw", drawAgain: "Draw again", share: "Share", copy: "Copy", copied: "Copied.",
    name: "Nickname", birth: "Birth date", optional: "optional", topic: "Topic", question: "Question", search: "Search card, suit, keyword...",
    locked: "Already drawn today", reset: "Resets at local midnight", oneRule: "One card per day. No rerolls.",
    love: "Love", money: "Money", work: "Work", mind: "Mind", action: "Action", warning: "Warning", answer: "Answer", theme: "Theme",
    menus: {
      home: ["Home", "Choose a reading"], daily: ["Daily AI Tarot", "One card per local day"], three: ["3-Card Reading", "Past, present, next"], yesno: ["Yes / No", "Fast answer"], love: ["Love Tarot", "Two-card relationship mirror"], birth: ["Birth Card", "Major Arcana from birth date"], guide: ["78-Card Deck", "Browse every card"], sponsor: ["Sponsor", "Ads and partnership"]
    },
    homeCards: {
      daily: "Your once-a-day fate card. This is the main hook.", three: "A quick three-card reading for context.", yesno: "One card, one direction. Useful when overthinking.", love: "Two cards for relationship energy and signal.", birth: "A simple archetype calculated from birth date.", guide: "Browse the full 78-card deck.", sponsor: "For banner ads, sponsorship, localization, and collaborations."
    },
    dailyTitle: "AI Daily Tarot", dailyDesc: "Type a nickname, draw once, and keep the result until midnight in your selected time zone.",
    threeTitle: "AI 3-Card Reading", threeDesc: "Choose a topic. The cards answer in sequence: past, present, next.",
    spreadLabels: ["Past", "Present", "Next"],
    yesTitle: "AI Yes / No Tarot", yesDesc: "Draw one card. Upright leans yes; reversed leans delay or no.", yesUpright: "Leaning YES — but act cleanly.", yesReverse: "Leaning NO / delay — fix the hidden issue first.",
    loveTitle: "AI Love Tarot", loveDesc: "Two cards: your energy and the relationship signal.", loveLabels: ["Your energy", "The signal"],
    birthTitle: "Birth Card", birthDesc: "Enter a birth date and calculate a Major Arcana archetype.", calculate: "Calculate", guideTitle: "78-Card Deck", sponsorTitle: "Sponsor / Ads", sponsorDesc: "Traffic first, ads later. If this grows, sponsor cards and clean banner placements can be added without damaging the ritual.",
    footer: "Entertainment only · Not medical, legal, or financial advice."
  },
  ko: {
    brand: "FateCard.today", language: "언어", menu: "메뉴", close: "닫기",
    eyebrow: "AI 타로 오라클", title: "무엇을 볼지 선택하세요.",
    subtitle: "하루 한 장의 운명 카드와, 필요할 때 바로 볼 수 있는 집중형 타로 리딩을 하나의 AI 타로 경험으로 정리했습니다.",
    aiLine: "AI가 카드의 상징을 읽고 현실적인 해석으로 정리합니다. 재미와 자기성찰용이며 의학·법률·금융 조언이 아닙니다.",
    choose: "리딩 선택", start: "시작", draw: "뽑기", drawAgain: "다시 뽑기", share: "공유", copy: "복사", copied: "복사됨.",
    name: "닉네임", birth: "생년월일", optional: "선택", topic: "주제", question: "질문", search: "카드, 슈트, 키워드 검색...",
    locked: "오늘 카드는 이미 뽑았습니다", reset: "선택 언어 시간대 00시에 초기화", oneRule: "하루 한 장. 다시 뽑기 없음.",
    love: "연애", money: "돈", work: "일", mind: "멘탈", action: "행동", warning: "경고", answer: "답변", theme: "테마",
    menus: {
      home: ["홈", "리딩 선택"], daily: ["AI 오늘의 타로", "하루 한 장"], three: ["3카드 리딩", "과거·현재·다음"], yesno: ["예 / 아니오", "빠른 판단"], love: ["연애 타로", "관계 신호"], birth: ["탄생 카드", "생년월일 아르카나"], guide: ["78장 덱", "전체 카드 보기"], sponsor: ["스폰서", "광고·제휴"]
    },
    homeCards: {
      daily: "하루에 딱 한 번 뽑는 핵심 운명 카드.", three: "상황 흐름을 빠르게 보는 3장 리딩.", yesno: "생각이 많아질 때 방향을 잡는 한 장.", love: "나의 에너지와 관계 신호를 두 장으로 확인.", birth: "생년월일에서 뽑는 메이저 아르카나 원형.", guide: "78장 전체 카드 의미를 둘러보기.", sponsor: "배너 광고, 제휴, 현지화, 협업 문의."
    },
    dailyTitle: "AI 오늘의 타로", dailyDesc: "닉네임을 입력하고 하루 한 번만 뽑으세요. 선택 언어의 시간대 기준 00시까지 유지됩니다.",
    threeTitle: "AI 3카드 리딩", threeDesc: "주제를 고르면 과거·현재·다음 흐름으로 카드가 나옵니다.", spreadLabels: ["과거", "현재", "다음"],
    yesTitle: "AI 예 / 아니오 타로", yesDesc: "한 장으로 방향을 봅니다. 정방향은 Yes 쪽, 역방향은 보류 또는 No 쪽입니다.", yesUpright: "YES 쪽입니다. 단, 깔끔하게 행동해야 합니다.", yesReverse: "NO 또는 보류 쪽입니다. 숨은 문제부터 정리하세요.",
    loveTitle: "AI 연애 타로", loveDesc: "두 장으로 나의 에너지와 관계 신호를 봅니다.", loveLabels: ["나의 에너지", "관계 신호"],
    birthTitle: "탄생 카드", birthDesc: "생년월일을 기준으로 메이저 아르카나 원형을 계산합니다.", calculate: "계산하기", guideTitle: "78장 타로 덱", sponsorTitle: "스폰서 / 광고", sponsorDesc: "먼저 방문자와 공유를 만든 뒤 광고를 붙이는 게 맞습니다. 성장 후에는 리딩 경험을 해치지 않는 배너와 스폰서 카드를 넣을 수 있습니다.",
    footer: "재미와 자기성찰용 · 의학, 법률, 금융 조언 아님."
  }
};

COPY.ja = { ...COPY.en, menu:"メニュー", close:"閉じる", language:"言語", eyebrow:"AIタロット", title:"見たいリーディングを選んでください。", subtitle:"一日一枚の運命カードと、必要な時の集中リーディング。", aiLine:"AIがカードの象徴を読み、現実的な解釈にまとめます。", choose:"リーディング選択", draw:"引く", share:"共有", copy:"コピー", copied:"コピーしました。", footer:"娯楽・自己省察用です。" };
COPY.zh = { ...COPY.en, menu:"菜单", close:"关闭", language:"语言", eyebrow:"AI塔罗", title:"选择你想看的内容。", subtitle:"每日一张命运牌，加上需要时的重点解读。", aiLine:"AI读取牌的象征，并转化为现实的解释。", choose:"选择解读", draw:"抽牌", share:"分享", copy:"复制", copied:"已复制。", footer:"仅供娱乐与自我反思。" };
COPY.es = { ...COPY.en, menu:"Menú", close:"Cerrar", language:"Idioma", eyebrow:"TAROT CON IA", title:"Elige qué quieres leer.", subtitle:"Una carta diaria y lecturas enfocadas cuando necesitas claridad.", aiLine:"La IA lee los símbolos y los convierte en una interpretación práctica.", choose:"Elegir lectura", draw:"Sacar", share:"Compartir", copy:"Copiar", copied:"Copiado.", footer:"Solo entretenimiento y reflexión." };
COPY.fr = { ...COPY.en, menu:"Menu", close:"Fermer", language:"Langue", eyebrow:"TAROT IA", title:"Choisis ce que tu veux lire.", subtitle:"Une carte quotidienne et des tirages ciblés quand tu veux plus de clarté.", aiLine:"L’IA lit les symboles et propose une interprétation concrète.", choose:"Choisir un tirage", draw:"Tirer", share:"Partager", copy:"Copier", copied:"Copié.", footer:"Divertissement et réflexion uniquement." };
COPY.de = { ...COPY.en, menu:"Menü", close:"Schließen", language:"Sprache", eyebrow:"KI-TAROT", title:"Wähle deine Legung.", subtitle:"Eine Tageskarte und fokussierte Legungen, wenn du Klarheit brauchst.", aiLine:"Die KI liest die Symbole und macht daraus eine praktische Deutung.", choose:"Legung wählen", draw:"Ziehen", share:"Teilen", copy:"Kopieren", copied:"Kopiert.", footer:"Nur Unterhaltung und Selbstreflexion." };
COPY.pt = { ...COPY.en, menu:"Menu", close:"Fechar", language:"Idioma", eyebrow:"TAROT COM IA", title:"Escolha o que quer ver.", subtitle:"Uma carta diária e leituras focadas quando você precisa de clareza.", aiLine:"A IA lê os símbolos e transforma em interpretação prática.", choose:"Escolher leitura", draw:"Tirar", share:"Compartilhar", copy:"Copiar", copied:"Copiado.", footer:"Somente entretenimento e reflexão." };

const MODES: Mode[] = ["home", "daily", "three", "yesno", "love", "birth", "guide", "sponsor"];
const TOPICS = ["love", "money", "work", "mind"] as const;
const emptyMetrics: Metrics = { totalPageViews: 0, uniqueVisitors: 0, todayPageViews: 0, todayUniqueVisitors: 0, draws: 0, shares: 0, dateKey: "", timeZone: "Asia/Seoul", nextResetIso: "" };

function normalizeLang(value: string | null): Lang { return value && value in LANGS ? value as Lang : "en"; }
function normalizeMode(value: string | null): Mode { return value && MODES.includes(value as Mode) ? value as Mode : "home"; }
function deviceTimeZone() { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul"; }
function getTimeZone(lang: Lang) { return LANGS[lang].timeZone === "device" ? deviceTimeZone() : LANGS[lang].timeZone; }
function hashString(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
function token(id: string, reversed: boolean) { return `${id}|${reversed ? "R" : "U"}`; }
function parseToken(v: string | null) { const [id, o] = String(v || "").split("|"); return { id, reversed: o === "R" }; }
function api(path: string, opt?: RequestInit) { return fetch(path, { credentials: "include", ...opt }).then((r) => r.json()); }
function pickBase(seed: string, offset = 0) { return TAROT_DECK[(hashString(seed) + offset * 31) % TAROT_DECK.length]; }
function makeCard(base: TarotCardBase, lang: Lang, seed: string, reversed = false) {
  const text = getTarotText(base, lang, reversed);
  const h = hashString(`${base.id}|${seed}|${lang}|${reversed}`);
  const n = (off: number) => ((h >> off) % 11) - 5;
  return {
    ...text,
    id: base.id,
    orientation: reversed ? "reversed" : "upright",
    symbol: base.symbol,
    luckyColor: base.luckyColor,
    artPath: `/cards/${base.id}.svg`,
    love: clamp(base.scores.love + n(1), 1, 99),
    money: clamp(base.scores.money + n(3), 1, 99),
    work: clamp(base.scores.work + n(5), 1, 99),
    mind: clamp(base.scores.mind + n(7), 1, 99)
  };
}
function cardFromToken(v: string | null, lang: Lang, seed: string) {
  const p = parseToken(v);
  const base = TAROT_DECK.find((c) => c.id === p.id) || TAROT_DECK[0];
  return makeCard(base, lang, seed, p.reversed);
}
function pickToken(name: string, birth: string, dateKey: string, lang: Lang) {
  const seed = hashString(`${dateKey}|${name.trim().toLowerCase()}|${birth}|${lang}`);
  const base = TAROT_DECK[seed % TAROT_DECK.length];
  return token(base.id, ((seed >> 8) % 100) < 28);
}

export default function App() {
  const [lang, setLang] = useState<Lang>(normalizeLang(localStorage.getItem("fate-lang")));
  const [mode, setMode] = useState<Mode>(normalizeMode(localStorage.getItem("fate-mode")));
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState(localStorage.getItem("fate-name") || "");
  const [birth, setBirth] = useState(localStorage.getItem("fate-birth") || "");
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [drawnToday, setDrawnToday] = useState(false);
  const [dailyToken, setDailyToken] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [topic, setTopic] = useState("love");
  const [guideQuery, setGuideQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const t = COPY[lang] || COPY.en;
  const timeZone = getTimeZone(lang);
  const dateKey = metrics.dateKey || new Date().toISOString().slice(0, 10);
  const previewToken = useMemo(() => pickToken(name || "Guest", birth, dateKey, lang), [name, birth, dateKey, lang]);
  const dailyCard = cardFromToken(dailyToken || previewToken, lang, dateKey);
  const sponsorEmail = "tbvjrkrh@gmail.com";

  useEffect(() => { localStorage.setItem("fate-lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("fate-mode", mode); }, [mode]);
  useEffect(() => { localStorage.setItem("fate-name", name); }, [name]);
  useEffect(() => { localStorage.setItem("fate-birth", birth); }, [birth]);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      try {
        const visit = await api("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, timeZone }) });
        if (!cancelled && visit.metrics) setMetrics(visit.metrics);
        const st = await api("/api/daily-status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, timeZone }) });
        if (!cancelled) { setDrawnToday(Boolean(st.drawnToday)); setDailyToken(st.cardId || null); if (st.metrics) setMetrics(st.metrics); }
      } catch {}
    }
    boot();
    return () => { cancelled = true; };
  }, [lang, timeZone]);

  const setModeFull = (m: Mode) => { setMode(m); setMenuOpen(false); setCards([]); window.scrollTo({ top: 0, behavior: "smooth" }); };

  async function drawDaily() {
    const chosen = pickToken(name || "Guest", birth, dateKey, lang);
    const res = await api("/api/draw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, timeZone, cardId: chosen }) });
    setDrawnToday(Boolean(res.drawnToday));
    setDailyToken(res.cardId || chosen);
    if (res.metrics) setMetrics(res.metrics);
  }

  function drawThree() {
    const baseSeed = `${dateKey}|${name}|${birth}|${topic}|three`;
    const used = new Set<string>();
    const next: Card[] = [];
    for (let i = 0; i < 3; i++) {
      let base = pickBase(baseSeed, i);
      while (used.has(base.id)) base = TAROT_DECK[(TAROT_DECK.indexOf(base) + 1) % TAROT_DECK.length];
      used.add(base.id);
      next.push(makeCard(base, lang, `${baseSeed}-${i}`, (hashString(`${baseSeed}-${i}`) % 100) < 28));
    }
    setCards(next);
  }

  function drawOne(kind: "yesno" | "love") {
    const baseSeed = `${dateKey}|${name}|${birth}|${kind}|${Date.now()}`;
    if (kind === "yesno") {
      const base = pickBase(baseSeed, 1);
      setCards([makeCard(base, lang, baseSeed, hashString(baseSeed) % 100 < 42)]);
      return;
    }
    const a = pickBase(baseSeed, 1);
    let b = pickBase(baseSeed, 2);
    if (a.id === b.id) b = pickBase(baseSeed, 3);
    setCards([makeCard(a, lang, `${baseSeed}-a`, false), makeCard(b, lang, `${baseSeed}-b`, hashString(baseSeed) % 100 < 30)]);
  }

  function calculateBirth() {
    const value = birth || "2000-12-27";
    const digits = value.replace(/[^0-9]/g, "").split("").map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 21) sum = String(sum).split("").reduce((a, b) => a + Number(b), 0);
    const majors = TAROT_DECK.filter((c) => c.arcana === "major");
    setCards([makeCard(majors[sum] || majors[0], lang, `birth-${value}`, false)]);
  }

  async function copyReading() {
    const text = [t.brand, t.menus[mode]?.[0], ...(cards.length ? cards : [dailyCard]).map((c) => `${c.title} — ${c.mission}`), location.origin].join("\n");
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
    try { await api(`/api/share?timeZone=${encodeURIComponent(timeZone)}`, { method: "POST" }); } catch {}
  }

  async function nativeShare() {
    const text = `${t.brand}\n${(cards[0] || dailyCard).title} — ${(cards[0] || dailyCard).mission}`;
    try {
      if ((navigator as any).share) await (navigator as any).share({ title: t.brand, text, url: location.origin });
      else await copyReading();
      await api(`/api/share?timeZone=${encodeURIComponent(timeZone)}`, { method: "POST" });
    } catch {}
  }

  const guideCards = TAROT_DECK.filter((base) => {
    const txt = `${base.id} ${base.title.en} ${base.title.ko} ${base.keywords.upright.en} ${base.keywords.upright.ko}`.toLowerCase();
    return txt.includes(guideQuery.toLowerCase());
  }).slice(0, 78);

  return <main className="appShell">
    <div className="cosmicBg" aria-hidden="true" />
    <header className="topBar">
      <button className="menuButton" onClick={() => setMenuOpen(true)} aria-label={t.menu}>☰</button>
      <button className="brandButton" onClick={() => setModeFull("home")}><span>✦</span><strong>{t.brand}</strong></button>
      <div className="topControls"><label>{t.language}</label><select value={lang} onChange={(e) => setLang(normalizeLang(e.target.value))}>{(Object.keys(LANGS) as Lang[]).map((k) => <option key={k} value={k}>{LANGS[k].label}</option>)}</select></div>
    </header>

    {menuOpen && <div className="drawerOverlay" onClick={() => setMenuOpen(false)} />}
    <aside className={`sideDrawer ${menuOpen ? "open" : ""}`}>
      <div className="drawerHead"><b>{t.choose}</b><button onClick={() => setMenuOpen(false)}>{t.close}</button></div>
      {MODES.map((m) => <button key={m} className={mode === m ? "active" : ""} onClick={() => setModeFull(m)}><strong>{t.menus[m][0]}</strong><small>{t.menus[m][1]}</small></button>)}
    </aside>

    <section className="heroPanel">
      <div className="heroCopy">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{mode === "home" ? t.title : t.menus[mode][0]}</h1>
        <p className="subtitle">{mode === "home" ? t.subtitle : t.menus[mode][1]}</p>
        <p className="aiLine">{t.aiLine}</p>
        <div className="miniStats"><span>{t.oneRule}</span><span>{t.reset}: {metrics.dateKey || "—"}</span><span>Visits {metrics.totalPageViews || 0}</span></div>
      </div>
      <CardFigure card={dailyCard} compact />
    </section>

    {mode === "home" && <HomeScreen t={t} setMode={setModeFull} />}
    {mode === "daily" && <section className="screen"><div className="screenText"><h2>{t.dailyTitle}</h2><p>{t.dailyDesc}</p><InputRow t={t} name={name} birth={birth} setName={setName} setBirth={setBirth} /><button className="primary" onClick={drawDaily}>{drawnToday ? t.locked : t.draw}</button></div><ResultCard card={dailyCard} t={t} onShare={nativeShare} onCopy={copyReading} copied={copied} /></section>}
    {mode === "three" && <section className="screen vertical"><div className="screenText"><h2>{t.threeTitle}</h2><p>{t.threeDesc}</p><TopicRow t={t} topic={topic} setTopic={setTopic} /><button className="primary" onClick={drawThree}>{t.draw}</button></div><Spread cards={cards} labels={t.spreadLabels} t={t} onShare={nativeShare} onCopy={copyReading} copied={copied} /></section>}
    {mode === "yesno" && <section className="screen"><div className="screenText"><h2>{t.yesTitle}</h2><p>{t.yesDesc}</p><button className="primary" onClick={() => drawOne("yesno")}>{t.draw}</button></div>{cards[0] && <ResultCard card={cards[0]} t={t} extra={`${t.answer}: ${cards[0].orientation === "upright" ? t.yesUpright : t.yesReverse}`} onShare={nativeShare} onCopy={copyReading} copied={copied} />}</section>}
    {mode === "love" && <section className="screen vertical"><div className="screenText"><h2>{t.loveTitle}</h2><p>{t.loveDesc}</p><button className="primary" onClick={() => drawOne("love")}>{t.draw}</button></div><Spread cards={cards} labels={t.loveLabels} t={t} onShare={nativeShare} onCopy={copyReading} copied={copied} /></section>}
    {mode === "birth" && <section className="screen"><div className="screenText"><h2>{t.birthTitle}</h2><p>{t.birthDesc}</p><InputRow t={t} name={name} birth={birth} setName={setName} setBirth={setBirth} /><button className="primary" onClick={calculateBirth}>{t.calculate}</button></div>{cards[0] && <ResultCard card={cards[0]} t={t} extra={`${t.theme}: ${cards[0].mission}`} onShare={nativeShare} onCopy={copyReading} copied={copied} />}</section>}
    {mode === "guide" && <section className="guideScreen"><div className="screenText"><h2>{t.guideTitle}</h2><input className="search" value={guideQuery} onChange={(e) => setGuideQuery(e.target.value)} placeholder={t.search} /></div><div className="deckGrid">{guideCards.map((base) => <button key={base.id} onClick={() => setCards([makeCard(base, lang, `guide-${base.id}`, false)])}><img src={`/cards/${base.id}.svg`} alt="" /><b>{makeCard(base, lang, "guide", false).title}</b></button>)}</div>{cards[0] && <ResultCard card={cards[0]} t={t} onShare={nativeShare} onCopy={copyReading} copied={copied} />}</section>}
    {mode === "sponsor" && <section className="screen"><div className="screenText"><h2>{t.sponsorTitle}</h2><p>{t.sponsorDesc}</p><a className="primary link" href={`mailto:${sponsorEmail}`}>{sponsorEmail}</a></div><div className="sponsorCard"><span>AD</span><b>Sponsored card slot</b><p>Clean native banner placement below readings, not over the result.</p></div></section>}

    <footer>{t.footer}</footer>
  </main>;
}

function InputRow({ t, name, birth, setName, setBirth }: any) { return <div className="inputRow"><label>{t.name}<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Guest" /></label><label>{t.birth}<input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} /></label></div>; }
function TopicRow({ t, topic, setTopic }: any) { return <div className="topicRow">{TOPICS.map((x) => <button key={x} className={topic === x ? "active" : ""} onClick={() => setTopic(x)}>{t[x]}</button>)}</div>; }
function HomeScreen({ t, setMode }: any) { const keys: Mode[] = ["daily", "three", "yesno", "love", "birth", "guide", "sponsor"]; return <section className="choiceGrid">{keys.map((m) => <button key={m} className="choiceCard" onClick={() => setMode(m)}><span>{m === "daily" ? "✦" : m === "three" ? "🃏" : m === "yesno" ? "☯" : m === "love" ? "♥" : m === "birth" ? "☉" : m === "guide" ? "▤" : "✉"}</span><b>{t.menus[m][0]}</b><p>{t.homeCards[m]}</p></button>)}</section>; }
function CardFigure({ card, compact = false }: { card: Card; compact?: boolean }) { return <div className={`cardFigure ${compact ? "compact" : ""}`} style={{ ["--accent" as any]: card.luckyColor }}><img src={card.artPath} alt={`${card.title} tarot card`} /><div><b>{card.title}</b><small>{card.subtitle}</small></div></div>; }
function ResultCard({ card, t, extra, onShare, onCopy, copied }: any) { return <article className="resultCard"><CardFigure card={card} /><div className="reading"><h3>{card.title}</h3>{extra && <p className="extra">{extra}</p>}<p>{card.aura}</p><p><strong>{t.action}:</strong> {card.mission}</p><p><strong>{t.warning}:</strong> {card.warning}</p><div className="scores"><Score label={t.love} value={card.love}/><Score label={t.money} value={card.money}/><Score label={t.work} value={card.work}/><Score label={t.mind} value={card.mind}/></div><div className="actions"><button onClick={onShare}>{t.share}</button><button onClick={onCopy}>{copied ? t.copied : t.copy}</button></div></div></article>; }
function Spread({ cards, labels, t, onShare, onCopy, copied }: any) { if (!cards.length) return <div className="emptySpread">✦</div>; return <div className="spreadWrap">{cards.map((card: Card, i: number) => <article className="spreadCard" key={`${card.id}-${i}`}><span>{labels[i] || i + 1}</span><img src={card.artPath} alt=""/><b>{card.title}</b><p>{card.mission}</p></article>)}<div className="actions wide"><button onClick={onShare}>{t.share}</button><button onClick={onCopy}>{copied ? t.copied : t.copy}</button></div></div>; }
function Score({ label, value }: { label: string; value: number }) { return <div className="score"><span>{label}</span><b>{value}</b><i><em style={{ width: `${value}%` }} /></i></div>; }
