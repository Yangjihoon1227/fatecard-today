import React, { useEffect, useMemo, useState } from "react";
import { TAROT_DECK, getTarotText, type SupportedCardLang, type TarotCardBase } from "./tarotDeck";

type Lang = SupportedCardLang;
type Mode = "home" | "daily" | "love" | "three" | "yesno" | "birth" | "months" | "deck" | "sponsor";
type Gender = "unset" | "female" | "male" | "nonbinary" | "private";
type DrawCard = {
  id: string;
  base: TarotCardBase;
  title: string;
  orientation: "upright" | "reversed";
  subtitle: string;
  aura: string;
  mission: string;
  warning: string;
  archetype: string;
  artPath: string;
};
type ReadingBlock = { icon: string; title: string; body: string };
type Personal = { name: string; birth: string; gender: Gender; job: string };

const LANGS: Record<Lang, { label: string; timeZone: string }> = {
  en:{label:"English",timeZone:"device"},
  ko:{label:"한국어",timeZone:"Asia/Seoul"},
  ja:{label:"日本語",timeZone:"Asia/Tokyo"},
  zh:{label:"中文",timeZone:"Asia/Shanghai"},
  es:{label:"Español",timeZone:"Europe/Madrid"},
  fr:{label:"Français",timeZone:"Europe/Paris"},
  de:{label:"Deutsch",timeZone:"Europe/Berlin"},
  pt:{label:"Português",timeZone:"America/Sao_Paulo"}
};

const READING_COUNTS: Record<Mode, number> = {
  home: 0,
  daily: 1,
  love: 5,
  three: 3,
  yesno: 1,
  birth: 3,
  months: 18,
  deck: 0,
  sponsor: 0
};

const RWS_MAJOR: Record<string, string> = {"0":"Fool","1":"Magician","2":"High Priestess","3":"Empress","4":"Emperor","5":"Hierophant","6":"Lovers","7":"Chariot","8":"Strength","9":"Hermit","10":"Wheel of Fortune","11":"Justice","12":"Hanged Man","13":"Death","14":"Temperance","15":"Devil","16":"Tower","17":"Star","18":"Moon","19":"Sun","20":"Judgement","21":"World"};
const RWS_RANK: Record<string, string> = { ace:"01", two:"02", three:"03", four:"04", five:"05", six:"06", seven:"07", eight:"08", nine:"09", ten:"10", page:"11", knight:"12", queen:"13", king:"14" };
const RWS_SUIT: Record<string, string> = { cups:"Cups", pentacles:"Pentacles", swords:"Swords", wands:"Wands" };

function rwsImageUrl(cardId: string) {
  let file = "";
  if (cardId.startsWith("major_")) {
    const parts = cardId.split("_");
    const raw = String(Number(parts[1]));
    const num = raw.padStart(2, "0");
    const name = RWS_MAJOR[raw] || "Fool";
    file = `RWS1909 - ${num} ${name}.jpeg`;
  } else {
    const parts = cardId.split("_");
    const suit = RWS_SUIT[parts[1]] || "Cups";
    const rank = RWS_RANK[parts[2]] || "01";
    file = `RWS1909 - ${suit} ${rank}.jpeg`;
  }
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;
}

type Copy = {
  brand:string; brandSub:string; home:string; menu:string; fixed:string; freeNow:string; laterPaid:string;
  landingTitle:string; landingSub:string; landingLead:string; selectFromSpread:string; tip:string; selected:string; reveal:string; reshuffle:string; reset:string; copy:string; copied:string; deselectHint:string; askTitle:string; askPlaceholder:string; askHelp:string; questionAnswerTitle:string; send:string; sentQuestion:string; questionApplied:string; perCardTitle:string; integratedTitle:string; resultOpenTitle:string; situation:string; cardAdvice:string; questionPending:string;
  todayMessage:string; readingTitle:string; readingWaiting:string; aiExplainTitle:string; aiExplainText:string; cardBackNote:string; legal:string; search:string; sponsorEmail:string;
  name:string; birth:string; gender:string; job:string; genderOptions: Record<Gender,string>; start:string; homeStart:string; deckStart:string; howTitle:string; how:string[];
  requiredCards:(n:number)=>string; selectedOf:(a:number,b:number)=>string; monthsLead:string; monthsFormTitle:string;
  tabs: Record<Mode, [string,string,string]>;
  roles: string[];
  monthRoles: string[];
  sections: { summary:string; flow:string; emotion:string; advice:string; caution:string; answer:string; cards:string; six:string; twelve:string; months:string; work:string; money:string; health:string; relationship:string; action:string };
  intros: Record<Mode, string>;
};

