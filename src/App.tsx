
import React, { useEffect, useMemo, useState } from "react";
import { TAROT_DECK, getTarotText, type SupportedCardLang, type TarotCardBase } from "./tarotDeck";

type Lang = SupportedCardLang;
type Mode = "daily" | "love" | "three" | "yesno" | "birth" | "deck" | "sponsor";
type DrawCard = ReturnType<typeof makeCard>;

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

type CopyPack = {
  langLabel: string;
  brandSub: string;
  menu: string;
  aiTitle: string;
  aiSubtitle: string;
  chooseHint: string;
  step1: string;
  step2: string;
  step3: string;
  shuffle: string;
  reveal: string;
  reset: string;
  share: string;
  copy: string;
  save: string;
  copied: string;
  saved: string;
  enterBirth: string;
  calculate: string;
  search: string;
  sponsorTitle: string;
  sponsorText: string;
  onePerDay: string;
  locked: string;
  localReset: string;
  entertainment: string;
  stats: string;
  noCopy: string;
  tabs: Record<Mode, { title: string; subtitle: string; icon: string; cta: string }>;
  roles: Record<string, string>;
  sections: {
    overview: string;
    flow: string;
    emotion: string;
    advice: string;
    caution: string;
    next: string;
    answer: string;
    selected: string;
  };
  drawInstruction: (need: number) => string;
  selectedCount: (a: number, b: number) => string;
  cardLine: (role: string, title: string, orientation: string) => string;
  reading: (mode: Mode, cards: DrawCard[], birth?: string) => {
    title: string;
    subtitle: string;
    blocks: { key: string; title: string; body: string }[];
  };
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

const ROLE_KEYS: Record<Mode, string[]> = {
  daily: ["today"],
  love: ["self", "other"],
  three: ["past", "present", "future"],
  yesno: ["answer"],
  birth: ["birth"],
  deck: [],
  sponsor: []
};

const REQUIRED: Record<Mode, number> = {
  daily: 1,
  love: 2,
  three: 3,
  yesno: 1,
  birth: 0,
  deck: 0,
  sponsor: 0
};

function commonTabs(lang: "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt"): Record<Mode, { title: string; subtitle: string; icon: string; cta: string }> {
  const t: any = {
    en: {
      daily: ["Today’s Card", "One card for today’s flow and advice", "☉", "Draw today’s card"],
      love: ["Love Tarot", "Choose cards for relationship flow", "♡", "Start love reading"],
      three: ["3-Card Reading", "Past · Present · Future", "▧", "Start 3-card reading"],
      yesno: ["Yes / No", "A simple symbolic answer", "◇", "Ask yes/no"],
      birth: ["Birth Card", "Your archetypal card from birth date", "✶", "Calculate"],
      deck: ["78-Card Deck", "Browse all tarot cards", "☷", "Browse deck"],
      sponsor: ["Sponsor / Ads", "Partnership and inquiry", "✉", "Contact"]
    },
    ko: {
      daily: ["오늘의 카드", "오늘의 흐름과 조언", "☉", "오늘의 카드 뽑기"],
      love: ["연애 타로", "관계의 흐름과 감정선", "♡", "연애 타로 시작"],
      three: ["3카드 리딩", "과거 · 현재 · 미래", "▧", "3카드 리딩 시작"],
      yesno: ["예 / 아니오", "간단하고 명확한 상징 답변", "◇", "예/아니오 묻기"],
      birth: ["탄생 카드", "생년월일로 보는 원형", "✶", "탄생 카드 계산"],
      deck: ["78장 가이드", "모든 카드 살펴보기", "☷", "덱 보기"],
      sponsor: ["후원 / 광고 문의", "제휴와 광고 문의", "✉", "문의하기"]
    },
    ja: {
      daily: ["今日のカード", "今日の流れと助言", "☉", "今日のカードを引く"],
      love: ["恋愛タロット", "関係の流れと感情", "♡", "恋愛リーディング"],
      three: ["3枚リーディング", "過去 · 現在 · 未来", "▧", "3枚を始める"],
      yesno: ["Yes / No", "シンプルな象徴的答え", "◇", "質問する"],
      birth: ["誕生カード", "生年月日の原型カード", "✶", "計算する"],
      deck: ["78枚ガイド", "すべてのカードを見る", "☷", "デッキを見る"],
      sponsor: ["広告 / 提携", "スポンサーと連絡", "✉", "連絡"]
    },
    zh: {
      daily: ["今日牌", "今日流向与建议", "☉", "抽今日牌"],
      love: ["爱情塔罗", "关系流动与情感线", "♡", "开始爱情解读"],
      three: ["三张牌", "过去 · 现在 · 未来", "▧", "开始三张牌"],
      yesno: ["是 / 否", "简洁的象征答案", "◇", "提问"],
      birth: ["出生牌", "由生日计算原型牌", "✶", "计算"],
      deck: ["78张指南", "浏览全部塔罗牌", "☷", "查看牌组"],
      sponsor: ["赞助 / 广告", "合作与广告咨询", "✉", "联系"]
    },
    es: {
      daily: ["Carta diaria", "Flujo y consejo del día", "☉", "Sacar carta"],
      love: ["Tarot del amor", "Flujo de relación y emoción", "♡", "Empezar amor"],
      three: ["3 cartas", "Pasado · Presente · Futuro", "▧", "Empezar 3 cartas"],
      yesno: ["Sí / No", "Respuesta simbólica simple", "◇", "Preguntar"],
      birth: ["Carta natal", "Arquetipo por fecha de nacimiento", "✶", "Calcular"],
      deck: ["Guía de 78 cartas", "Explorar todo el mazo", "☷", "Ver mazo"],
      sponsor: ["Patrocinio / Ads", "Alianzas y anuncios", "✉", "Contacto"]
    },
    fr: {
      daily: ["Carte du jour", "Flux et conseil du jour", "☉", "Tirer la carte"],
      love: ["Tarot amour", "Relation et ligne émotionnelle", "♡", "Commencer"],
      three: ["3 cartes", "Passé · Présent · Futur", "▧", "Tirer 3 cartes"],
      yesno: ["Oui / Non", "Réponse symbolique simple", "◇", "Demander"],
      birth: ["Carte de naissance", "Archétype de naissance", "✶", "Calculer"],
      deck: ["Guide 78 cartes", "Parcourir le jeu", "☷", "Voir le jeu"],
      sponsor: ["Sponsor / Pub", "Partenariat et publicité", "✉", "Contact"]
    },
    de: {
      daily: ["Tageskarte", "Tagesfluss und Rat", "☉", "Tageskarte ziehen"],
      love: ["Liebestarot", "Beziehungsfluss und Gefühl", "♡", "Liebeslegung starten"],
      three: ["3-Karten-Legung", "Vergangenheit · Gegenwart · Zukunft", "▧", "3 Karten ziehen"],
      yesno: ["Ja / Nein", "Einfache symbolische Antwort", "◇", "Fragen"],
      birth: ["Geburtskarte", "Archetyp aus Geburtsdatum", "✶", "Berechnen"],
      deck: ["78-Karten-Guide", "Alle Karten ansehen", "☷", "Deck ansehen"],
      sponsor: ["Sponsor / Ads", "Partnerschaft und Werbung", "✉", "Kontakt"]
    },
    pt: {
      daily: ["Carta do dia", "Fluxo e conselho de hoje", "☉", "Tirar carta"],
      love: ["Tarot do amor", "Fluxo da relação e emoção", "♡", "Começar amor"],
      three: ["3 cartas", "Passado · Presente · Futuro", "▧", "Começar 3 cartas"],
      yesno: ["Sim / Não", "Resposta simbólica simples", "◇", "Perguntar"],
      birth: ["Carta de nascimento", "Arquétipo pelo nascimento", "✶", "Calcular"],
      deck: ["Guia de 78 cartas", "Explorar o baralho", "☷", "Ver baralho"],
      sponsor: ["Patrocínio / Ads", "Parcerias e anúncios", "✉", "Contato"]
    }
  };
  return Object.fromEntries(Object.entries(t[lang]).map(([k, v]: any) => [k, { title: v[0], subtitle: v[1], icon: v[2], cta: v[3] }])) as any;
}

const COPY: Record<Lang, CopyPack> = {
  en: makeCopy("en"),
  ko: makeCopy("ko"),
  ja: makeCopy("ja"),
  zh: makeCopy("zh"),
  es: makeCopy("es"),
  fr: makeCopy("fr"),
  de: makeCopy("de"),
  pt: makeCopy("pt")
};

function makeCopy(lang: Lang): CopyPack {
  const base: any = {
    en: {
      langLabel: "Language", brandSub: "AI TAROT", menu: "Menu",
      aiTitle: "AI Tarot Oracle",
      aiSubtitle: "Choose the cards yourself. When every card is revealed, AI turns the symbols into a clear reflection.",
      chooseHint: "Click or tap a card to draw it.",
      step1: "Shuffle", step2: "Select cards", step3: "Read",
      shuffle: "Shuffle again", reveal: "Show reading", reset: "Reset cards", share: "Share result", copy: "Copy reading", save: "Save image", copied: "Copied.", saved: "Saved.", enterBirth: "Enter birth date", calculate: "Calculate", search: "Search card, suit, keyword...", sponsorTitle: "Sponsor / advertising inquiry", sponsorText: "This site is designed for tarot, wellness, journal, app, beauty, book, and lifestyle sponsorships. Clear sponsor labels will be used.", onePerDay: "One daily card per local day. No rerolls.", locked: "Already drawn today.", localReset: "Resets at local midnight.", entertainment: "Entertainment and self-reflection only. Not medical, legal, or financial advice.", stats: "Visits", noCopy: "Modern commercial deck images are not used. The artwork is original and inspired by public-domain tarot symbolism.",
      roles: { today: "Today’s energy", self: "My current heart", other: "The other person’s signal", past: "Past", present: "Present", future: "Future", answer: "Answer card", birth: "Birth archetype" },
      sections: { overview: "Overview", flow: "Flow", emotion: "Emotional signal", advice: "Guidance", caution: "Caution", next: "Next step", answer: "Answer", selected: "Selected cards" }
    },
    ko: {
      langLabel: "언어", brandSub: "AI TAROT", menu: "메뉴",
      aiTitle: "AI 타로 오라클",
      aiSubtitle: "직접 카드를 고르고, 모든 카드가 공개된 뒤 AI가 상징을 엮어 흐름과 감정선을 해석합니다.",
      chooseHint: "카드를 클릭하거나 터치해 직접 뽑으세요.",
      step1: "섞기", step2: "카드 선택", step3: "해석 보기",
      shuffle: "다시 섞기", reveal: "풀이 보기", reset: "선택 초기화", share: "결과 공유", copy: "풀이 복사", save: "카드 저장", copied: "복사됨.", saved: "저장됨.", enterBirth: "생년월일 입력", calculate: "계산하기", search: "카드, 슈트, 키워드 검색...", sponsorTitle: "후원 / 광고 문의", sponsorText: "타로, 운세, 다이어리, 명상, 뷰티, 책, 앱, 라이프스타일 브랜드와 잘 맞는 구조입니다. 광고는 반드시 Sponsored로 명확하게 표시합니다.", onePerDay: "하루 한 장. 다시 뽑기 없음.", locked: "오늘은 이미 뽑았습니다.", localReset: "선택 언어 시간대 기준 00시에 초기화됩니다.", entertainment: "재미와 자기성찰용입니다. 의료·법률·금융 조언이 아닙니다.", stats: "방문", noCopy: "현대 상업 덱 이미지를 쓰지 않고, 퍼블릭 도메인 타로 상징을 바탕으로 새로 구성한 오리지널 아트입니다.",
      roles: { today: "오늘의 에너지", self: "현재 나의 마음", other: "상대방의 신호", past: "과거", present: "현재", future: "미래", answer: "답변 카드", birth: "탄생 원형" },
      sections: { overview: "요약", flow: "흐름", emotion: "감정선", advice: "조언", caution: "주의", next: "다음 행동", answer: "답변", selected: "선택된 카드" }
    },
    ja: {
      langLabel: "言語", brandSub: "AI TAROT", menu: "メニュー",
      aiTitle: "AIタロット・オラクル", aiSubtitle: "自分でカードを選び、すべて開いた後にAIが象徴を読み解きます.", chooseHint: "カードをクリックまたはタップして引いてください.", step1: "シャッフル", step2: "カード選択", step3: "解釈", shuffle: "もう一度混ぜる", reveal: "解釈を見る", reset: "リセット", share: "共有", copy: "コピー", save: "保存", copied: "コピーしました.", saved: "保存しました.", enterBirth: "生年月日", calculate: "計算", search: "カード、スート、キーワード検索...", sponsorTitle: "広告・提携", sponsorText: "タロット、ウェルネス、日記、アプリ、ライフスタイル領域のスポンサーに適しています。広告表示は明確に行います。", onePerDay: "一日一枚。引き直しなし。", locked: "今日はすでに引いています。", localReset: "現地時間の深夜にリセット。", entertainment: "娯楽と内省用です。医療・法律・金融の助言ではありません。", stats: "訪問", noCopy: "現代商用デッキ画像は使わず、パブリックドメインの象徴から再構成したオリジナルアートです。", roles:{today:"今日のエネルギー",self:"今の私の心",other:"相手の信号",past:"過去",present:"現在",future:"未来",answer:"答えのカード",birth:"誕生の原型"}, sections:{overview:"要約",flow:"流れ",emotion:"感情",advice:"助言",caution:"注意",next:"次の行動",answer:"答え",selected:"選択カード"}
    },
    zh: {
      langLabel: "语言", brandSub: "AI TAROT", menu: "菜单",
      aiTitle: "AI塔罗神谕", aiSubtitle: "你亲自选牌，全部翻开后由AI整合象征并解读。", chooseHint: "点击或触摸卡牌进行抽取。", step1: "洗牌", step2: "选牌", step3: "解读", shuffle: "重新洗牌", reveal: "查看解读", reset: "重置", share: "分享", copy: "复制解读", save: "保存", copied: "已复制。", saved: "已保存。", enterBirth: "输入生日", calculate: "计算", search: "搜索牌名、牌组、关键词...", sponsorTitle: "赞助 / 广告咨询", sponsorText: "适合塔罗、身心灵、日记、应用、美妆、书籍与生活方式品牌。广告会清楚标注。", onePerDay: "每日一张，不可重抽。", locked: "今天已经抽过。", localReset: "当地午夜重置。", entertainment: "仅供娱乐和自我反思，不是医疗、法律或金融建议。", stats: "访问", noCopy: "不使用现代商业牌组图像；图像基于公版塔罗象征重新创作。", roles:{today:"今日能量",self:"我的内心",other:"对方信号",past:"过去",present:"现在",future:"未来",answer:"答案牌",birth:"出生原型"}, sections:{overview:"概览",flow:"流向",emotion:"情感信号",advice:"建议",caution:"注意",next:"下一步",answer:"答案",selected:"已选卡牌"}
    },
    es: {
      langLabel: "Idioma", brandSub: "AI TAROT", menu: "Menú",
      aiTitle: "Oráculo de Tarot AI", aiSubtitle: "Elige las cartas tú mismo. Cuando todas estén abiertas, la IA interpreta los símbolos.", chooseHint: "Haz clic o toca una carta para elegirla.", step1: "Barajar", step2: "Elegir", step3: "Leer", shuffle: "Barajar otra vez", reveal: "Ver lectura", reset: "Reiniciar", share: "Compartir", copy: "Copiar lectura", save: "Guardar", copied: "Copiado.", saved: "Guardado.", enterBirth: "Fecha de nacimiento", calculate: "Calcular", search: "Buscar carta, palo o palabra...", sponsorTitle: "Patrocinio / anuncios", sponsorText: "Adecuado para marcas de tarot, bienestar, diario, apps, belleza, libros y lifestyle. Los anuncios se marcarán claramente.", onePerDay: "Una carta diaria. Sin repetir.", locked: "Ya sacaste la carta de hoy.", localReset: "Se reinicia a medianoche local.", entertainment: "Solo entretenimiento y reflexión. No es consejo médico, legal ni financiero.", stats: "Visitas", noCopy: "No usamos mazos comerciales modernos; el arte es original e inspirado en símbolos de dominio público.", roles:{today:"Energía del día",self:"Mi corazón",other:"Señal de la otra persona",past:"Pasado",present:"Presente",future:"Futuro",answer:"Carta respuesta",birth:"Arquetipo natal"}, sections:{overview:"Resumen",flow:"Flujo",emotion:"Señal emocional",advice:"Guía",caution:"Cuidado",next:"Siguiente paso",answer:"Respuesta",selected:"Cartas elegidas"}
    },
    fr: {
      langLabel: "Langue", brandSub: "AI TAROT", menu: "Menu",
      aiTitle: "Oracle Tarot IA", aiSubtitle: "Choisis les cartes toi-même. Une fois révélées, l’IA relie les symboles.", chooseHint: "Clique ou touche une carte pour la tirer.", step1: "Mélanger", step2: "Choisir", step3: "Lire", shuffle: "Mélanger encore", reveal: "Voir la lecture", reset: "Réinitialiser", share: "Partager", copy: "Copier", save: "Sauver", copied: "Copié.", saved: "Enregistré.", enterBirth: "Date de naissance", calculate: "Calculer", search: "Chercher carte, couleur, mot-clé...", sponsorTitle: "Sponsor / publicité", sponsorText: "Adapté aux marques tarot, bien-être, journal, appli, beauté, livres et lifestyle. Les publicités seront clairement indiquées.", onePerDay: "Une carte par jour. Pas de nouveau tirage.", locked: "Carte déjà tirée aujourd’hui.", localReset: "Réinitialisation à minuit local.", entertainment: "Divertissement et réflexion uniquement. Pas un avis médical, juridique ou financier.", stats: "Visites", noCopy: "Pas d’images de jeux commerciaux modernes; art original inspiré de symboles du domaine public.", roles:{today:"Énergie du jour",self:"Mon cœur actuel",other:"Signal de l’autre",past:"Passé",present:"Présent",future:"Futur",answer:"Carte réponse",birth:"Archétype de naissance"}, sections:{overview:"Résumé",flow:"Flux",emotion:"Signal émotionnel",advice:"Conseil",caution:"Attention",next:"Prochaine action",answer:"Réponse",selected:"Cartes choisies"}
    },
    de: {
      langLabel: "Sprache", brandSub: "AI TAROT", menu: "Menü",
      aiTitle: "KI-Tarot-Orakel", aiSubtitle: "Wähle die Karten selbst. Wenn alle offen sind, deutet die KI die Symbole.", chooseHint: "Klicke oder tippe auf eine Karte.", step1: "Mischen", step2: "Wählen", step3: "Lesen", shuffle: "Neu mischen", reveal: "Deutung anzeigen", reset: "Zurücksetzen", share: "Teilen", copy: "Deutung kopieren", save: "Speichern", copied: "Kopiert.", saved: "Gespeichert.", enterBirth: "Geburtsdatum", calculate: "Berechnen", search: "Karte, Farbe, Stichwort suchen...", sponsorTitle: "Sponsor / Werbung", sponsorText: "Geeignet für Tarot-, Wellness-, Journal-, App-, Beauty-, Buch- und Lifestyle-Marken. Anzeigen werden klar markiert.", onePerDay: "Eine Tageskarte. Kein Neuziehen.", locked: "Heute bereits gezogen.", localReset: "Reset um lokale Mitternacht.", entertainment: "Nur Unterhaltung und Selbstreflexion. Kein medizinischer, rechtlicher oder finanzieller Rat.", stats: "Besuche", noCopy: "Keine modernen kommerziellen Deckbilder; originales Artwork nach gemeinfreien Symbolen.", roles:{today:"Tagesenergie",self:"Mein Herz",other:"Signal der anderen Person",past:"Vergangenheit",present:"Gegenwart",future:"Zukunft",answer:"Antwortkarte",birth:"Geburtsarchetyp"}, sections:{overview:"Überblick",flow:"Fluss",emotion:"Gefühlssignal",advice:"Rat",caution:"Achtung",next:"Nächster Schritt",answer:"Antwort",selected:"Gewählte Karten"}
    },
    pt: {
      langLabel: "Idioma", brandSub: "AI TAROT", menu: "Menu",
      aiTitle: "Oráculo de Tarô AI", aiSubtitle: "Escolha as cartas você mesmo. Quando todas abrirem, a IA interpreta os símbolos.", chooseHint: "Clique ou toque em uma carta para tirar.", step1: "Embaralhar", step2: "Escolher", step3: "Ler", shuffle: "Embaralhar de novo", reveal: "Ver leitura", reset: "Redefinir", share: "Compartilhar", copy: "Copiar leitura", save: "Salvar", copied: "Copiado.", saved: "Salvo.", enterBirth: "Data de nascimento", calculate: "Calcular", search: "Buscar carta, naipe, palavra...", sponsorTitle: "Patrocínio / anúncios", sponsorText: "Ideal para marcas de tarô, bem-estar, diário, app, beleza, livros e lifestyle. Anúncios serão marcados claramente.", onePerDay: "Uma carta por dia. Sem repetir.", locked: "Você já tirou a carta de hoje.", localReset: "Reinicia à meia-noite local.", entertainment: "Somente entretenimento e reflexão. Não é aconselhamento médico, jurídico ou financeiro.", stats: "Visitas", noCopy: "Não usamos decks comerciais modernos; arte original baseada em símbolos de domínio público.", roles:{today:"Energia do dia",self:"Meu coração",other:"Sinal da outra pessoa",past:"Passado",present:"Presente",future:"Futuro",answer:"Carta resposta",birth:"Arquétipo de nascimento"}, sections:{overview:"Resumo",flow:"Fluxo",emotion:"Sinal emocional",advice:"Orientação",caution:"Cuidado",next:"Próximo passo",answer:"Resposta",selected:"Cartas escolhidas"}
    }
  };
  const c = base[lang];
  return {
    ...c,
    tabs: commonTabs(lang),
    drawInstruction: (need: number) => lang === "ko" ? `${need}장의 카드를 직접 고르세요.` : lang === "ja" ? `${need}枚のカードを選んでください。` : lang === "zh" ? `请选择${need}张牌。` : lang === "es" ? `Elige ${need} carta(s).` : lang === "fr" ? `Choisis ${need} carte(s).` : lang === "de" ? `Wähle ${need} Karte(n).` : lang === "pt" ? `Escolha ${need} carta(s).` : `Choose ${need} card(s).`,
    selectedCount: (a: number, b: number) => lang === "ko" ? `${a}/${b}장 선택됨` : lang === "ja" ? `${a}/${b}枚選択` : lang === "zh" ? `已选 ${a}/${b}` : lang === "es" ? `${a}/${b} elegidas` : lang === "fr" ? `${a}/${b} choisies` : lang === "de" ? `${a}/${b} gewählt` : lang === "pt" ? `${a}/${b} escolhidas` : `${a}/${b} selected`,
    cardLine: (role: string, title: string, orientation: string) => `${role}: ${title} · ${orientation}`,
    reading: (mode: Mode, cards: DrawCard[], birth?: string) => buildReading(lang, mode, cards, birth)
  };
}

function normalizeLang(v: any): Lang {
  return (["en","ko","ja","zh","es","fr","de","pt"].includes(v) ? v : "ko") as Lang;
}
function normalizeMode(v: any): Mode {
  return (["daily","love","three","yesno","birth","deck","sponsor"].includes(v) ? v : "daily") as Mode;
}
function getTimeZone(lang: Lang) {
  const cfg = LANGS[lang];
  if (cfg.timeZone !== "device") return cfg.timeZone;
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul"; } catch { return "Asia/Seoul"; }
}
function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) { h ^= input.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h >>> 0);
}
function clamp(v: number, a = 1, b = 99) { return Math.max(a, Math.min(b, Math.round(v))); }
function token(id: string, reversed: boolean) { return `${id}|${reversed ? "r" : "u"}`; }
function parseToken(v: string | null) {
  const [id, rev] = String(v || "").split("|");
  return { id, reversed: rev === "r" };
}
function emptyMetrics(): Metrics {
  return { totalPageViews: 0, uniqueVisitors: 0, todayPageViews: 0, todayUniqueVisitors: 0, draws: 0, shares: 0, dateKey: "", timeZone: "", nextResetIso: "" };
}
async function api(path: string, opts?: RequestInit) {
  const res = await fetch(path, opts);
  return res.json();
}
function makeCard(base: TarotCardBase, lang: Lang, seedText: string, reversed = false) {
  const text = getTarotText(base, lang, reversed);
  const seed = hashString(`${base.id}|${seedText}|${reversed}`);
  const n = (shift: number) => ((seed >> shift) % 17) - 8;
  return {
    id: base.id,
    token: token(base.id, reversed),
    reversed,
    orientation: reversed ? getTarotText(base, lang, true).subtitle.split("·")[0].trim() : getTarotText(base, lang, false).subtitle.split("·")[0].trim(),
    title: text.title,
    subtitle: text.subtitle,
    aura: text.aura,
    mission: text.mission,
    warning: text.warning,
    archetype: text.archetype,
    symbol: base.symbol,
    luckyColor: base.luckyColor,
    artPath: `/cards/${base.id}.svg`,
    love: clamp(base.scores.love + n(1)),
    money: clamp(base.scores.money + n(3)),
    work: clamp(base.scores.work + n(5)),
    mind: clamp(base.scores.mind + n(7))
  };
}
function cardFromToken(v: string | null, lang: Lang, seed: string) {
  const p = parseToken(v);
  const base = TAROT_DECK.find((c) => c.id === p.id) || TAROT_DECK[0];
  return makeCard(base, lang, seed, p.reversed);
}
function makePool(mode: Mode, lang: Lang, dateKey: string, name: string, birth: string, salt = "") {
  const seed = hashString(`${mode}|${lang}|${dateKey}|${name}|${birth}|${salt}`);
  const out: DrawCard[] = [];
  let cursor = seed % TAROT_DECK.length;
  while (out.length < 8) {
    const base = TAROT_DECK[cursor % TAROT_DECK.length];
    if (!out.some((c) => c.id === base.id)) {
      const rev = ((seed >> (out.length + 3)) % 100) < 28;
      out.push(makeCard(base, lang, `${dateKey}-${mode}-${out.length}-${salt}`, rev));
    }
    cursor += 7 + out.length * 3;
  }
  return out;
}
function dailyToken(name: string, birth: string, dateKey: string, lang: Lang) {
  const seed = hashString(`${dateKey}|${name.trim().toLowerCase()}|${birth}|${lang}|daily`);
  const base = TAROT_DECK[seed % TAROT_DECK.length];
  return token(base.id, ((seed >> 8) % 100) < 28);
}
function calculateBirthCard(birth: string, lang: Lang) {
  const digits = (birth || "2000-12-27").replace(/\D/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 21) sum = String(sum).split("").reduce((a, b) => a + Number(b), 0);
  const major = TAROT_DECK.filter((c) => c.arcana === "major");
  return makeCard(major[sum % major.length] || TAROT_DECK[0], lang, `birth-${birth}`, false);
}

