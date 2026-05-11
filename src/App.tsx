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
  artPath: string;
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

const DEFAULT_EMAIL = "tbvjrkrh@gmail.com";
type RuntimeConfig = { siteUrl: string; configuredSiteUrl: string; hostUrl: string; sponsorEmail: string; supportUrl: string; premiumUrl: string; };

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


const FEATURE_UI: any = {
  en: {
    nav: [["daily","Daily"],["freeTest","3-Card"],["yesno","Yes/No"],["love","Love"],["birth","Birth"],["guide","78 Cards"],["spreads","Spreads"],["journal","Journal"],["learn","Learn"],["contact","Sponsor"]],
    portalEyebrow: "TAROT TOOLKIT", portalTitle: "Not a menu. Real working features.", portalDesc: "Daily card, free mini reading, 78-card guide, spreads, interpreter, prompt builder, vote, updates, and contact are all usable sections.",
    featureCards: [
      { id:"daily", icon:"✦", title:"Daily Card", desc:"One card per local day. The main ritual." }, { id:"freeTest", icon:"🃏", title:"Free 3-Card", desc:"Past / Present / Next mini reading." }, { id:"yesno", icon:"☯", title:"Yes / No", desc:"Fast one-card answer with grounded advice." }, { id:"love", icon:"♥", title:"Love Tarot", desc:"Two-heart relationship snapshot." }, { id:"birth", icon:"☉", title:"Birth Card", desc:"Major Arcana card from birth date." }, { id:"guide", icon:"📖", title:"78 Card Guide", desc:"Search meanings by card, suit, or keyword." }, { id:"spreads", icon:"◇", title:"Spreads", desc:"Topic-based layouts for decision clarity." }, { id:"journal", icon:"✍", title:"Journal", desc:"Save today’s reflection in this browser." }, { id:"learn", icon:"🎓", title:"Learn / Quiz", desc:"Card-of-the-moment meaning practice." }, { id:"interpreter", icon:"🤖", title:"Interpreter", desc:"Structured reading from card + question." }, { id:"prompts", icon:"⌘", title:"Prompt Builder", desc:"Copy prompts for deeper AI reflection." }, { id:"community", icon:"▣", title:"Community", desc:"Vote for the next feature." }, { id:"updates", icon:"📣", title:"Updates", desc:"Roadmap and changelog." }, { id:"contact", icon:"✉", title:"Sponsor / Contact", desc:"Ads, partners, localization." }
    ],
    goDaily:"Go to daily card", dailyTitle:"Daily Fate Card", dailyDesc:"Use the main card above. One draw is locked until local midnight.",
    freeTitle:"Free 3-card tarot test", freeDesc:"Draw Past / Present / Next using the same 78-card deck. This is free and separate from the daily lock.", draw3:"Draw free 3-card test", spreadLabels:["Past","Present","Next"], useInterp:"Use in interpreter", saveJournal:"Save to journal", copyReading:"Copy reading",
    yesTitle:"Yes / No tarot", yesDesc:"A quick one-card answer. Treat it as reflection, not certainty.", drawYes:"Draw yes / no card", answer:"Answer", yesUpright:"Leaning YES — but only if you act cleanly.", yesReverse:"Leaning NO / delay — fix the hidden issue first.",
    loveTitle:"Love tarot", loveDesc:"Two cards: your current energy and the relationship signal.", drawLove:"Draw two-heart reading", loveLabels:["Your energy","The signal"],
    birthTitle:"Birth card", birthDesc:"Enter a birth date above, then calculate a Major Arcana birth card.", calcBirth:"Calculate birth card", theme:"Theme",
    guideTitle:"78-card meaning guide", guidePlaceholder:"Search card, suit, keyword...", clickGuide:"Click a card to open it in the interpreter.",
    spreadsTitle:"Tarot spreads", spreadsDesc:"Pick a topic and draw a simple 3-card spread.", spreadTopics:{love:"love",money:"money",work:"work",mind:"mind"}, spreadLabels2:["Situation","Block","Action"], chooseTopic:"Choose a topic to draw.",
    journalTitle:"Daily tarot journal", journalDesc:"Write what today’s card makes you notice. Stored locally in this browser.", journalPlaceholder:"What did today's card make you notice?", save:"Save", clear:"Clear",
    learnTitle:"Learn / quiz", learnDesc:"Practice card meanings.", newQuiz:"New quiz card", reveal:"Reveal meaning", quizPlaceholder:"What do you think this card means?", reference:"Reference",
    interpTitle:"AI-style tarot interpreter", interpDesc:"Structured interpretation using your selected tarot card and question.", questionPlaceholder:"Write your question...", action:"Action", warning:"Warning",
    promptsTitle:"Tarot prompt builder", promptsDesc:"Copy prompts for ChatGPT, Claude, Gemini, or any AI tool.", copyPrompt:"Copy prompt",
    communityTitle:"Community vote", communityDesc:"Vote on the next feature. Prototype votes are saved in your browser.", voteOptions:["Love compatibility","Weekly report","Share card themes","Full localization","Premium deep reading"], yourVote:"Your vote",
    updatesTitle:"Update news", next:"Next", contactTitle:"Sponsor / Contact", contactDesc:"Advertising, sponsor cards, collaboration, localization, or premium report partnerships.", copied:"Copied.", copiedToJournal:"Saved to journal.", noCard:"Draw or select a card first.",
    promptRole:(q:string, card:string, ori:string)=>`You are a practical tarot reader. My question is: "${q || "What should I focus on today?"}". Use ${card} (${ori}) as the core symbol. Give me: 1) the honest meaning, 2) what I may be avoiding, 3) one action I should take today, 4) one warning. Keep it grounded and do not claim certainty.`,
    reflectionPrompt:(topic:string)=>`Create a ${topic} tarot reflection for today. Use one-card-per-day discipline: no rerolls, no vague flattery. Give me one card archetype, one uncomfortable truth, one useful action, and one sentence I can share.`
  },
  ko: {
    nav: [["daily","데일리"],["freeTest","3카드"],["yesno","예/아니오"],["love","연애"],["birth","탄생카드"],["guide","78장"],["spreads","스프레드"],["journal","저널"],["learn","학습"],["contact","스폰서"]],
    portalEyebrow:"타로 도구 모음", portalTitle:"그냥 메뉴가 아니라 실제 작동하는 기능들", portalDesc:"하루 카드, 무료 3카드, 78장 가이드, 스프레드, 해석기, 프롬프트, 투표, 업데이트, 문의까지 모두 눌러서 사용할 수 있다.",
    featureCards:[{id:"daily",icon:"✦",title:"오늘의 카드",desc:"현지 시간 기준 하루 한 장."},{id:"freeTest",icon:"🃏",title:"무료 3카드",desc:"과거 / 현재 / 다음 흐름."},{id:"yesno",icon:"☯",title:"예 / 아니오",desc:"한 장으로 보는 빠른 판단."},{id:"love",icon:"♥",title:"연애 타로",desc:"두 장으로 보는 관계 신호."},{id:"birth",icon:"☉",title:"탄생 카드",desc:"생년월일 기반 메이저 카드."},{id:"guide",icon:"📖",title:"78장 가이드",desc:"카드·슈트·키워드 검색."},{id:"spreads",icon:"◇",title:"스프레드",desc:"주제별 3장 배열."},{id:"journal",icon:"✍",title:"저널",desc:"오늘의 해석 기록."},{id:"learn",icon:"🎓",title:"학습 / 퀴즈",desc:"카드 의미 연습."},{id:"interpreter",icon:"🤖",title:"해석기",desc:"질문과 카드 기반 해석."},{id:"prompts",icon:"⌘",title:"프롬프트",desc:"AI 해석용 문장 생성."},{id:"community",icon:"▣",title:"투표",desc:"다음 기능 선택."},{id:"updates",icon:"📣",title:"업데이트",desc:"로드맵과 변경사항."},{id:"contact",icon:"✉",title:"스폰서 / 문의",desc:"광고·제휴·번역 문의."}],
    goDaily:"오늘의 카드로 이동",dailyTitle:"오늘의 운명 카드",dailyDesc:"위의 메인 카드를 사용한다. 한 번 뽑으면 선택 언어 시간대 기준 00시까지 잠긴다.",
    freeTitle:"무료 3카드 타로",freeDesc:"동일한 78장 덱으로 과거 / 현재 / 다음 카드를 뽑는다. 하루 한 장 잠금과 별도로 무료 사용 가능.",draw3:"무료 3카드 뽑기",spreadLabels:["과거","현재","다음"],useInterp:"해석기로 보내기",saveJournal:"저널에 저장",copyReading:"리딩 복사",
    yesTitle:"예 / 아니오 타로",yesDesc:"한 장으로 빠르게 보는 답. 확정 예언이 아니라 참고용이다.",drawYes:"예/아니오 카드 뽑기",answer:"답변",yesUpright:"YES 쪽에 가깝다. 단, 깔끔하게 행동해야 한다.",yesReverse:"NO 또는 지연 쪽이다. 숨은 문제부터 고쳐라.",
    loveTitle:"연애 타로",loveDesc:"두 장으로 나의 에너지와 관계 신호를 본다.",drawLove:"두 장 연애 리딩",loveLabels:["나의 에너지","관계 신호"],
    birthTitle:"탄생 카드",birthDesc:"위 생년월일을 입력하고 메이저 아르카나 탄생 카드를 계산한다.",calcBirth:"탄생 카드 계산",theme:"테마",
    guideTitle:"78장 카드 해석 가이드",guidePlaceholder:"카드, 슈트, 키워드 검색...",clickGuide:"카드를 누르면 해석기로 연결된다.",
    spreadsTitle:"타로 스프레드",spreadsDesc:"주제를 고르면 3장 스프레드가 나온다.",spreadTopics:{love:"연애",money:"돈",work:"일",mind:"멘탈"},spreadLabels2:["상황","막힘","행동"],chooseTopic:"주제를 선택해 뽑아라.",
    journalTitle:"오늘의 타로 저널",journalDesc:"오늘 카드가 떠올리게 한 생각을 기록한다. 현재 브라우저에 저장된다.",journalPlaceholder:"오늘 카드가 무엇을 보게 했는가?",save:"저장",clear:"비우기",
    learnTitle:"학습 / 퀴즈",learnDesc:"카드 의미를 연습한다.",newQuiz:"새 퀴즈 카드",reveal:"의미 보기",quizPlaceholder:"이 카드의 의미를 추측해보세요.",reference:"참고",
    interpTitle:"AI식 타로 해석기",interpDesc:"선택한 카드와 질문을 바탕으로 구조화된 해석을 만든다.",questionPlaceholder:"질문을 적어라...",action:"행동",warning:"경고",
    promptsTitle:"타로 프롬프트 빌더",promptsDesc:"ChatGPT/Claude/Gemini 등에 넣을 프롬프트를 만든다.",copyPrompt:"프롬프트 복사",
    communityTitle:"커뮤니티 투표",communityDesc:"다음 기능을 고른다. 현재는 브라우저에 저장된다.",voteOptions:["연애 궁합","주간 리포트","공유 카드 테마","전체 현지화","프리미엄 심층 리딩"],yourVote:"내 투표",
    updatesTitle:"업데이트 소식",next:"다음",contactTitle:"스폰서 / 문의",contactDesc:"광고, 스폰서 카드, 제휴, 현지화, 프리미엄 리포트 문의.",copied:"복사됨.",copiedToJournal:"저널에 저장됨.",noCard:"먼저 카드를 뽑거나 선택해라.",
    promptRole:(q:string,card:string,ori:string)=>`당신은 현실적인 타로 리더다. 내 질문은 "${q || "오늘 무엇에 집중해야 할까?"}"이다. 핵심 상징으로 ${card} (${ori})를 사용해라. 1) 솔직한 의미 2) 내가 피하고 있는 것 3) 오늘 할 행동 4) 경고를 구체적으로 말해라. 확정 예언처럼 말하지 마라.`,
    reflectionPrompt:(topic:string)=>`오늘의 ${topic} 타로 성찰을 만들어라. 하루 한 장 원칙을 지켜라. 다시 뽑기 없음, 모호한 칭찬 없음. 카드 원형, 불편한 진실, 실천 행동, 공유용 한 문장을 줘라.`
  }
};
FEATURE_UI.ja = { ...FEATURE_UI.en, nav:[["daily","毎日"],["freeTest","3枚"],["yesno","Yes/No"],["love","恋愛"],["birth","誕生"],["guide","78枚"],["spreads","展開"],["journal","日記"],["learn","学習"],["contact","連絡"]], portalEyebrow:"タロットツール", portalTitle:"ただのメニューではなく、実際に使える機能", portalDesc:"毎日のカード、3枚引き、78枚ガイド、スプレッド、解釈、プロンプト、投票、連絡まで使えます.", draw3:"無料3枚を引く", drawYes:"Yes/Noカードを引く", drawLove:"恋愛リーディング", calcBirth:"誕生カード計算", save:"保存", clear:"削除", copied:"コピーしました.", copiedToJournal:"日記に保存しました.", noCard:"先にカードを選んでください." };
FEATURE_UI.zh = { ...FEATURE_UI.en, nav:[["daily","每日"],["freeTest","三张牌"],["yesno","是/否"],["love","爱情"],["birth","出生牌"],["guide","78张"],["spreads","牌阵"],["journal","日记"],["learn","学习"],["contact","联系"]], portalEyebrow:"塔罗工具", portalTitle:"不是菜单，而是真正可用的功能", portalDesc:"每日牌、三张牌、78张指南、牌阵、解释器、提示词、投票、联系都可以使用。", draw3:"抽免费三张牌", drawYes:"抽是/否牌", drawLove:"抽爱情牌", calcBirth:"计算出生牌", save:"保存", clear:"清除", copied:"已复制.", copiedToJournal:"已保存到日记.", noCard:"请先选择一张牌." };
FEATURE_UI.es = { ...FEATURE_UI.en, nav:[["daily","Diaria"],["freeTest","3 cartas"],["yesno","Sí/No"],["love","Amor"],["birth","Natal"],["guide","78 cartas"],["spreads","Tiradas"],["journal","Diario"],["learn","Aprender"],["contact","Contacto"]], portalEyebrow:"HERRAMIENTAS DE TAROT", portalTitle:"No es un menú. Son funciones reales.", portalDesc:"Carta diaria, lectura de 3 cartas, guía de 78 cartas, tiradas, intérprete, prompts, votación y contacto.", draw3:"Sacar 3 cartas gratis", drawYes:"Sacar carta Sí/No", drawLove:"Lectura de amor", calcBirth:"Calcular carta natal", save:"Guardar", clear:"Borrar", copied:"Copiado.", copiedToJournal:"Guardado en el diario.", noCard:"Elige una carta primero." };
FEATURE_UI.fr = { ...FEATURE_UI.en, nav:[["daily","Jour"],["freeTest","3 cartes"],["yesno","Oui/Non"],["love","Amour"],["birth","Naissance"],["guide","78 cartes"],["spreads","Tirages"],["journal","Journal"],["learn","Apprendre"],["contact","Contact"]], portalEyebrow:"OUTILS TAROT", portalTitle:"Pas un simple menu. De vraies fonctions.", portalDesc:"Carte du jour, tirage 3 cartes, guide 78 cartes, tirages, interprète, prompts, vote et contact.", draw3:"Tirer 3 cartes gratuites", drawYes:"Tirer Oui/Non", drawLove:"Tirage amour", calcBirth:"Calculer la carte de naissance", save:"Enregistrer", clear:"Effacer", copied:"Copié.", copiedToJournal:"Enregistré dans le journal.", noCard:"Choisis d'abord une carte." };
FEATURE_UI.de = { ...FEATURE_UI.en, nav:[["daily","Täglich"],["freeTest","3 Karten"],["yesno","Ja/Nein"],["love","Liebe"],["birth","Geburt"],["guide","78 Karten"],["spreads","Legungen"],["journal","Journal"],["learn","Lernen"],["contact","Kontakt"]], portalEyebrow:"TAROT-WERKZEUGE", portalTitle:"Kein Menü. Echte Funktionen.", portalDesc:"Tageskarte, 3-Karten-Legung, 78-Karten-Guide, Legungen, Interpreter, Prompts, Abstimmung und Kontakt.", draw3:"3 Karten gratis ziehen", drawYes:"Ja/Nein-Karte ziehen", drawLove:"Liebeslegung", calcBirth:"Geburtskarte berechnen", save:"Speichern", clear:"Leeren", copied:"Kopiert.", copiedToJournal:"Im Journal gespeichert.", noCard:"Wähle zuerst eine Karte." };
FEATURE_UI.pt = { ...FEATURE_UI.en, nav:[["daily","Diária"],["freeTest","3 cartas"],["yesno","Sim/Não"],["love","Amor"],["birth","Nascimento"],["guide","78 cartas"],["spreads","Tiragens"],["journal","Diário"],["learn","Aprender"],["contact","Contato"]], portalEyebrow:"FERRAMENTAS DE TAROT", portalTitle:"Não é só menu. São funções reais.", portalDesc:"Carta diária, 3 cartas, guia de 78 cartas, tiragens, intérprete, prompts, votação e contato.", draw3:"Tirar 3 cartas grátis", drawYes:"Tirar Sim/Não", drawLove:"Leitura de amor", calcBirth:"Calcular carta de nascimento", save:"Salvar", clear:"Limpar", copied:"Copiado.", copiedToJournal:"Salvo no diário.", noCard:"Escolha uma carta primeiro." };

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
    artPath: `/cards/${base.id}.svg`,
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
  const [feature, setFeature] = useState<string>("daily");
  const [guideQuery, setGuideQuery] = useState("");
  const [spreadTopic, setSpreadTopic] = useState("love");
  const [spreadCards, setSpreadCards] = useState<FateCard[]>([]);
  const [interpCardId, setInterpCardId] = useState(BASE_CARDS[0]?.id || "");
  const [interpReverse, setInterpReverse] = useState(false);
  const [interpQuestion, setInterpQuestion] = useState("");
  const [promptTopic, setPromptTopic] = useState("love");
  const [pollChoice, setPollChoice] = useState("");
  const [yesNoCard, setYesNoCard] = useState<FateCard | null>(null);
  const [loveCards, setLoveCards] = useState<FateCard[]>([]);
  const [birthResult, setBirthResult] = useState<FateCard | null>(null);
  const [journalText, setJournalText] = useState(localStorage.getItem("fate-journal") || "");
  const [quizCard, setQuizCard] = useState<FateCard | null>(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizReveal, setQuizReveal] = useState(false);
  const [featureNotice, setFeatureNotice] = useState("");
  const shareCanvas = useRef<HTMLCanvasElement | null>(null);

  const t = UI[lang];
  const ft = FEATURE_UI[lang] || FEATURE_UI.en;
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

  const flash = (msg: string) => {
    setFeatureNotice(msg);
    window.setTimeout(() => setFeatureNotice(""), 1800);
  };

  const copyPlain = async (text: string) => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      flash(ft.copied);
    } catch {
      flash(ft.copied);
    }
  };

  const addJournal = (text: string) => {
    const next = [journalText, text].filter(Boolean).join("\n\n---\n\n");
    setJournalText(next);
    localStorage.setItem("fate-journal", next);
    flash(ft.copiedToJournal);
  };

  const openInInterpreter = (c?: FateCard | null, question = "") => {
    if (!c) {
      flash(ft.noCard);
      return;
    }
    setInterpCardId(c.id);
    setInterpReverse(c.orientation === "reversed");
    if (question) setInterpQuestion(question);
    setFeature("interpreter");
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const featureReadingText = (title: string, cards: FateCard[]) => {
    return `${title}\n` + cards.filter(Boolean).map((c, i) => `${i + 1}. ${c.title} (${c.orientation}) — ${c.mission}`).join("\n");
  };


  const featureCards = ft.featureCards;

  const drawSpread = (topic = spreadTopic) => {
    const seedBase = hashString(`${dateKey}|${name}|${birth}|${topic}|spread`);
    const used = new Set<string>();
    const picked: FateCard[] = [];
    for (let i = 0; i < 3; i++) {
      let idx = Math.abs(seedBase + i * 17 + (seedBase >> (i + 2))) % BASE_CARDS.length;
      while (used.has(BASE_CARDS[idx].id)) idx = (idx + 1) % BASE_CARDS.length;
      used.add(BASE_CARDS[idx].id);
      picked.push(cardFromBase(BASE_CARDS[idx], lang, `${dateKey}-spread-${topic}-${i}`, ((seedBase >> (i + 5)) % 100) < 28));
    }
    setSpreadCards(picked);
    setSpreadTopic(topic);
  };


  const drawYesNo = () => {
    const seed = hashString(`${dateKey}|${name}|${birth}|yesno|${Date.now()}`);
    const base = BASE_CARDS[Math.abs(seed) % BASE_CARDS.length];
    const reversed = (Math.abs(seed >> 4) % 100) < 35;
    setYesNoCard(cardFromBase(base, lang, `${dateKey}-yesno-${seed}`, reversed));
  };

  const drawLove = () => {
    const seed = hashString(`${dateKey}|${name}|${birth}|love`);
    const first = BASE_CARDS[Math.abs(seed) % BASE_CARDS.length];
    let secondIdx = Math.abs(seed + 31) % BASE_CARDS.length;
    if (BASE_CARDS[secondIdx].id === first.id) secondIdx = (secondIdx + 1) % BASE_CARDS.length;
    setLoveCards([
      cardFromBase(first, lang, `${dateKey}-love-self`, (seed % 100) < 30),
      cardFromBase(BASE_CARDS[secondIdx], lang, `${dateKey}-love-other`, ((seed >> 3) % 100) < 30)
    ]);
  };

  const calculateBirthCard = () => {
    const value = birth || "2000-12-27";
    const digits = value.replace(/[^0-9]/g, "").split("").map((n) => Number(n));
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 21) sum = String(sum).split("").reduce((a, b) => a + Number(b), 0);
    const major = BASE_CARDS.filter((c: any) => c.arcana === "major");
    const base = major[sum % major.length] || BASE_CARDS[0];
    setBirthResult(cardFromBase(base, lang, `${value}-birth`, false));
  };

  const saveJournal = () => {
    localStorage.setItem("fate-journal", journalText);
  };

  const newQuizCard = () => {
    const seed = hashString(`${dateKey}|quiz|${Date.now()}|${Math.random()}`);
    const base = BASE_CARDS[Math.abs(seed) % BASE_CARDS.length];
    setQuizCard(cardFromBase(base, lang, `${dateKey}-quiz-${seed}`, false));
    setQuizAnswer("");
    setQuizReveal(false);
  };

  const selectedInterpBase = BASE_CARDS.find((c: any) => c.id === interpCardId) || BASE_CARDS[0];
  const selectedInterpCard = cardFromBase(selectedInterpBase, lang, `${dateKey}-interp`, interpReverse);

  const generatedPrompt = ft.promptRole(interpQuestion, selectedInterpCard.title, selectedInterpCard.orientation);

  const reflectionPrompt = ft.reflectionPrompt(promptTopic);

  const filteredGuideCards = BASE_CARDS.filter((base: any) => {
    const txt = [base.id, base.arcana, base.title?.en, base.title?.ko, base.keywords?.upright?.en, base.keywords?.upright?.ko, base.keywords?.reversed?.en, base.keywords?.reversed?.ko].filter(Boolean).join(" ").toLowerCase();
    return txt.includes(guideQuery.toLowerCase());
  }).slice(0, 24);

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

        <div className="siteNav" aria-label="FateCard sections">
          {ft.nav.map(([id, label]: [string, string]) => (
            <button key={id} onClick={() => { setFeature(id); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }); }}>{label}</button>
          ))}
        </div>

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
                <div className="tarotArtFrame">
                  <img src={currentCard.artPath} alt={`${currentCard.title} tarot illustration`} loading="lazy" />
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


      <section className="featurePortal" id="features">
        <div className="featureIntro">
          <p className="eyebrow">{ft.portalEyebrow}</p>
          <h3>{ft.portalTitle}</h3>
          <p>{ft.portalDesc}</p>
          {featureNotice && <div className="featureNotice">{featureNotice}</div>}
        </div>

        <div className="featureGrid">
          {featureCards.map((item: any) => (
            <button key={item.id} className={`featureTile ${feature === item.id ? "active" : ""}`} onClick={() => setFeature(item.id)}>
              <span>{item.icon}</span>
              <b>{item.title}</b>
              <small>{item.desc}</small>
            </button>
          ))}
        </div>

        <div className="featurePanel">
          {feature === "daily" && <div className="panelCard"><h4>{ft.dailyTitle}</h4><p>{ft.dailyDesc}</p><div className="chainActions"><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{ft.goDaily}</button><button onClick={() => openInInterpreter(currentCard)}>{ft.useInterp}</button><button onClick={() => addJournal(`${ft.dailyTitle}: ${currentCard.title} — ${currentCard.mission}`)}>{ft.saveJournal}</button></div></div>}

          {feature === "freeTest" && <div className="panelCard"><h4>{ft.freeTitle}</h4><p>{ft.freeDesc}</p><button onClick={() => drawSpread("free")}>{ft.draw3}</button>{spreadCards.length > 0 && <><div className="miniSpread">{ft.spreadLabels.map((label: string, i: number) => <div className="miniCard" key={label}><span>{label}</span><b>{spreadCards[i]?.symbol} {spreadCards[i]?.title}</b><small>{spreadCards[i]?.subtitle}</small><p>{spreadCards[i]?.mission}</p><button onClick={() => openInInterpreter(spreadCards[i], label)}>{ft.useInterp}</button></div>)}</div><div className="chainActions"><button onClick={() => copyPlain(featureReadingText(ft.freeTitle, spreadCards))}>{ft.copyReading}</button><button onClick={() => addJournal(featureReadingText(ft.freeTitle, spreadCards))}>{ft.saveJournal}</button></div></>}</div>}

          {feature === "yesno" && <div className="panelCard"><h4>{ft.yesTitle}</h4><p>{ft.yesDesc}</p><button onClick={drawYesNo}>{ft.drawYes}</button>{yesNoCard && <div className="readingBox"><b>{yesNoCard.symbol} {yesNoCard.title}</b><p><strong>{ft.answer}:</strong> {yesNoCard.orientation === "upright" ? ft.yesUpright : ft.yesReverse}</p><p>{yesNoCard.aura}</p><p><strong>{ft.action}:</strong> {yesNoCard.mission}</p><div className="chainActions"><button onClick={() => openInInterpreter(yesNoCard, ft.yesTitle)}>{ft.useInterp}</button><button onClick={() => addJournal(`${ft.yesTitle}: ${yesNoCard.title} — ${yesNoCard.mission}`)}>{ft.saveJournal}</button></div></div>}</div>}

          {feature === "love" && <div className="panelCard lovePanel"><h4>{ft.loveTitle}</h4><p>{ft.loveDesc}</p><button onClick={drawLove}>{ft.drawLove}</button>{loveCards.length > 0 && <><div className="miniSpread">{ft.loveLabels.map((label: string, i: number) => <div className="miniCard heartCard" key={label}><span>{label}</span><b>{loveCards[i]?.symbol} {loveCards[i]?.title}</b><small>{loveCards[i]?.subtitle}</small><p>{loveCards[i]?.mission}</p><button onClick={() => openInInterpreter(loveCards[i], label)}>{ft.useInterp}</button></div>)}</div><div className="chainActions"><button onClick={() => copyPlain(featureReadingText(ft.loveTitle, loveCards))}>{ft.copyReading}</button><button onClick={() => addJournal(featureReadingText(ft.loveTitle, loveCards))}>{ft.saveJournal}</button></div></>}</div>}

          {feature === "birth" && <div className="panelCard"><h4>{ft.birthTitle}</h4><p>{ft.birthDesc}</p><button onClick={calculateBirthCard}>{ft.calcBirth}</button>{birthResult && <div className="readingBox"><b>{birthResult.symbol} {birthResult.title}</b><p>{birthResult.aura}</p><p><strong>{ft.theme}:</strong> {birthResult.mission}</p><div className="chainActions"><button onClick={() => openInInterpreter(birthResult, ft.birthTitle)}>{ft.useInterp}</button><button onClick={() => addJournal(`${ft.birthTitle}: ${birthResult.title} — ${birthResult.mission}`)}>{ft.saveJournal}</button></div></div>}</div>}

          {feature === "guide" && <div className="panelCard"><h4>{ft.guideTitle}</h4><p>{ft.clickGuide}</p><input className="featureInput" value={guideQuery} onChange={(e) => setGuideQuery(e.target.value)} placeholder={ft.guidePlaceholder} /><div className="guideList">{filteredGuideCards.map((base: any) => { const c = cardFromBase(base, lang, `${dateKey}-guide-${base.id}`, false); return <article key={base.id} onClick={() => openInInterpreter(c, ft.guideTitle)} role="button" tabIndex={0}><img className="guideThumb" src={c.artPath} alt="" loading="lazy" /><div><b>{c.title}</b><small>{c.archetype} · {c.subtitle}</small><p>{c.mission}</p></div></article>; })}</div></div>}

          {feature === "spreads" && <div className="panelCard"><h4>{ft.spreadsTitle}</h4><p>{ft.spreadsDesc}</p><div className="pillRow">{Object.entries(ft.spreadTopics).map(([topic, label]: [string, any]) => <button key={topic} className={spreadTopic === topic ? "selected" : ""} onClick={() => drawSpread(topic)}>{label}</button>)}</div>{spreadCards.length === 0 ? <p className="muted">{ft.chooseTopic}</p> : <><div className="miniSpread">{ft.spreadLabels2.map((label: string, i: number) => <div className="miniCard" key={label}><span>{label}</span><b>{spreadCards[i]?.symbol} {spreadCards[i]?.title}</b><small>{spreadCards[i]?.subtitle}</small><p>{spreadCards[i]?.warning}</p><button onClick={() => openInInterpreter(spreadCards[i], label)}>{ft.useInterp}</button></div>)}</div><div className="chainActions"><button onClick={() => copyPlain(featureReadingText(ft.spreadsTitle, spreadCards))}>{ft.copyReading}</button><button onClick={() => addJournal(featureReadingText(ft.spreadsTitle, spreadCards))}>{ft.saveJournal}</button></div></>}</div>}

          {feature === "journal" && <div className="panelCard"><h4>{ft.journalTitle}</h4><p>{ft.journalDesc}</p><textarea value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder={ft.journalPlaceholder} /><div className="chainActions"><button onClick={saveJournal}>{ft.save}</button><button onClick={() => { setJournalText(""); localStorage.removeItem("fate-journal"); }}>{ft.clear}</button></div></div>}

          {feature === "learn" && <div className="panelCard"><h4>{ft.learnTitle}</h4><p>{ft.learnDesc}</p><button onClick={newQuizCard}>{ft.newQuiz}</button>{quizCard && <div className="readingBox"><b>{quizCard.symbol} {quizCard.title}</b><input className="featureInput" value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)} placeholder={ft.quizPlaceholder} /><div className="chainActions"><button onClick={() => setQuizReveal(true)}>{ft.reveal}</button><button onClick={() => openInInterpreter(quizCard, ft.learnTitle)}>{ft.useInterp}</button></div>{quizReveal && <><p><strong>{ft.reference}:</strong> {quizCard.subtitle}</p><p>{quizCard.mission}</p></>}</div>}</div>}

          {feature === "interpreter" && <div className="panelCard"><h4>{ft.interpTitle}</h4><p>{ft.interpDesc}</p><div className="formGrid"><select value={interpCardId} onChange={(e) => setInterpCardId(e.target.value)}>{BASE_CARDS.map((base: any) => <option key={base.id} value={base.id}>{cardFromBase(base, lang, "option", false).title}</option>)}</select><label className="toggleLine"><input type="checkbox" checked={interpReverse} onChange={(e) => setInterpReverse(e.target.checked)} /> Reversed</label></div><textarea value={interpQuestion} onChange={(e) => setInterpQuestion(e.target.value)} placeholder={ft.questionPlaceholder} /><div className="readingBox"><b>{selectedInterpCard.symbol} {selectedInterpCard.title}</b><p>{selectedInterpCard.aura}</p><p><strong>{ft.action}:</strong> {selectedInterpCard.mission}</p><p><strong>{ft.warning}:</strong> {selectedInterpCard.warning}</p><div className="chainActions"><button onClick={() => copyPlain(generatedPrompt)}>{ft.copyPrompt}</button><button onClick={() => addJournal(`${ft.interpTitle}: ${selectedInterpCard.title} — ${selectedInterpCard.mission}`)}>{ft.saveJournal}</button></div></div></div>}

          {feature === "prompts" && <div className="panelCard"><h4>{ft.promptsTitle}</h4><p>{ft.promptsDesc}</p><div className="pillRow">{["love", "money", "work", "mind", "decision"].map((topic) => <button key={topic} className={promptTopic === topic ? "selected" : ""} onClick={() => setPromptTopic(topic)}>{topic}</button>)}</div><textarea readOnly value={reflectionPrompt} /><button onClick={() => copyPlain(reflectionPrompt)}>{ft.copyPrompt}</button></div>}

          {feature === "community" && <div className="panelCard"><h4>{ft.communityTitle}</h4><p>{ft.communityDesc}</p><div className="voteGrid">{ft.voteOptions.map((v: string) => <button key={v} className={pollChoice === v ? "selected" : ""} onClick={() => { setPollChoice(v); localStorage.setItem("fate-poll", v); }}>{v}</button>)}</div>{pollChoice && <p className="muted">{ft.yourVote}: {pollChoice}</p>}</div>}

          {feature === "updates" && <div className="panelCard"><h4>{ft.updatesTitle}</h4><ul className="updateList"><li><b>v15:</b> Full feature UI localization and chained interactions.</li><li><b>v14:</b> Popular tarot-site inspired feature map and mystical UI polish.</li><li><b>v13:</b> Real feature portal added.</li><li><b>{ft.next}:</b> database-backed visitor analytics, server-side polls, premium reports, real generated assets.</li></ul></div>}

          {feature === "contact" && <div className="panelCard"><h4>{ft.contactTitle}</h4><p>{ft.contactDesc}</p><a className="contactButton" href={`mailto:${sponsorEmail}`}>{sponsorEmail}</a></div>}
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
function Score({ label, value }: { label: string; value: number }) {
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