const KO: Copy = {
  brand:"FateCard.today", brandSub:"AI TAROT", home:"홈", menu:"메뉴", fixed:"고정", freeNow:"초기 무료", laterPaid:"추후 유료화 예정",
  landingTitle:"FateCard.today", landingSub:"AI가 함께 해석하는 나만의 타로",
  landingLead:"리딩 종류마다 필요한 카드 수를 정해두었습니다. 펼쳐진 전체 덱에서 직접 카드를 고르고, 선택이 끝난 뒤에만 풀이가 열립니다.",
  selectFromSpread:"펼쳐진 전체 카드에서 직접 선택하세요", tip:"직감이 이끄는 카드를 고르세요. 정답은 카드보다 선택하는 순간의 마음에 더 가깝습니다.",
  selected:"선택됨", reveal:"풀이 보기", reshuffle:"다시 섞기", reset:"선택 초기화", copy:"풀이 복사", copied:"복사됨", deselectHint:"선택한 카드는 다시 누르면 내려놓을 수 있습니다.", askTitle:"AI에게 묻고 싶은 것", askPlaceholder:"예: 이 사람이 나를 어떻게 생각할까? 올해 일과 돈 흐름은 어떨까? 지금 연락해도 될까?", askHelp:"질문을 적은 뒤 전송하면 선택한 카드와 질문을 함께 엮어 더 맞춤형으로 풀이합니다.", questionAnswerTitle:"질문에 대한 AI 타로 답변", send:"전송", sentQuestion:"보낸 질문", questionApplied:"이 질문을 리딩에 반영합니다.", perCardTitle:"카드별 상황 해석", integratedTitle:"종합 리딩", resultOpenTitle:"선택한 카드 전체 풀이", situation:"상황", cardAdvice:"카드 조언", questionPending:"카드를 모두 공개하면 이 질문도 함께 반영됩니다.",
  todayMessage:"오늘의 메시지", readingTitle:"당신의 리딩", readingWaiting:"필요한 카드를 모두 선택하면 여기에 풀이가 나타납니다.",
  aiExplainTitle:"AI 타로 해석이란?", aiExplainText:"AI가 카드의 의미, 선택 순서, 리딩 종류, 입력 정보를 종합하여 상징 흐름을 해석합니다. 단순 키워드가 아니라 현재 질문에 맞춰 흐름·감정·주의점·행동 방향을 정리합니다.",
  cardBackNote:"카드 뒷면은 새로 만든 오리지널 디자인입니다. 카드 앞면은 1909년 퍼블릭 도메인 계열 이미지를 기준으로 표시합니다.",
  legal:"재미와 자기성찰용입니다. 의학·법률·금융 조언이 아닙니다.",
  search:"카드 검색", sponsorEmail:"tbvjrkrh@gmail.com", name:"이름", birth:"생년월일", gender:"성별", job:"직업/상황", start:"시작하기", homeStart:"오늘의 카드 시작", deckStart:"78장 보기",
  genderOptions:{unset:"선택 안 함",female:"여성",male:"남성",nonbinary:"논바이너리/기타",private:"밝히지 않음"},
  requiredCards:(n:number)=>`${n}장 고정`, selectedOf:(a:number,b:number)=>`${a}/${b} 선택됨`,
  monthsLead:"6개월과 12개월 흐름을 한 번에 보는 통합 리딩입니다. 총 18장을 뽑아 가까운 반년의 변화와 1년의 큰 방향을 분리해서 해석합니다.",
  monthsFormTitle:"더 자세한 풀이를 위한 입력",
  howTitle:"이렇게 진행됩니다", how:["메뉴마다 정해진 카드 수가 있습니다.","펼쳐진 전체 덱에서 직접 카드를 선택합니다.","필요한 카드를 모두 고른 뒤 풀이가 열립니다."],
  tabs:{
    home:["홈","처음 화면","⌂"], daily:["오늘의 카드","1장 · 오늘의 흐름과 조언","☉"], love:["연애 타로","5장 · 관계와 감정선","♡"],
    three:["3카드 리딩","3장 · 과거 현재 미래","▧"], yesno:["예/아니오","1장 · 명확한 상징 답변","?"], birth:["탄생 카드","3장 · 생년월일 원형","♧"],
    months:["6·12개월 운세","18장 · 통합 장기 리딩","✦"], deck:["78장 가이드","모든 카드 살펴보기","☷"], sponsor:["후원 / 광고 문의","제휴와 광고 문의","✉"]
  },
  roles:["핵심 카드","현재 흐름","숨은 영향","감정/내면","조언","미래 가능성","최종 흐름","보완 카드","주의 카드","실천 카드","관계 카드","일/학업 카드","금전 카드","건강/컨디션 카드","전환점","기회","리스크","마무리"],
  monthRoles:["1개월차","2개월차","3개월차","4개월차","5개월차","6개월차","7개월차","8개월차","9개월차","10개월차","11개월차","12개월차","관계 흐름","일/직업 흐름","금전 흐름","건강/컨디션","가장 큰 기회","가장 큰 주의점"],
  sections:{summary:"종합 해석",flow:"흐름",emotion:"감정선",advice:"조언",caution:"주의",answer:"답변",cards:"선택 카드",six:"앞으로 6개월",twelve:"앞으로 12개월",months:"월별 핵심",work:"일/직업",money:"금전",health:"건강/컨디션",relationship:"관계",action:"실천 방향"},
  intros:{
    home:"처음 화면", daily:"오늘 하루의 핵심 상징을 한 장으로 확인합니다.", love:"관계의 속도, 감정선, 숨은 신호를 5장 흐름으로 읽습니다.",
    three:"과거·현재·미래의 흐름을 3장으로 간결하게 펼칩니다.", yesno:"질문에 대해 지금 에너지가 어느 방향으로 기울어 있는지 1장으로 봅니다.",
    birth:"생년월일의 상징 원형과 지금 필요한 태도를 3장으로 봅니다.", months:"6개월과 12개월을 통합해 총 18장으로 길게 읽는 장기 리딩입니다.",
    deck:"78장 전체 카드를 확인하고 카드별 기본 의미를 살펴봅니다.", sponsor:"광고, 제휴, 후원, 현지화 문의를 받습니다."
  }
};