function buildReading(lang: Lang, mode: Mode, cards: DrawCard[], birth?: string) {
  const t = COPY[lang]?.sections || COPY.ko.sections;
  const names = cards.map((c) => c.title).join(" · ");
  const first = cards[0];
  const second = cards[1] || cards[0];
  const third = cards[2] || cards[0];
  const yes = first ? (first.reversed ? "NO / delay" : "YES / proceed carefully") : "";
  const blocksKo = {
    daily: [
      { key: "overview", title: t.overview, body: `오늘의 중심 상징은 ${first?.title}입니다. 이 카드는 지금 당신이 그냥 흘려보내던 감정이나 선택을 조금 더 또렷하게 보라고 말합니다. ${first?.aura}` },
      { key: "flow", title: t.flow, body: `하루의 흐름은 빠르게 몰아치기보다 한 번 멈춰서 방향을 잡는 쪽이 유리합니다. 작은 결정 하나가 이후의 리듬을 바꿀 수 있으니, 충동보다 관찰을 먼저 두는 편이 좋습니다.` },
      { key: "advice", title: t.advice, body: `${first?.mission} 오늘은 큰 결론을 내리기보다 실행 가능한 한 가지 행동을 정하고 끝까지 해내는 것이 더 실질적입니다.` },
      { key: "caution", title: t.caution, body: `${first?.warning} 타로는 정답지가 아니라 거울입니다. 보고 싶은 말만 고르지 말고, 불편한 힌트도 현실 점검에 사용하세요.` }
    ],
    love: [
      { key: "overview", title: t.overview, body: `${first?.title}와 ${second?.title}가 함께 나왔습니다. 한쪽은 마음을 조심스럽게 살피고 있고, 다른 한쪽은 더 빠르게 움직이고 싶어하는 흐름이 보입니다. 관계 자체는 멈춰 있다기보다 서로의 속도를 맞추는 과정에 가깝습니다.` },
      { key: "emotion", title: t.emotion, body: `현재 감정선에는 호감과 경계가 함께 있습니다. 상대의 말보다 행동의 일관성을 보는 것이 중요하고, 당신 역시 너무 많은 의미를 혼자 해석하기보다 적절한 표현을 통해 확인하는 편이 좋습니다.` },
      { key: "advice", title: t.advice, body: `지금 필요한 것은 과한 시험이나 밀당이 아니라 자연스러운 대화입니다. 작은 약속, 가벼운 연락, 부담 없는 만남처럼 서로의 온도를 확인할 수 있는 행동이 관계를 더 안정적으로 만듭니다.` },
      { key: "caution", title: t.caution, body: `기대가 커질수록 조급함도 커질 수 있습니다. 상대의 속도를 내 기준으로 재단하거나, 마음을 떠보려는 방식은 오해를 만들 수 있으니 피하세요.` },
      { key: "next", title: t.next, body: `이번 주 안에 짧고 솔직한 대화를 제안하세요. 관계를 단정 짓기보다 서로가 편안하게 반응할 수 있는 작은 접점을 만드는 것이 가장 좋습니다.` }
    ],
    three: [
      { key: "overview", title: t.overview, body: `과거의 ${first?.title}, 현재의 ${second?.title}, 미래의 ${third?.title}가 이어지며 하나의 흐름을 만듭니다. 과거의 패턴이 아직 남아 있지만, 현재 카드가 보여주는 선택에 따라 미래의 방향은 충분히 바뀔 수 있습니다.` },
      { key: "flow", title: t.flow, body: `과거 카드는 이미 지나간 사건보다 그 사건이 남긴 습관을 보여줍니다. 현재 카드는 지금 실제로 잡아야 할 중심이고, 미래 카드는 그대로 방치했을 때 나타날 가능성에 가깝습니다.` },
      { key: "advice", title: t.advice, body: `현재 카드의 조언을 가장 중요하게 보세요. ${second?.mission} 미래를 바꾸는 힘은 예측이 아니라 지금 선택하는 태도에서 나옵니다.` },
      { key: "caution", title: t.caution, body: `${third?.warning} 좋은 흐름도 방치하면 흐려지고, 불리한 흐름도 의식적으로 조정하면 완화됩니다.` }
    ],
    yesno: [
      { key: "answer", title: t.answer, body: `${first?.reversed ? "지금은 '아니오' 또는 '보류'에 가깝습니다." : "지금은 '예' 쪽에 가깝지만, 무조건 밀어붙이라는 뜻은 아닙니다."} ${first?.title}는 이 질문에서 핵심 조건을 먼저 확인하라고 말합니다.` },
      { key: "flow", title: t.flow, body: `${first?.aura} 상황은 단순한 감정보다 조건과 타이밍의 영향을 받고 있습니다. 원하는 답을 얻기보다 지금 실제로 준비된 것이 무엇인지 보는 편이 정확합니다.` },
      { key: "advice", title: t.advice, body: `${first?.mission} 결정을 미루더라도 기준 없이 흔들리지는 마세요. 오늘 확인해야 할 정보 하나를 정하고, 그것을 기준으로 다음 행동을 결정하세요.` },
      { key: "caution", title: t.caution, body: `${first?.warning} 예/아니오 리딩은 빠른 판단 도구일 뿐, 책임을 대신하지 않습니다.` }
    ],
    birth: [
      { key: "overview", title: t.overview, body: `${birth || ""}의 탄생 카드로 ${first?.title}가 나왔습니다. 이 카드는 타고난 성향, 반복되는 선택 방식, 삶에서 자주 마주치는 주제를 상징적으로 보여줍니다.` },
      { key: "flow", title: t.flow, body: `${first?.aura} 당신에게 중요한 것은 단순한 운보다 스스로 반복하는 패턴을 이해하는 것입니다. 이 카드는 강점과 그림자를 동시에 보여줍니다.` },
      { key: "advice", title: t.advice, body: `${first?.mission} 장점을 과하게 쓰면 단점이 되기 쉽습니다. 이 카드의 에너지를 의식적으로 다루면 선택의 질이 좋아집니다.` },
      { key: "caution", title: t.caution, body: `${first?.warning} 탄생 카드는 성격을 고정하는 딱지가 아니라, 자신을 관찰하기 위한 상징 도구로 보는 것이 안전합니다.` }
    ]
  };
  if (lang === "ko") {
    const k = (blocksKo as any)[mode] || blocksKo.daily;
    return { title: mode === "love" ? "AI 연애 타로 해석" : mode === "three" ? "AI 3카드 해석" : mode === "yesno" ? "AI 예/아니오 해석" : mode === "birth" ? "AI 탄생 카드 해석" : "AI 오늘의 타로 해석", subtitle: `${names}의 상징을 바탕으로 흐름을 정리했습니다.`, blocks: k };
  }
  const localizedTitle: any = {
    en: "AI Tarot Reading", ja: "AIタロット解釈", zh: "AI塔罗解读", es: "Lectura de tarot AI", fr: "Lecture Tarot IA", de: "KI-Tarot-Deutung", pt: "Leitura de Tarô AI"
  };
  const summary: any = {
    en: `The selected card pattern (${names}) suggests a symbolic flow rather than a fixed prediction. Read it as a mirror for timing, emotion, and the next practical choice.`,
    ja: `選ばれたカード（${names}）は固定された予言ではなく、流れと感情を映す象徴です。`,
    zh: `所选牌组（${names}）不是固定预言，而是反映时机、情绪与下一步选择的象征。`,
    es: `El patrón elegido (${names}) no es una predicción fija; funciona como espejo del momento, la emoción y la acción siguiente.`,
    fr: `Les cartes choisies (${names}) ne sont pas une prédiction fixe; elles reflètent le moment, l’émotion et la prochaine action utile.`,
    de: `Die gewählten Karten (${names}) sind keine feste Vorhersage; sie spiegeln Timing, Gefühl und den nächsten sinnvollen Schritt.`,
    pt: `As cartas escolhidas (${names}) não são previsão fixa; refletem tempo, emoção e o próximo passo prático.`
  };
  return {
    title: localizedTitle[lang] || localizedTitle.en,
    subtitle: summary[lang] || summary.en,
    blocks: [
      { key: "overview", title: t.overview, body: summary[lang] || summary.en },
      { key: "flow", title: t.flow, body: `${first?.aura || ""} ${second?.aura || ""}`.trim() },
      { key: "advice", title: t.advice, body: `${first?.mission || ""} ${second?.mission || ""}`.trim() },
      { key: "caution", title: t.caution, body: `${first?.warning || ""} ${second?.warning || ""}`.trim() }
    ]
  };
}