const EN: Copy = {
  ...KO, home:"Home", menu:"Menu", fixed:"fixed", freeNow:"Free now", laterPaid:"Paid later",
  landingSub:"AI-assisted tarot for your own reading", landingLead:"Each reading has its own fixed card count. Pick directly from the full spread; the interpretation opens only after every required card is chosen.",
  selectFromSpread:"Choose directly from the full spread", tip:"Pick the card your instinct pulls toward. The answer begins with attention.", selected:"selected", reveal:"Show reading", reshuffle:"Shuffle again", reset:"Reset", copy:"Copy reading", copied:"Copied", deselectHint:"Tap a selected card again to put it back.", askTitle:"Ask AI tarot", askPlaceholder:"Example: How does this person feel about me? What should I do next? How will work and money flow this year?", askHelp:"Write your question and send it; the reading will connect your cards to that exact concern.", questionAnswerTitle:"AI tarot answer to your question", send:"Send", sentQuestion:"Sent question", questionApplied:"This question is applied to the reading.", perCardTitle:"Card-by-card interpretation", integratedTitle:"Integrated reading", resultOpenTitle:"Full result for selected cards", situation:"Situation", cardAdvice:"Card advice", questionPending:"Your question will be applied once the cards are revealed.",
  todayMessage:"Today’s message", readingTitle:"Your reading", readingWaiting:"The interpretation appears here after all required cards are selected.",
  aiExplainTitle:"What is AI tarot interpretation?", aiExplainText:"AI combines card meanings, order, reading type, and personal context into a symbolic reading with flow, emotion, caution, and action guidance.",
  cardBackNote:"Card backs are original artwork. Card fronts use public-domain 1909 style tarot images.", legal:"Entertainment and self-reflection only. Not medical, legal, or financial advice.",
  search:"Search card", name:"Name", birth:"Birth date", gender:"Gender", job:"Job / situation", start:"Start", homeStart:"Start today’s card", deckStart:"Browse 78 cards",
  genderOptions:{unset:"Not selected",female:"Female",male:"Male",nonbinary:"Non-binary / other",private:"Prefer not to say"},
  requiredCards:(n:number)=>`${n} cards fixed`, selectedOf:(a:number,b:number)=>`${a}/${b} selected`,
  monthsLead:"A combined 6-month and 12-month reading. Draw 18 cards to separate the near half-year changes from the larger year-long direction.",
  monthsFormTitle:"Details for a deeper reading",
  howTitle:"How it works", how:["Each menu has a fixed card count.","Pick cards directly from the full deck spread.","The reading opens after every required card is selected."],
  tabs:{
    home:["Home","Start screen","⌂"], daily:["Today’s Card","1 card · daily flow","☉"], love:["Love Tarot","5 cards · relationship signal","♡"],
    three:["3-Card Reading","3 cards · past present future","▧"], yesno:["Yes / No","1 card · symbolic answer","?"], birth:["Birth Card","3 cards · archetype","♧"],
    months:["6·12 Month Reading","18 cards · long-term reading","✦"], deck:["78-Card Guide","Browse every card","☷"], sponsor:["Sponsor / Ads","Partnership inquiry","✉"]
  },
  roles:["Core card","Current flow","Hidden influence","Emotion / inner state","Advice","Future possibility","Final flow","Support card","Caution card","Action card","Relationship card","Work card","Money card","Health card","Turning point","Opportunity","Risk","Closing card"],
  monthRoles:["Month 1","Month 2","Month 3","Month 4","Month 5","Month 6","Month 7","Month 8","Month 9","Month 10","Month 11","Month 12","Relationships","Work/Career","Money","Health/Energy","Biggest opportunity","Biggest caution"],
  sections:{summary:"Full reading",flow:"Flow",emotion:"Emotional signal",advice:"Guidance",caution:"Caution",answer:"Answer",cards:"Selected cards",six:"Next 6 months",twelve:"Next 12 months",months:"Monthly key points",work:"Work/Career",money:"Money",health:"Health/Energy",relationship:"Relationship",action:"Action plan"},
  intros:{home:"Start screen",daily:"Read today’s key symbol with one card.",love:"Read relationship pace, emotion, and hidden signals through five cards.",three:"Open the past-present-future flow with three cards.",yesno:"See which direction the current energy leans with one card.",birth:"Read your birth archetype and current lesson with three cards.",months:"A detailed long-term reading using 18 cards for 6 and 12 months.",deck:"Explore the full 78-card deck and basic meanings.",sponsor:"Partnership, ads, sponsorship, and localization inquiries."}
};
const UI: Record<Lang, Copy> = {
  ko: KO, en: EN,
  ja:{...EN,home:"ホーム",menu:"メニュー",tabs:{...EN.tabs,home:["ホーム","開始画面","⌂"],daily:["今日のカード","1枚 · 今日の流れ","☉"],love:["恋愛タロット","5枚 · 関係と感情","♡"],months:["6·12か月運勢","18枚 · 長期リーディング","✦"],deck:["78枚ガイド","全カードを見る","☷"]}},
  zh:{...EN,home:"首页",menu:"菜单",tabs:{...EN.tabs,home:["首页","开始画面","⌂"],daily:["今日牌","1张 · 今日趋势","☉"],love:["爱情塔罗","5张 · 关系情绪","♡"],months:["6·12个月运势","18张 · 长期解读","✦"],deck:["78张指南","查看全部卡牌","☷"]}},
  es:{...EN,home:"Inicio",menu:"Menú",tabs:{...EN.tabs,home:["Inicio","Pantalla inicial","⌂"],daily:["Carta diaria","1 carta · flujo diario","☉"],love:["Tarot amor","5 cartas · relación","♡"],months:["6·12 meses","18 cartas · largo plazo","✦"],deck:["Guía 78 cartas","Ver todas","☷"]}},
  fr:{...EN,home:"Accueil",menu:"Menu",tabs:{...EN.tabs,home:["Accueil","Écran initial","⌂"],daily:["Carte du jour","1 carte · flux du jour","☉"],love:["Tarot amour","5 cartes · relation","♡"],months:["6·12 mois","18 cartes · long terme","✦"],deck:["Guide 78 cartes","Voir tout","☷"]}},
  de:{...EN,home:"Start",menu:"Menü",tabs:{...EN.tabs,home:["Start","Startbildschirm","⌂"],daily:["Tageskarte","1 Karte · Tagesfluss","☉"],love:["Liebestarot","5 Karten · Beziehung","♡"],months:["6·12 Monate","18 Karten · Langzeit","✦"],deck:["78-Karten-Guide","Alle Karten","☷"]}},
  pt:{...EN,home:"Início",menu:"Menu",tabs:{...EN.tabs,home:["Início","Tela inicial","⌂"],daily:["Carta do dia","1 carta · fluxo","☉"],love:["Tarô amor","5 cartas · relação","♡"],months:["6·12 meses","18 cartas · longo prazo","✦"],deck:["Guia 78 cartas","Ver tudo","☷"]}}
};

function hashString(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619);}return Math.abs(h>>>0);}
function todayKey(lang:Lang){const tz=LANGS[lang].timeZone;const d=tz==="device"?new Date():new Date(new Date().toLocaleString("en-US",{timeZone:tz}));return d.toISOString().slice(0,10);}
function seededDeck(seed:string){return TAROT_DECK.map((card,i)=>({card,sort:hashString(seed+card.id+i)})).sort((a,b)=>a.sort-b.sort).map(x=>x.card);}
function makeCard(base:TarotCardBase,lang:Lang,seed:string):DrawCard{const rev=hashString(seed+":r")%100<28;const t=getTarotText(base,lang,rev);return{id:base.id,base,title:t.title,orientation:rev?"reversed":"upright",subtitle:t.subtitle,aura:t.aura,mission:t.mission,warning:t.warning,archetype:t.archetype,artPath:rwsImageUrl(base.id)};}

export default function App(){
  const [lang,setLang]=useState<Lang>((localStorage.getItem("fate-lang") as Lang)||"ko");
  const [mode,setMode]=useState<Mode>("home");
  const [drawer,setDrawer]=useState(()=> typeof window==="undefined" ? true : window.innerWidth>860);
  const [shuffleSeed,setShuffleSeed]=useState(()=>"seed-"+Date.now());
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [revealed,setRevealed]=useState(false);
  const [name,setName]=useState(localStorage.getItem("fate-name")||"");
  const [birth,setBirth]=useState(localStorage.getItem("fate-birth")||"2000-12-27");
  const [gender,setGender]=useState<Gender>((localStorage.getItem("fate-gender") as Gender)||"unset");
  const [job,setJob]=useState(localStorage.getItem("fate-job")||"");
  const [questionDraft,setQuestionDraft]=useState(localStorage.getItem("fate-question-draft")||"");
  const [submittedQuestion,setSubmittedQuestion]=useState(localStorage.getItem("fate-question")||"");
  const [copied,setCopied]=useState(false);

  const c=UI[lang]||KO;
  const need=READING_COUNTS[mode] || 0;
  const deck=useMemo(()=>seededDeck(`${mode}-${todayKey(lang)}-${shuffleSeed}-${name}-${birth}-${gender}-${job}`),[mode,lang,shuffleSeed,name,birth,gender,job]);
  const selectedCards=selectedIds.map((id,i)=>makeCard(TAROT_DECK.find(x=>x.id===id)||TAROT_DECK[0],lang,`${shuffleSeed}-${id}-${i}`));
  const complete=need>0 && selectedIds.length>=need;
  const personal={name,birth,gender,job};
  const blocks=makeReading(mode,selectedCards,c,personal,lang,submittedQuestion);

  useEffect(()=>{localStorage.setItem("fate-lang",lang);localStorage.setItem("fate-name",name);localStorage.setItem("fate-birth",birth);localStorage.setItem("fate-gender",gender);localStorage.setItem("fate-job",job);localStorage.setItem("fate-question-draft",questionDraft);localStorage.setItem("fate-question",submittedQuestion);},[lang,name,birth,gender,job,questionDraft,submittedQuestion]);
  useEffect(()=>{setSelectedIds([]);setRevealed(false);setCopied(false);},[mode,lang]);
  const go=(m:Mode)=>{setMode(m);setSelectedIds([]);setRevealed(false);setCopied(false);if(typeof window!=="undefined" && window.innerWidth<=860){setDrawer(false);}window.scrollTo({top:0,behavior:"smooth"});};
  const reshuffle=()=>{setShuffleSeed("seed-"+Date.now());setSelectedIds([]);setRevealed(false);setCopied(false);};
  const choose=(id:string)=>{if(revealed)return;if(selectedIds.includes(id)){setSelectedIds(selectedIds.filter(x=>x!==id));setCopied(false);return;}if(selectedIds.length>=need)return;setSelectedIds([...selectedIds,id]);setCopied(false);};
  const showReading=()=>{if(complete)setRevealed(true);};
  const sendQuestion=()=>{const q=questionDraft.trim();if(!q)return;setSubmittedQuestion(q);setCopied(false);};
  const copyReading=async()=>{await navigator.clipboard?.writeText(blocks.map(x=>`${x.title}\n${x.body}`).join("\n\n"));setCopied(true);};

  return <div className={`app ${drawer?"drawerOpen":"drawerClosed"}`}>
    <aside className="sidebar">
      <div className="sideBrand">
        <button className="menuBtn" onClick={()=>setDrawer(!drawer)} aria-label={c.menu}>☰</button>
        <button className="brandSeal" onClick={()=>go("home")} title={c.home}>△</button>
        <button className="brandName" onClick={()=>go("home")}><b>{c.brand}</b><small>{c.brandSub}</small></button>
      </div>
      <nav className="navList">{(["home","daily","love","three","yesno","birth","months","deck"] as Mode[]).map(m=>
        <button key={m} className={mode===m?"active":""} onClick={()=>go(m)} title={c.tabs[m][0]}>
          <ModeIcon mode={m} active={mode===m}/><b>{c.tabs[m][0]}</b><small>{c.tabs[m][1]}</small>
        </button>
      )}</nav>
      <div className="membership"><ModeIcon mode="months" /><b>{c.tabs.months[0]}</b><p>{c.freeNow} · {c.laterPaid}</p></div>
      <button className="sponsor" onClick={()=>go("sponsor")}><ModeIcon mode="sponsor" /> {c.tabs.sponsor[0]}</button>
    </aside>

    <main className="main">
      <header className="topBar">
        <button className="mobileMenuBtn" onClick={()=>setDrawer(!drawer)} aria-label={c.menu}>☰</button>
        <button className="homeIcon" onClick={()=>go("home")} title={c.home}><ModeIcon mode="home" /></button>
        <button className="topBrand" onClick={()=>go("home")}>{c.brand}</button>
        <div className="topSpacer"/>
        <button className="messageBtn">✦ {c.todayMessage}</button>
        <label className="language">◎ <select value={lang} onChange={e=>setLang(e.target.value as Lang)}>{Object.entries(LANGS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></label>
      </header>

      {mode==="home" && <Home c={c} go={go}/>}
      {mode==="deck" && <Deck c={c} lang={lang}/>}
      {mode==="sponsor" && <Sponsor c={c}/>}
      {mode!=="home" && mode!=="deck" && mode!=="sponsor" &&
        <Reading c={c} mode={mode} lang={lang} deck={deck} need={need} selectedIds={selectedIds} selectedCards={selectedCards} complete={complete} revealed={revealed} choose={choose} reshuffle={reshuffle} showReading={showReading} blocks={blocks} copyReading={copyReading} copied={copied} personal={personal} setName={setName} setBirth={setBirth} setGender={setGender} setJob={setJob} question={questionDraft} setQuestion={setQuestionDraft} submittedQuestion={submittedQuestion} sendQuestion={sendQuestion}/>
      }
      <footer>{c.legal}</footer>
    </main>
  </div>
}

function Home({c,go}:{c:Copy;go:(m:Mode)=>void}){
  const featureModes: Mode[]=["daily","love","three","yesno","birth","months"];
  return <section className="homePage">
    <div className="homeHero">
      <div className="moonMark">☾</div>
      <h1>{c.landingTitle}</h1>
      <p className="sub">{c.landingSub}</p>
      <div className="divider">◇ ✦ ◇</div>
      <p className="lead">{c.landingLead}</p>
      <div className="featureGrid">
        {featureModes.map(m=><button key={m} onClick={()=>go(m)} className={m==="months"?"premiumFeature":""}>
          <ModeIcon mode={m} />
          <b>{c.tabs[m][0]}</b>
          <small>{c.tabs[m][1]}</small>
          <em>{c.requiredCards(READING_COUNTS[m])}{m==="months" ? ` · ${c.freeNow}` : ""}</em>
        </button>)}
      </div>
      <div className="homeActions">
        <button onClick={()=>go("daily")}>{c.homeStart}</button>
        <button onClick={()=>go("months")}>{c.tabs.months[0]}</button>
        <button onClick={()=>go("deck")}>{c.deckStart}</button>
      </div>
    </div>
    <div className="spreadPreview" aria-hidden="true">{Array.from({length:42}).map((_,i)=><img key={i} src="/cards/back.svg" style={{"--i":i} as React.CSSProperties}/>)}</div>
    <div className="howPanel"><h2>{c.howTitle}</h2>{c.how.map(x=><p key={x}>✦ {x}</p>)}</div>
  </section>
}


type ModeIconProps={mode:Mode; active?:boolean;};
function ModeIcon({mode,active}:ModeIconProps){
  const cls=`modeIcon ${active?"active":""}`;
  switch(mode){
    case "home": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 11.5 12 5l8 6.5"/><path d="M7 10.5V19h10v-8.5"/></svg></span>;
    case "daily": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.4"/><path d="M12 2.7v2.4M12 18.9v2.4M2.7 12h2.4M18.9 12h2.4M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/></svg></span>;
    case "love": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20.2 5.3 13.8a4.5 4.5 0 0 1 6.4-6.3L12 8l.3-.5a4.5 4.5 0 0 1 6.4 6.3Z"/></svg></span>;
    case "three": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="5" height="10" rx="1.2"/><rect x="9.5" y="5" width="5" height="14" rx="1.2"/><rect x="16" y="7" width="5" height="10" rx="1.2"/></svg></span>;
    case "yesno": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4.5a7.5 7.5 0 0 0-7.5 7.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5c0-1.3-.3-2.4-.8-3.5"/><path d="M12 16.4v-1.3c0-1.9 2.2-2.2 2.2-4.3A2.3 2.3 0 0 0 9.8 10"/><circle cx="12" cy="18.5" r=".9"/></svg></span>;
    case "birth": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3.5 14.1 8l4.9.7-3.5 3.5.8 5-4.3-2.3-4.3 2.3.8-5L5 8.7l4.9-.7Z"/></svg></span>;
    case "months": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8.5 6.5A6 6 0 1 0 15 17a6.8 6.8 0 1 1-6.5-10.5Z"/><path d="m17.8 5.1.7 1.5 1.6.2-1.1 1.1.2 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.7-.2Z"/></svg></span>;
    case "deck": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 7h12M6 12h12M6 17h12"/><circle cx="4" cy="7" r=".9"/><circle cx="4" cy="12" r=".9"/><circle cx="4" cy="17" r=".9"/></svg></span>;
    case "sponsor": return <span className={cls} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16v10H4z"/><path d="m4.5 8 7.5 6 7.5-6"/></svg></span>;
    default: return <span className={cls} aria-hidden="true">✦</span>;
  }
}

function cardDetailText(card:DrawCard,index:number,role:string,mode:Mode,c:Copy,lang:Lang){
  if(lang==="ko"){
    const pos = `${index+1}번째 카드 · ${role}`;
    const direction = card.orientation==="reversed" ? "역방향으로 나왔기 때문에 이 카드의 에너지는 바로 드러나기보다 지연, 망설임, 오해, 또는 과잉 반응으로 나타날 수 있습니다." : "정방향으로 나왔기 때문에 이 카드의 에너지는 비교적 곧게 드러나며, 지금 상황의 핵심 흐름을 직접적으로 보여줍니다.";
    return {
      situation:`${pos} 위치의 ${card.title}는 ${card.aura} ${direction} 이 카드는 단순히 좋고 나쁨을 말하기보다, 지금 이 위치에서 무엇이 움직이고 무엇이 막혀 있는지를 보여줍니다.`,
      advice:`${card.mission} 동시에 ${card.warning} 이 카드를 뽑은 순서는 중요합니다. 앞 카드의 분위기를 받아 다음 카드로 넘기는 연결점이기 때문에, 이 카드는 전체 리딩 안에서 “지금 당장 조정해야 할 태도”를 담당합니다.`
    };
  }
  return {
    situation:`Card ${index+1}, ${role}: ${card.title}. ${card.aura} ${card.orientation==="reversed" ? "Because it is reversed, the energy may appear as delay, hesitation, misunderstanding, or excess." : "Because it is upright, the energy is direct and visible in the current situation."}`,
    advice:`${card.mission} Also watch this caution: ${card.warning}`
  };
}

function QuestionChat({c,question,setQuestion,submittedQuestion,sendQuestion,revealed}:{c:Copy;question:string;setQuestion:(s:string)=>void;submittedQuestion:string;sendQuestion:()=>void;revealed:boolean;}){
  return <section className="askBox bottomAsk">
    <div>
      <h3>✦ {c.askTitle}</h3>
      <p>{c.askHelp}</p>
    </div>
    <div className="chatComposer">
      <textarea
        value={question}
        onChange={e=>setQuestion(e.target.value)}
        onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendQuestion();}}}
        placeholder={c.askPlaceholder}
      />
      <button onClick={sendQuestion} disabled={!question.trim()}>{c.send}</button>
    </div>
    {submittedQuestion && <div className="sentQuestion">
      <b>{c.sentQuestion}</b>
      <p>{submittedQuestion}</p>
      <small>{revealed ? c.questionApplied : c.questionPending}</small>
    </div>}
  </section>
}