export default function App() {
  const [lang, setLang] = useState<Lang>(normalizeLang(localStorage.getItem("fate-lang")));
  const [mode, setMode] = useState<Mode>(normalizeMode(localStorage.getItem("fate-mode")));
  const [menuOpen, setMenuOpen] = useState(true);
  const [name, setName] = useState(localStorage.getItem("fate-name") || "");
  const [birth, setBirth] = useState(localStorage.getItem("fate-birth") || "2000-12-27");
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [drawnToday, setDrawnToday] = useState(false);
  const [dailyServerToken, setDailyServerToken] = useState<string | null>(null);
  const [poolSalt, setPoolSalt] = useState("0");
  const [selected, setSelected] = useState<DrawCard[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [guideQuery, setGuideQuery] = useState("");
  const [notice, setNotice] = useState("");

  const t = COPY[lang] || COPY.ko;
  const timeZone = getTimeZone(lang);
  const dateKey = metrics.dateKey || new Date().toISOString().slice(0, 10);
  const tab = t.tabs[mode];
  const required = REQUIRED[mode];
  const roles = ROLE_KEYS[mode] || [];
  const pool = useMemo(() => makePool(mode, lang, dateKey, name || "Guest", birth, poolSalt), [mode, lang, dateKey, name, birth, poolSalt]);
  const birthCard = useMemo(() => calculateBirthCard(birth, lang), [birth, lang]);
  const activeCards = mode === "birth" ? [birthCard] : selected;
  const reading = t.reading(mode, activeCards, birth);
  const canReveal = (mode === "birth") || (required > 0 && selected.length >= required);
  const sponsorEmail = "tbvjrkrh@gmail.com";

  useEffect(() => { localStorage.setItem("fate-lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("fate-mode", mode); }, [mode]);
  useEffect(() => { localStorage.setItem("fate-name", name); }, [name]);
  useEffect(() => { localStorage.setItem("fate-birth", birth); }, [birth]);

  useEffect(() => {
    setSelected([]);
    setShowReading(mode === "birth");
    setNotice("");
  }, [mode, lang, poolSalt]);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      try {
        const visit = await api("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, timeZone }) });
        if (!cancelled && visit.metrics) setMetrics(visit.metrics);
        const st = await api("/api/daily-status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, timeZone }) });
        if (!cancelled) {
          setDrawnToday(Boolean(st.drawnToday));
          setDailyServerToken(st.cardId || null);
          if (st.cardId && mode === "daily") {
            const c = cardFromToken(st.cardId, lang, dateKey);
            setSelected([c]);
            setShowReading(true);
          }
          if (st.metrics) setMetrics(st.metrics);
        }
      } catch {}
    }
    boot();
    return () => { cancelled = true; };
  }, [lang, timeZone, mode, dateKey]);

  async function recordShare() {
    try {
      const res = await api(`/api/share?timeZone=${encodeURIComponent(timeZone)}`, { method: "POST" });
      if (res.metrics) setMetrics(res.metrics);
    } catch {}
  }

  function flash(msg: string) {
    setNotice(msg);
    window.setTimeout(() => setNotice(""), 1800);
  }

  async function chooseCard(card: DrawCard) {
    if (mode === "birth" || mode === "deck" || mode === "sponsor") return;
    if (selected.some((c) => c.token === card.token)) return;
    if (selected.length >= required) return;

    if (mode === "daily") {
      if (drawnToday && dailyServerToken) {
        const locked = cardFromToken(dailyServerToken, lang, dateKey);
        setSelected([locked]);
        setShowReading(true);
        flash(t.locked);
        return;
      }
      try {
        const res = await api("/api/draw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, timeZone, cardId: card.token }) });
        if (res.metrics) setMetrics(res.metrics);
        if (res.allowed === false && res.cardId) {
          const locked = cardFromToken(res.cardId, lang, dateKey);
          setSelected([locked]);
          setDailyServerToken(res.cardId);
          setDrawnToday(true);
          setShowReading(true);
          flash(t.locked);
          return;
        }
        setDailyServerToken(card.token);
        setDrawnToday(true);
      } catch {}
    }

    const next = [...selected, card].slice(0, required);
    setSelected(next);
    if (next.length >= required) setShowReading(true);
  }

  function shuffle() {
    setPoolSalt(String(Date.now()));
    setSelected([]);
    setShowReading(mode === "birth");
  }

  async function copyReading() {
    const text = `${reading.title}\n${reading.subtitle}\n\n${reading.blocks.map((b) => `[${b.title}]\n${b.body}`).join("\n\n")}`;
    try {
      await navigator.clipboard?.writeText(text);
      flash(t.copied);
      await recordShare();
    } catch { flash(t.copied); }
  }

  function switchMode(m: Mode) {
    setMode(m);
    setMenuOpen(window.innerWidth > 860);
  }

  const filteredDeck = useMemo(() => {
    const q = guideQuery.toLowerCase().trim();
    return TAROT_DECK.filter((base) => {
      const txt = [base.id, base.arcana, base.title.en, base.title.ko, base.keywords.upright.en, base.keywords.upright.ko, base.keywords.reversed.en, base.keywords.reversed.ko].join(" ").toLowerCase();
      return !q || txt.includes(q);
    }).slice(0, 78);
  }, [guideQuery]);

  return (
    <div className="appShell">
      <aside className={`sideNav ${menuOpen ? "open" : ""}`}>
        <div className="brandRow">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menu}>☰</button>
          <div className="brandMark">☽</div>
          <div><b>FateCard.today</b><small>{t.brandSub}</small></div>
        </div>
        <nav>
          {(["daily", "love", "three", "yesno", "birth", "deck"] as Mode[]).map((m) => (
            <button key={m} className={mode === m ? "active" : ""} onClick={() => switchMode(m)}>
              <span>{t.tabs[m].icon}</span><strong>{t.tabs[m].title}</strong><small>{t.tabs[m].subtitle}</small>
            </button>
          ))}
        </nav>
        <div className="sideAd">
          <p>{t.noCopy}</p>
        </div>
        <button className="sponsorMini" onClick={() => switchMode("sponsor")}>{t.tabs.sponsor.icon} {t.tabs.sponsor.title}</button>
      </aside>

      <main className="mainStage">
        <header className="topBar">
          <button className="hamburger floating" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menu}>☰</button>
          <div className="topCopy">{t.aiSubtitle}</div>
          <label className="langSelect">
            <span>◎</span>
            <select value={lang} onChange={(e) => setLang(normalizeLang(e.target.value))}>
              {Object.entries(LANGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </label>
        </header>

        {mode !== "deck" && mode !== "sponsor" && (
          <section className="heroReading">
            <div className="heroCopy">
              <div className="eyebrow">{t.brandSub}</div>
              <h1>{mode === "daily" ? t.aiTitle : tab.title}</h1>
              <p>{tab.subtitle}</p>
              <div className="stepper">
                <span className="done">1 {t.step1}</span>
                <i />
                <span className={selected.length > 0 || mode === "birth" ? "done" : ""}>2 {t.step2}</span>
                <i />
                <span className={showReading ? "done" : ""}>3 {t.step3}</span>
              </div>
              <div className="miniForm">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Guest" />
                <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
              </div>
            </div>
            <div className="heroCardPreview">
              {(mode === "birth" ? birthCard : selected[0] || pool[0]) && (
                <img src={(mode === "birth" ? birthCard : selected[0] || pool[0]).artPath} alt="" />
              )}
            </div>
          </section>
        )}

        {mode !== "birth" && mode !== "deck" && mode !== "sponsor" && (
          <section className="drawBoard">
            <div className="boardHeader">
              <div>
                <h2>{tab.title}</h2>
                <p>{selected.length >= required ? t.selectedCount(selected.length, required) : t.drawInstruction(required)}</p>
              </div>
              <div className="hintChip">✦ {t.chooseHint}</div>
            </div>

            <div className={`cardLine count${required}`}>
              {pool.slice(0, mode === "yesno" ? 5 : 8).map((card, idx) => {
                const isSelected = selected.some((c) => c.token === card.token);
                const role = selected.findIndex((c) => c.token === card.token);
                return (
                  <button key={`${card.token}-${idx}`} className={`drawCard ${isSelected ? "revealed" : ""}`} onClick={() => chooseCard(card)} onTouchStart={() => {}} disabled={!isSelected && selected.length >= required}>
                    <span className="slotNo">{idx + 1}</span>
                    {isSelected ? <img src={card.artPath} alt={card.title} /> : <div className="cardBack"><b>☽</b><i /></div>}
                    <em>{isSelected ? (t.roles[roles[role]] || card.title) : roles[idx] ? t.roles[roles[idx]] : ""}</em>
                  </button>
                );
              })}
            </div>

            <div className="actionRow">
              <button onClick={shuffle}>↻ {t.shuffle}</button>
              <button className="primary" disabled={!canReveal} onClick={() => setShowReading(true)}>✦ {t.reveal}</button>
              <button disabled={selected.length === 0} onClick={() => { setSelected([]); setShowReading(false); }}>⌫ {t.reset}</button>
            </div>
            {mode === "daily" && <p className="microNote">{drawnToday ? t.locked : t.onePerDay} · {t.localReset}</p>}
          </section>
        )}

        {mode === "birth" && (
          <section className="drawBoard birthBoard">
            <div className="boardHeader">
              <div><h2>{t.tabs.birth.title}</h2><p>{t.tabs.birth.subtitle}</p></div>
              <div className="hintChip">✶ {birth || t.enterBirth}</div>
            </div>
            <div className="birthGrid">
              <div className="birthInput">
                <label>{t.enterBirth}</label>
                <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
                <button className="primary" onClick={() => setShowReading(true)}>{t.calculate}</button>
              </div>
              <div className="birthCard"><img src={birthCard.artPath} alt={birthCard.title} /><h3>{birthCard.title}</h3><p>{birthCard.subtitle}</p></div>
            </div>
          </section>
        )}

        {showReading && mode !== "deck" && mode !== "sponsor" && (
          <section className="readingPanel">
            <div className="resultCards">
              <h2>{reading.title}</h2>
              <p>{reading.subtitle}</p>
              <div className="selectedStrip">
                {activeCards.map((c, i) => (
                  <div key={`${c.token}-${i}`}>
                    <img src={c.artPath} alt={c.title} />
                    <span>{t.roles[roles[i]] || c.title}</span>
                    <b>{c.title}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="readingBlocks">
              {reading.blocks.map((b) => (
                <article key={b.key}>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </article>
              ))}
              <div className="actionRow inline">
                <button onClick={copyReading}>↗ {t.share}</button>
                <button onClick={copyReading}>⌘ {t.copy || t.share}</button>
              </div>
            </div>
          </section>
        )}

        {mode === "deck" && (
          <section className="deckPage">
            <div className="deckHead">
              <div><h1>{t.tabs.deck.title}</h1><p>{t.noCopy}</p></div>
              <input value={guideQuery} onChange={(e) => setGuideQuery(e.target.value)} placeholder={t.search} />
            </div>
            <div className="deckGrid">
              {filteredDeck.map((base) => {
                const c = makeCard(base, lang, `guide-${base.id}`, false);
                return (
                  <article key={base.id} className="deckItem">
                    <img src={c.artPath} alt={c.title} />
                    <div><h3>{c.title}</h3><p>{c.subtitle}</p><small>{c.mission}</small></div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {mode === "sponsor" && (
          <section className="sponsorPage">
            <h1>{t.sponsorTitle}</h1>
            <p>{t.sponsorText}</p>
            <a href={`mailto:${sponsorEmail}`}>{sponsorEmail}</a>
          </section>
        )}

        <footer>
          <span>{t.entertainment}</span>
          <span>{t.stats}: {metrics.totalPageViews || 0}</span>
        </footer>
      </main>
    </div>
  );
}