function Reading({c,mode,lang,deck,need,selectedIds,selectedCards,complete,revealed,choose,reshuffle,showReading,blocks,copyReading,copied,personal,setName,setBirth,setGender,setJob,question,setQuestion,submittedQuestion,sendQuestion}:{c:Copy;mode:Mode;lang:Lang;deck:TarotCardBase[];need:number;selectedIds:string[];selectedCards:DrawCard[];complete:boolean;revealed:boolean;choose:(id:string)=>void;reshuffle:()=>void;showReading:()=>void;blocks:ReadingBlock[];copyReading:()=>void;copied:boolean;personal:Personal;setName:(s:string)=>void;setBirth:(s:string)=>void;setGender:(g:Gender)=>void;setJob:(s:string)=>void;question:string;setQuestion:(s:string)=>void;submittedQuestion:string;sendQuestion:()=>void;}){
  const roles=mode==="months" ? c.monthRoles : c.roles;
  return <section className="reader">
    <div className="readerHero">
      <p className="eyebrow">FATECARD · {c.tabs[mode][0]}</p>
      <h1>{c.tabs[mode][0]}</h1>
      <p>{mode==="months" ? c.monthsLead : c.intros[mode]}</p>
      <div className="fixedBadge"><span>{c.requiredCards(need)}</span>{mode==="months" && <strong>{c.freeNow} · {c.laterPaid}</strong>}</div>
      {(mode==="months" || mode==="birth") && <div className="profileBox">
        <h3>{mode==="months" ? c.monthsFormTitle : c.tabs.birth[0]}</h3>
        <input value={personal.name} onChange={e=>setName(e.target.value)} placeholder={c.name}/>
        <input type="date" value={personal.birth} onChange={e=>setBirth(e.target.value)}/>
        {mode==="months" && <>
          <select value={personal.gender} onChange={e=>setGender(e.target.value as Gender)}><option value="unset">{c.genderOptions.unset}</option><option value="female">{c.genderOptions.female}</option><option value="male">{c.genderOptions.male}</option><option value="nonbinary">{c.genderOptions.nonbinary}</option><option value="private">{c.genderOptions.private}</option></select>
          <input value={personal.job} onChange={e=>setJob(e.target.value)} placeholder={c.job}/>
        </>}
      </div>}
    </div>

    <div className={`readerGrid ${revealed ? "revealedGrid" : ""}`}>
      <section className={`deckTable ${revealed ? "resultMode" : ""}`}>
        <div className="tableHead"><h2>{revealed ? c.resultOpenTitle : c.selectFromSpread}</h2><span>{c.selectedOf(selectedIds.length,need)}</span></div>
        {!revealed && <>
          <div className={`fullSpread ${mode==="months" ? "largeSpread" : ""}`}>
            {deck.map((card,i)=>{
              const order=selectedIds.indexOf(card.id)+1;
              return <button key={card.id} onClick={()=>choose(card.id)} className={`spreadCard ${order>0?"picked":""}`} disabled={revealed || (selectedIds.length>=need && order===0)} style={{"--i":i} as React.CSSProperties}>
                <img src="/cards/back.svg" alt="tarot card"/>
                {order>0 && <em>{order}</em>}
              </button>
            })}
          </div>
          <div className="actions"><button onClick={reshuffle}>↻ {c.reshuffle}</button><button className="primary" disabled={!complete} onClick={showReading}>✦ {c.reveal}</button><button disabled={!selectedIds.length} onClick={reshuffle}>⟲ {c.reset}</button></div>
          <p className="tip">✦ TIP&nbsp; {c.tip}<br/><span>{c.deselectHint}</span></p>
        </>}

        {revealed && <div className="resultCanvas">
          <div className="resultHero">
            <div>
              <p className="eyebrow">{c.sections.cards}</p>
              <h2>{c.tabs[mode][0]}</h2>
              <p>{submittedQuestion ? `${c.sentQuestion}: ${submittedQuestion}` : c.intros[mode]}</p>
            </div>
            <div className="resultActions">
              <button onClick={copyReading}>{copied?c.copied:c.copy}</button>
              <button onClick={reshuffle}>↻ {c.reshuffle}</button>
            </div>
          </div>

          <div className={`resultCardStrip ${mode==="months" ? "many" : ""}`}>
            {selectedCards.map((card,i)=><div key={card.id+i}>
              <img src={card.artPath}/>
              <small>{roles[i] || `${i+1}`}</small>
              <b>{card.title}</b>
            </div>)}
          </div>

          <section className="perCardSection">
            <h3>✦ {c.perCardTitle}</h3>
            <div className="cardDetailGrid">
              {selectedCards.map((card,i)=>{
                const detail=cardDetailText(card,i,roles[i] || `${i+1}`,mode,c,lang);
                return <article className="cardDetail" key={card.id+i}>
                  <img src={card.artPath}/>
                  <div>
                    <small>{roles[i] || `${i+1}`}</small>
                    <h4>{i+1}. {card.title}</h4>
                    <p><b>{c.situation}</b> — {detail.situation}</p>
                    <p><b>{c.cardAdvice}</b> — {detail.advice}</p>
                  </div>
                </article>
              })}
            </div>
          </section>

          <section className="integratedBlocks">
            <h3>✦ {c.integratedTitle}</h3>
            {blocks.map(b=><article key={b.title}><h4>{b.icon} {b.title}</h4><p>{b.body}</p></article>)}
          </section>
        </div>}
      </section>

      {!revealed && <aside className="readingPanel">
        <h3>{c.readingTitle}</h3>
        <div className="waiting"><div className="crescent">☾</div><p>{c.readingWaiting}</p><div className="placeholders">{Array.from({length:Math.min(need,18)}).map((_,i)=><span key={i}/>)}</div><article><h4>{c.aiExplainTitle}</h4><p>{c.aiExplainText}</p></article></div>
      </aside>}
    </div>

    <QuestionChat c={c} question={question} setQuestion={setQuestion} submittedQuestion={submittedQuestion} sendQuestion={sendQuestion} revealed={revealed}/>
  </section>
}


function injectQuestionBlock(base:ReadingBlock[], question:string, block:ReadingBlock | null):ReadingBlock[]{
  if(!question.trim() || !block)return base;
  if(base.length<=1)return [...base, block];
  return [base[0], block, ...base.slice(1)];
}

function makeQuestionBlock(mode:Mode,cards:DrawCard[],c:Copy,personal:Personal,lang:Lang,question:string):ReadingBlock | null{
  const q=question.trim();
  if(!q)return null;
  const ko=lang==="ko";
  const names=cards.map(x=>x.title).join(" · ");
  const first=cards[0];
  const last=cards[cards.length-1] || first;
  const who=personal.name ? `${personal.name}님` : "당신";
  if(ko){
    const modeTone=mode==="love" ? "관계와 감정의 흐름" : mode==="yesno" ? "선택의 방향성" : mode==="months" ? "장기 흐름과 현실 계획" : mode==="birth" ? "타고난 성향과 현재 선택" : "오늘의 흐름";
    return {
      icon:"✦",
      title:c.questionAnswerTitle,
      body:`질문 “${q}”에 대해 카드들은 ${modeTone}을 중심으로 답하고 있습니다. 핵심 카드는 ${first.title}이고, 전체 흐름은 ${names} 순서로 이어집니다. 첫 카드는 질문의 출발점이 이미 마음속에서 분명해지고 있음을 보여주며, 마지막 카드 ${last.title}는 지금 당장 결론을 재촉하기보다 선택 후의 책임과 현실적인 결과를 함께 보라고 말합니다. 지금 가장 중요한 것은 감정적으로 원하는 답을 끌어내는 것이 아니라, 카드가 반복해서 보여주는 패턴을 기준으로 행동을 정리하는 것입니다. 질문이 사람과 관계된 문제라면 상대의 말 한마디보다 반복되는 태도를 보세요. 질문이 일·돈·미래와 관련된 문제라면 큰 운보다 실행 가능한 기준, 비용, 시간표를 먼저 확인해야 합니다. 결론적으로 이 질문의 답은 “가능성은 있지만 조건을 정리해야 한다”에 가깝고, 오늘 바로 할 일은 ${first.mission}`
    };
  }
  return {
    icon:"✦",
    title:c.questionAnswerTitle,
    body:`For your question “${q}”, the cards answer through ${names}. The first card, ${first.title}, shows the core tension; the final card, ${last.title}, shows what must be handled after the choice. This does not promise a fixed outcome. It points to a practical direction: clarify the condition, watch repeated behavior, and choose the next action you can actually control. Immediate guidance: ${first.mission}`
  };
}

function makeReading(mode:Mode,cards:DrawCard[],c:Copy,personal:Personal,lang:Lang,question:string):ReadingBlock[]{
  if(!cards.length)return[];
  const ko=lang==="ko";
  const names=cards.map(x=>x.title).join(" · ");
  const first=cards[0];
  const qBlock=makeQuestionBlock(mode,cards,c,personal,lang,question);

  if(mode==="yesno"){
    const yes=first.orientation==="upright";
    const base = ko ? [
      {icon:"◇",title:c.sections.answer,body:`${yes?"YES 쪽으로 기울어 있습니다. 단, 이것은 무조건적인 허락이 아니라 지금 흐름이 열려 있다는 신호에 가깝습니다.":"NO 또는 보류 쪽으로 기울어 있습니다. 지금은 밀어붙이기보다 조건을 정리하고 타이밍을 다시 보는 편이 낫습니다."} ${first.aura}`},
      {icon:"✦",title:c.sections.advice,body:`${first.mission} 질문이 사람의 마음과 관련되어 있다면 상대의 속도와 경계를 존중하는 것이 핵심입니다.`},
      {icon:"⚠",title:c.sections.caution,body:`${first.warning} 카드가 주는 답을 확정 예언으로 받아들이기보다, 지금 선택에서 조심해야 할 방향으로 읽는 것이 안전합니다.`}
    ] : [
      {icon:"◇",title:c.sections.answer,body:`The answer leans ${yes ? "YES" : "NO / wait"}. This is not a fixed prediction; it describes the current symbolic direction. ${first.aura}`},
      {icon:"✦",title:c.sections.advice,body:`${first.mission} Respect timing and boundaries, especially if the question involves another person.`},
      {icon:"⚠",title:c.sections.caution,body:`${first.warning} Treat this as guidance, not certainty.`}
    ];
    return injectQuestionBlock(base,question,qBlock);
  }

  if(mode==="months"){
    const monthLine=(start:number,end:number)=>cards.slice(start,end).map((card,i)=>`${c.monthRoles[start+i]}: ${card.title} — ${card.aura}`).join(" / ");
    const who=personal.name ? `${personal.name}님` : "당신";
    const jobText=personal.job ? ` 현재 직업/상황으로 입력한 “${personal.job}”의 흐름까지 함께 보면,` : "";
    const base = ko ? [
      {icon:"✦",title:c.sections.summary,body:`${who}의 6·12개월 통합 리딩은 총 18장의 카드(${names})를 기준으로 읽습니다.${jobText} 가까운 6개월은 현재 습관과 선택이 현실로 드러나는 구간이고, 이후 12개월 흐름은 방향 전환과 장기적 결과가 천천히 굳어지는 구간으로 보입니다. 이 리딩에서 중요한 핵심은 “무엇을 기다릴 것인가”보다 “어떤 기준으로 선택을 반복할 것인가”입니다.`},
      {icon:"☽",title:c.sections.six,body:`앞으로 6개월은 ${monthLine(0,6)}. 이 구간은 빠른 대박보다 정리, 관계 조율, 생활 리듬 회복, 실질적인 준비가 중요합니다. 특히 초반 1~2개월은 마음이 앞서기 쉽고, 3~4개월차에는 현실적인 조건을 확인하게 되며, 5~6개월차에는 지금까지 미뤄둔 결정이 형태를 갖추기 시작합니다. 급하게 결론을 내리기보다 매달 하나의 기준을 세워 행동하는 편이 더 유리합니다.`},
      {icon:"◎",title:c.sections.twelve,body:`7개월차부터 12개월차는 ${monthLine(6,12)}. 후반 흐름은 단순 유지가 아니라 선택의 결과를 검증하는 시기입니다. 이때는 주변 사람의 말보다 실제로 반복해서 나타나는 신호를 봐야 합니다. 좋은 기회처럼 보여도 체력, 돈, 인간관계 비용을 같이 계산해야 하며, 반대로 작아 보이는 기회라도 장기적으로 반복 가능하면 잡을 가치가 있습니다.`},
      {icon:"♡",title:c.sections.relationship,body:`관계 흐름은 ${cards[12]?.title || first.title}가 잡고 있습니다. 가까운 사람과의 관계에서는 말보다 태도, 약속보다 반복성이 중요합니다. 감정이 흔들릴 때 바로 확인받으려 하면 오히려 흐름이 좁아질 수 있습니다. 상대가 있는 문제라면 속도 차이를 인정하고, 없는 문제라면 새로운 만남보다 스스로의 기준을 먼저 정리하는 편이 좋습니다.`},
      {icon:"♜",title:c.sections.work,body:`일과 직업 흐름은 ${cards[13]?.title || first.title}가 강조됩니다. 지금 해야 할 일은 선택지를 늘리는 것이 아니라 강점을 증명할 수 있는 결과물을 만드는 것입니다. 준비만 오래 하면 기회가 지나가고, 반대로 검증 없이 확장하면 부담이 커집니다. 앞으로 6개월 안에는 작게라도 외부에 보여줄 수 있는 결과를 만들고, 12개월 안에는 그것을 돈이나 평판으로 연결하는 구조를 만들어야 합니다.`},
      {icon:"◇",title:c.sections.money,body:`금전 흐름은 ${cards[14]?.title || first.title}의 영향을 받습니다. 큰 수익보다 새는 돈, 충동 지출, 계획 없는 투자, 반복 구독처럼 눈에 잘 보이지 않는 비용을 먼저 잡아야 합니다. 돈의 운은 운 좋게 들어오는 금액보다 지킬 수 있는 구조에서 강해집니다. 이 시기에는 한 번에 큰 결정을 하기보다 월별 지출 기준과 위험 한도를 정하는 것이 핵심입니다.`},
      {icon:"♧",title:c.sections.health,body:`건강과 컨디션은 ${cards[15]?.title || first.title}가 말합니다. 이 카드는 몸의 신호를 늦게 알아차리면 마음의 판단도 흐려질 수 있음을 보여줍니다. 수면, 식사, 운동, 회복 시간을 사소하게 보면 장기 리딩 전체가 약해집니다. 특히 스트레스가 쌓일 때 결정을 미루거나 반대로 충동적으로 밀어붙이는 패턴을 조심해야 합니다.`},
      {icon:"✹",title:c.sections.action,body:`가장 큰 기회는 ${cards[16]?.title || first.title}, 가장 큰 주의점은 ${cards[17]?.title || first.title}입니다. 결론적으로 앞으로 1년은 기다리는 운이 아니라 정리하고 선택하는 운에 가깝습니다. 지금 당장 할 일은 세 가지입니다. 첫째, 이번 달 안에 정리할 관계·일·돈 문제를 하나만 고르기. 둘째, 6개월 안에 보여줄 결과물을 정하기. 셋째, 12개월 후에도 유지하고 싶은 생활 패턴을 지금부터 작게 시작하기입니다.`}
    ] : [
      {icon:"✦",title:c.sections.summary,body:`This 18-card reading for ${personal.name || "you"} separates the near 6 months from the larger 12-month direction. The key is not waiting for luck, but repeating better choices with clearer standards.`},
      {icon:"☽",title:c.sections.six,body:`Next 6 months: ${monthLine(0,6)}. This phase favors preparation, rhythm, relationship adjustment, and practical decisions over dramatic luck.`},
      {icon:"◎",title:c.sections.twelve,body:`Next 12 months: ${monthLine(6,12)}. The second half tests what has been built. Watch repeated signals rather than one-time excitement.`},
      {icon:"♡",title:c.sections.relationship,body:`Relationship theme: ${cards[12]?.title || first.title}. Consistency matters more than intensity.`},
      {icon:"♜",title:c.sections.work,body:`Work theme: ${cards[13]?.title || first.title}. Build visible proof, not endless preparation.`},
      {icon:"◇",title:c.sections.money,body:`Money theme: ${cards[14]?.title || first.title}. Control recurring leakage before chasing big gains.`},
      {icon:"♧",title:c.sections.health,body:`Health theme: ${cards[15]?.title || first.title}. Energy management affects judgment.`},
      {icon:"✹",title:c.sections.action,body:`Opportunity: ${cards[16]?.title || first.title}. Caution: ${cards[17]?.title || first.title}. Choose one monthly action, one 6-month result, and one 12-month habit.`}
    ];
    return injectQuestionBlock(base,question,qBlock);
  }

  if(mode==="birth"){
    const base = ko ? [
      {icon:"✶",title:c.sections.summary,body:`생년월일 ${personal.birth}와 선택된 카드(${names})는 당신이 반복해서 끌리는 삶의 주제와 선택 패턴을 보여줍니다. 장점은 분명하지만, 익숙한 방식으로만 문제를 풀려고 할 때 흐름이 좁아질 수 있습니다.`},
      {icon:"☽",title:c.sections.flow,body:"이 리딩은 타고난 성향을 고정된 운명으로 단정하지 않습니다. 지금 어떤 태도를 선택할 때 더 자연스럽게 힘이 붙는지, 반대로 어디서 에너지가 새는지를 보여주는 상징 지도에 가깝습니다."},
      {icon:"✦",title:c.sections.advice,body:`가장 먼저 적용할 조언은 ${first.mission} 입니다. 거창한 변화보다 오늘의 작은 선택 하나가 원형을 현실로 끌어내는 출발점입니다.`}
    ] : [
      {icon:"✶",title:c.sections.summary,body:`Birth date ${personal.birth} and selected cards (${names}) show recurring themes and decision patterns.`},
      {icon:"☽",title:c.sections.flow,body:"This is a symbolic map, not a fixed destiny."},
      {icon:"✦",title:c.sections.advice,body:`First advice: ${first.mission}`}
    ];
    return injectQuestionBlock(base,question,qBlock);
  }

  const base = ko ? [
    {icon:"♡",title:mode==="love"?c.sections.flow:c.sections.summary,body:`선택된 카드(${names})는 지금 상황이 단순한 호불호보다 흐름과 타이밍의 문제에 가깝다는 것을 보여줍니다. 첫 카드는 현재의 기본 에너지, 다음 카드는 상대나 환경의 반응, 이후 카드는 앞으로 열릴 가능성을 말합니다. 관계 문제라면 “누가 더 좋아하느냐”보다 서로가 같은 속도로 움직이고 있는지가 더 중요합니다.`},
    {icon:"☽",title:c.sections.emotion,body:"감정선은 겉으로 보이는 말보다 천천히 움직입니다. 한쪽은 이미 마음속에서 정리를 시작했지만, 다른 쪽은 아직 현실적인 확신이나 명분을 기다릴 수 있습니다. 시험하듯 확인하려 하기보다 작고 분명한 표현으로 오해를 줄이는 쪽이 낫습니다."},
    {icon:"✦",title:c.sections.advice,body:`오늘의 조언은 ${first.mission} 카드가 좋다/나쁘다로 단정하기보다, 지금 내가 통제할 수 있는 행동 하나를 고르는 것이 핵심입니다. 연락, 대화, 결정, 거리두기 중 무엇을 선택하든 감정적인 반응보다 일관성이 더 중요합니다.`},
    {icon:"⚠",title:c.sections.caution,body:`주의할 점은 ${first.warning} 작은 신호를 과장해서 기대하거나, 침묵을 곧바로 거절로 해석하면 흐름을 왜곡할 수 있습니다.`}
  ] : [
    {icon:"✦",title:c.sections.summary,body:`Selected cards (${names}) show the current flow and timing rather than a simple good/bad result.`},
    {icon:"☽",title:c.sections.emotion,body:"The emotional line moves more slowly than surface words. Reduce misunderstanding through small but clear action."},
    {icon:"✦",title:c.sections.advice,body:`Advice: ${first.mission}`},
    {icon:"⚠",title:c.sections.caution,body:`Caution: ${first.warning}`}
  ];
  return injectQuestionBlock(base,question,qBlock);
}

function Deck({c,lang}:{c:Copy;lang:Lang}){
  const [q,setQ]=useState("");
  const list=TAROT_DECK.filter(card=>`${card.title.en} ${card.title.ko} ${card.id}`.toLowerCase().includes(q.toLowerCase()));
  return <section className="deckGuide"><h1>{c.tabs.deck[0]}</h1><p>{c.intros.deck}</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder={c.search}/><div className="deckGrid">{list.map(card=>{const t=getTarotText(card,lang,false);return <article key={card.id}><img src={rwsImageUrl(card.id)}/><b>{t.title}</b><p>{t.aura}</p></article>})}</div></section>
}
function Sponsor({c}:{c:Copy}){return <section className="sponsorPage"><h1>{c.tabs.sponsor[0]}</h1><p>{c.intros.sponsor}</p><a href={`mailto:${c.sponsorEmail}`}>{c.sponsorEmail}</a></section>}
