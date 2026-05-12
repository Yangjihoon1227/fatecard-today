
import React, { useEffect, useMemo, useState } from "react";
import { TAROT_DECK, getTarotText, type SupportedCardLang, type TarotCardBase } from "./tarotDeck";

type Lang = SupportedCardLang;
type Mode = "home" | "daily" | "love" | "three" | "yesno" | "birth" | "deck" | "sponsor";
type ReadingMode = Exclude<Mode, "home" | "deck" | "sponsor">;
type DrawCard = { id:string; base:TarotCardBase; title:string; orientation:"upright"|"reversed"; subtitle:string; aura:string; mission:string; warning:string; archetype:string; artPath:string; };
type CopyPack = any;

const LANGS: Record<Lang, { label: string; timeZone: string }> = {
  en:{label:"English",timeZone:"device"}, ko:{label:"한국어",timeZone:"Asia/Seoul"}, ja:{label:"日本語",timeZone:"Asia/Tokyo"}, zh:{label:"中文",timeZone:"Asia/Shanghai"}, es:{label:"Español",timeZone:"Europe/Madrid"}, fr:{label:"Français",timeZone:"Europe/Paris"}, de:{label:"Deutsch",timeZone:"Europe/Berlin"}, pt:{label:"Português",timeZone:"America/Sao_Paulo"}
};
const REQUIRED:Record<Mode,number>={home:0,daily:1,love:2,three:3,yesno:1,birth:1,deck:0,sponsor:0};
const SLOTS:Record<Mode,string[]>={home:[],daily:["today"],love:["self","other"],three:["past","present","future"],yesno:["answer"],birth:["birth"],deck:[],sponsor:[]};

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

const KO = {
 brand:"FateCard.today", brandSub:"AI TAROT", home:"홈", menu:"메뉴", lang:"언어",
 landingTitle:"AI 타로 오라클", landingKicker:"직접 고르는 오늘의 상징", landingLead:"카드를 직접 고르고, 모든 카드가 공개된 뒤 AI가 상징의 흐름을 엮어 현실적인 해석을 제공합니다. 다시 뽑기로 기분 좋은 답만 찾는 방식이 아니라, 지금 선택한 카드의 메시지를 차분히 읽는 경험입니다.",
 startDaily:"오늘의 카드 시작", startLove:"연애 타로 시작", explore:"78장 둘러보기", chooseReading:"무엇을 보고 싶나요?", chooseReadingDesc:"원하는 리딩을 선택하면 바로 카드 선택 화면으로 이동합니다.",
 howTitle:"진행 방식", how:["1. 카드를 섞고", "2. 직접 클릭/터치로 고르고", "3. 모두 공개된 뒤 풀이를 확인합니다"],
 artNote:"1909년 원본 Rider–Waite–Smith 계열의 퍼블릭 도메인 카드 이미지를 사용합니다. 현대 상업 복각본·새 채색본·상품 스캔 이미지는 쓰지 않습니다.",
 legal:"재미와 자기성찰용입니다. 의학·법률·금융 조언이 아닙니다.",
 hint:"카드를 클릭하거나 터치해 직접 뽑으세요.", selected:"선택됨", shuffle:"다시 섞기", read:"풀이 보기", reset:"선택 카드 초기화", copy:"풀이 복사", copied:"복사됨", ready:"필요한 카드를 모두 선택하면 풀이가 열립니다.",
 tapTip:"카드가 작게 잘리지 않도록 전체 비율로 표시됩니다. 모바일에서는 손가락으로 터치해 뽑을 수 있습니다.", name:"이름", birth:"생년월일",
 tabs:{home:["홈","처음 화면","⌂"],daily:["오늘의 카드","오늘의 흐름과 조언","☉"],love:["연애 타로","관계의 흐름과 감정선","♡"],three:["3카드 리딩","과거 · 현재 · 미래","▧"],yesno:["예 / 아니오","간단하고 명확한 상징 답변","◇"],birth:["탄생 카드","생년월일로 보는 원형","✶"],deck:["78장 가이드","모든 카드 살펴보기","☷"],sponsor:["후원 / 광고 문의","제휴와 광고 문의","✉"]},
 intros:{daily:"오늘 하루의 기운을 한 장으로 확인합니다. 카드를 직접 고르면 바로 오늘의 메시지가 열립니다.",love:"두 장을 뽑아 현재 나의 마음과 상대방의 신호를 읽습니다. 둘 다 공개된 뒤 관계 흐름을 해석합니다.",three:"과거·현재·미래 세 장을 순서대로 뽑아 지금 상황의 흐름을 봅니다.",yesno:"한 장의 카드로 질문의 방향을 봅니다. 단순한 예언이 아니라 지금 선택의 경향을 읽습니다.",birth:"생년월일로 상징 원형을 계산합니다. 입력한 날짜를 기준으로 탄생 카드가 열립니다.",deck:"78장 전체 카드를 확인하고 카드별 기본 의미를 살펴봅니다.",sponsor:"광고, 제휴, 후원, 현지화 문의를 받습니다."},
 roles:{today:"오늘의 카드",self:"현재 나의 마음",other:"상대방의 마음",past:"과거",present:"현재",future:"미래",answer:"답변 카드",birth:"탄생 원형"},
 sections:{summary:"종합 해석",flow:"흐름",emotion:"감정선",advice:"조언",caution:"주의",answer:"답변"},
 zodiac:"오늘의 별자리 운세", zodiacText:"가볍게 오늘의 별자리 흐름도 확인해보세요.", seeNow:"바로 보기", search:"카드 검색"
};
const EN = {
 ...KO, home:"Home", menu:"Menu", lang:"Language", landingTitle:"AI Tarot Oracle", landingKicker:"Choose your own symbol", landingLead:"Pick the cards yourself. Once every selected card is revealed, AI turns the symbolic flow into a grounded reading. This is not endless rerolling for a prettier answer; it is a calm reading of the cards you actually chose.", startDaily:"Start today’s card", startLove:"Start love tarot", explore:"Browse 78 cards", chooseReading:"What would you like to read?", chooseReadingDesc:"Choose a reading and go straight to the card draw screen.", howTitle:"How it works", how:["1. Shuffle", "2. Click or tap cards", "3. Read after all cards are revealed"], artNote:"Uses public-domain 1909 Rider–Waite–Smith card artwork. No modern commercial recolors, boxed sets, or proprietary deck images are used.", legal:"Entertainment and self-reflection only. Not medical, legal, or financial advice.", hint:"Click or tap a card to draw it.", selected:"selected", shuffle:"Shuffle again", read:"Show reading", reset:"Reset selected cards", copy:"Copy reading", copied:"Copied", ready:"Select every required card to unlock the reading.", tapTip:"Cards are shown in full ratio without cropping. Mobile users can draw by touch.", name:"Name", birth:"Birth date", tabs:{home:["Home","Start screen","⌂"],daily:["Today’s Card","Flow and advice for today","☉"],love:["Love Tarot","Relationship flow and emotion","♡"],three:["3-Card Reading","Past · Present · Future","▧"],yesno:["Yes / No","Clear symbolic answer","◇"],birth:["Birth Card","Archetype from birth date","✶"],deck:["78-Card Guide","Browse every card","☷"],sponsor:["Sponsor / Ads","Partnership inquiry","✉"]}, intros:{daily:"Draw one card for today’s atmosphere and advice.",love:"Draw two cards for your current heart and the other person’s signal.",three:"Draw past, present, and future to see the movement of the situation.",yesno:"Draw one card to read the direction of your question.",birth:"Calculate a symbolic birth archetype from your birth date.",deck:"Browse the full 78-card deck and its basic meanings.",sponsor:"Partnership, ad, sponsorship, and localization inquiries."}, roles:{today:"Today’s card",self:"My current heart",other:"Their signal",past:"Past",present:"Present",future:"Future",answer:"Answer card",birth:"Birth archetype"}, sections:{summary:"Full reading",flow:"Flow",emotion:"Emotional signal",advice:"Guidance",caution:"Caution",answer:"Answer"}, zodiac:"Today’s zodiac", zodiacText:"Check a light zodiac reading too.", seeNow:"View now", search:"Search card" };
const UI: Record<string, CopyPack> = { ko: KO, en: EN, ja:{...EN,home:"ホーム",menu:"メニュー",lang:"言語",landingTitle:"AIタロットオラクル",landingKicker:"自分で選ぶ今日の象徴",startDaily:"今日のカードを始める",startLove:"恋愛タロットを始める",explore:"78枚を見る"}, zh:{...EN,home:"首页",menu:"菜单",lang:"语言",landingTitle:"AI塔罗神谕",landingKicker:"亲自选择今日象征",startDaily:"开始今日牌",startLove:"开始爱情塔罗",explore:"浏览78张牌"}, es:{...EN,home:"Inicio",menu:"Menú",lang:"Idioma",landingTitle:"Oráculo de Tarot AI",landingKicker:"Elige tu propio símbolo",startDaily:"Empezar carta diaria",startLove:"Empezar amor",explore:"Ver 78 cartas"}, fr:{...EN,home:"Accueil",menu:"Menu",lang:"Langue",landingTitle:"Oracle Tarot IA",landingKicker:"Choisis ton symbole",startDaily:"Carte du jour",startLove:"Tarot amour",explore:"Voir les 78 cartes"}, de:{...EN,home:"Start",menu:"Menü",lang:"Sprache",landingTitle:"KI-Tarot-Orakel",landingKicker:"Wähle dein Symbol",startDaily:"Tageskarte starten",startLove:"Liebestarot starten",explore:"78 Karten ansehen"}, pt:{...EN,home:"Início",menu:"Menu",lang:"Idioma",landingTitle:"Oráculo de Tarô AI",landingKicker:"Escolha seu símbolo",startDaily:"Carta do dia",startLove:"Tarô do amor",explore:"Ver 78 cartas"} };

function hashString(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619);}return Math.abs(h>>>0);}
function todayKey(lang:Lang){const tz=LANGS[lang].timeZone;const d=tz==="device"?new Date():new Date(new Date().toLocaleString("en-US",{timeZone:tz}));return d.toISOString().slice(0,10);}
function makeCard(base:TarotCardBase,lang:Lang,seed:string):DrawCard{const rev=hashString(seed+":r")%100<28;const t=getTarotText(base,lang,rev);return{id:base.id,base,title:t.title,orientation:rev?"reversed":"upright",subtitle:t.subtitle,aura:t.aura,mission:t.mission,warning:t.warning,archetype:t.archetype,artPath:rwsImageUrl(base.id)};}
function pickCard(seed:string,lang:Lang,used:Set<string>){let idx=hashString(seed)%TAROT_DECK.length;let guard=0;while(used.has(TAROT_DECK[idx].id)&&guard<100){idx=(idx+7)%TAROT_DECK.length;guard++;}return makeCard(TAROT_DECK[idx],lang,seed);}
function birthCard(date:string,lang:Lang){const digits=(date||"2000-12-27").replace(/\D/g,"").split("").map(Number);let sum=digits.reduce((a,b)=>a+b,0);while(sum>21)sum=String(sum).split("").reduce((a,b)=>a+Number(b),0);const major=TAROT_DECK.filter(c=>c.arcana==="major");return makeCard(major[sum%major.length]||TAROT_DECK[0],lang,date+":birth");}

export default function App(){
 const [lang,setLang]=useState<Lang>((localStorage.getItem("fate-lang") as Lang)||"ko");
 const [mode,setMode]=useState<Mode>(((localStorage.getItem("fate-mode") as Mode)||"home"));
 const [name,setName]=useState(localStorage.getItem("fate-name")||"");
 const [birth,setBirth]=useState(localStorage.getItem("fate-birth")||"2000-12-27");
 const [selected,setSelected]=useState<DrawCard[]>([]);
 const [drawer,setDrawer]=useState(true);
 const [copied,setCopied]=useState(false);
 const c=UI[lang]||KO; const need=REQUIRED[mode]; const slots=SLOTS[mode]; const complete=need>0&&selected.length>=need; const date=todayKey(lang);
 useEffect(()=>{localStorage.setItem("fate-lang",lang);localStorage.setItem("fate-mode",mode);localStorage.setItem("fate-name",name);localStorage.setItem("fate-birth",birth);},[lang,mode,name,birth]);
 useEffect(()=>{setSelected([]);setCopied(false);},[mode,lang,birth]);
 const preview=useMemo(()=> mode==="birth" ? birthCard(birth,lang) : pickCard(`${mode}-${date}-${name}-${birth}-preview`,lang,new Set<string>()),[mode,date,name,birth,lang]);
 const changeMode=(m:Mode)=>{setMode(m);setDrawer(false);window.scrollTo({top:0,behavior:"smooth"});};
 const chooseSlot=(i:number)=>{if(selected[i]||selected.length>=need)return;const used=new Set<string>(selected.map(x=>x.id));const card=mode==="birth"?birthCard(birth,lang):pickCard(`${mode}-${date}-${name}-${birth}-${i}-${selected.length}`,lang,used);const next=[...selected];next[i]=card;setSelected(next.filter(Boolean));};
 const reset=()=>{setSelected([]);setCopied(false);};
 const blocks=makeReading(mode,selected,c,birth);
 const copyReading=async()=>{await navigator.clipboard?.writeText(blocks.map(b=>`${b.title}\n${b.body}`).join("\n\n"));setCopied(true);};
 return <div className={`oracleApp ${drawer?"drawerOpen":"drawerClosed"}`}>
  <aside className="side">
   <div className="brand"><button className="hamb" onClick={()=>setDrawer(!drawer)} aria-label={c.menu}>☰</button><button className="seal" onClick={()=>changeMode("home")} title={c.home}>△</button><button className="brandText" onClick={()=>changeMode("home")}><b>{c.brand}</b><small>{c.brandSub}</small></button></div>
   <nav>{(["home","daily","love","three","yesno","birth","deck"] as Mode[]).map(m=><button key={m} className={m===mode?"active":""} onClick={()=>changeMode(m)}><span>{c.tabs[m][2]}</span><strong>{c.tabs[m][0]}</strong><small>{c.tabs[m][1]}</small></button>)}</nav>
   <div className="zodiac"><div>☾</div><b>{c.zodiac}</b><p>{c.zodiacText}</p><button>{c.seeNow} →</button></div>
   <p className="legalMini">{c.artNote}</p><button className="sponsorBtn" onClick={()=>changeMode("sponsor")}>✉ {c.tabs.sponsor[0]}</button>
  </aside>
  <main className="stage">
   <header className="top"><button onClick={()=>setDrawer(!drawer)} className="floatingHamb">☰</button><label className="lang">◎ <select value={lang} onChange={e=>setLang(e.target.value as Lang)}>{Object.entries(LANGS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></label></header>
   {mode==="home" && <Home c={c} changeMode={changeMode} lang={lang}/>} 
   {mode==="deck" && <Deck c={c} lang={lang}/>} 
   {mode==="sponsor" && <Sponsor c={c}/>} 
   {mode!=="home" && mode!=="deck" && mode!=="sponsor" && <section className="readingScreen">
    <section className="readingHeader">
      <div><p className="eyebrow">AI TAROT</p><h1>{c.tabs[mode][0]}</h1><p>{c.intros[mode]}</p><div className="inputs"><input value={name} onChange={e=>setName(e.target.value)} placeholder={c.name}/><input type="date" value={birth} onChange={e=>setBirth(e.target.value)}/></div></div>
      <div className="preview"><img src={preview.artPath} alt={preview.title}/><b>{preview.title}</b><small>{preview.subtitle}</small></div>
    </section>
    <section className="workGrid">
     <div className="drawBoard">
      <div className="boardHead"><div><h2>{c.tabs[mode][0]}</h2><p>{selected.length}/{need} {c.selected}</p></div><strong>✦ {c.hint}</strong></div>
      <div className={`cardsRow count${need}`}>{slots.map((role,i)=>{const card=selected[i];return <button className={`pickCard ${card?"revealed":""}`} key={role+i} onClick={()=>chooseSlot(i)} disabled={!!card||selected.length>=need}><em>{i+1}</em><img src={card?card.artPath:"/cards/back.svg"} alt="tarot card"/><span>{c.roles[role]}</span></button>})}</div>
      <div className="actions"><button onClick={reset}>↻ {c.shuffle}</button><button className="primary" disabled={!complete}>✦ {c.read}</button><button disabled={!selected.length} onClick={reset}>⟲ {c.reset}</button></div><p className="tip">💡 {c.tapTip}</p>
     </div>
     <aside className="readingPanel"><h3>✦ {c.tabs[mode][0]}</h3>{!complete?<div className="emptyReading"><p>{c.ready}</p></div>:<><div className="selectedMini">{selected.slice(0,need).map((card,i)=><div key={card.id+i}><img src={card.artPath}/><span>{c.roles[slots[i]]}</span><b>{card.title}</b></div>)}</div>{blocks.map(b=><article key={b.title}><h4>{b.icon} {b.title}</h4><p>{b.body}</p></article>)}<button onClick={copyReading}>{copied?c.copied:c.copy}</button></>}</aside>
    </section>
   </section>}
   <footer>{c.legal}</footer>
  </main>
 </div>;
}

function Home({c,changeMode,lang}:{c:CopyPack;changeMode:(m:Mode)=>void;lang:Lang}){
 const samples=TAROT_DECK.slice(0,3).map((base,i)=>makeCard(base,lang,`home-${i}`));
 return <section className="homePage">
  <div className="homeHero"><div><p className="eyebrow">FATECARD · AI TAROT</p><h1>{c.landingTitle}</h1><p>{c.landingLead}</p><div className="homeActions"><button onClick={()=>changeMode("daily")}>{c.startDaily}</button><button onClick={()=>changeMode("love")}>{c.startLove}</button><button onClick={()=>changeMode("deck")}>{c.explore}</button></div></div><div className="homeCards">{samples.map((card,i)=><img key={card.id} src={card.artPath} className={`homeCard c${i}`}/>)}</div></div>
  <div className="choiceBlock"><div><h2>{c.chooseReading}</h2><p>{c.chooseReadingDesc}</p></div><div className="choiceGrid">{(["daily","love","three","yesno","birth","deck"] as Mode[]).map(m=><button key={m} onClick={()=>changeMode(m)}><span>{c.tabs[m][2]}</span><b>{c.tabs[m][0]}</b><small>{c.tabs[m][1]}</small></button>)}</div></div>
  <div className="how"><h2>{c.howTitle}</h2>{c.how.map((x:string)=><p key={x}>✦ {x}</p>)}</div>
 </section>;
}
function makeReading(mode:Mode,cards:DrawCard[],c:CopyPack,birth:string){ if(!cards.length)return[]; const names=cards.map(x=>x.title).join(" · ");
 if(mode==="yesno")return[{icon:"◇",title:c.sections.answer,body:`${cards[0].orientation==="upright"?"YES 쪽에 가깝습니다. 다만 무조건적인 허락이 아니라 조건부 신호입니다.":"NO 또는 보류에 가깝습니다. 지금은 억지로 밀어붙이기보다 상황의 균형을 다시 보는 편이 낫습니다."} ${cards[0].aura} ${cards[0].mission}`},{icon:"⚠",title:c.sections.caution,body:"이 답은 확정 예언이 아니라 현재 에너지의 방향입니다. 질문이 사람의 마음과 관련되어 있다면 상대의 속도와 경계를 존중해야 합니다."}];
 if(mode==="birth")return[{icon:"✶",title:c.sections.summary,body:`생년월일 ${birth}의 상징은 ${names}로 모입니다. 이 카드는 타고난 성향과 반복되는 선택 패턴을 보여줍니다. 장점은 분명하지만, 같은 방식으로만 문제를 풀려고 할 때 삶의 흐름이 좁아질 수 있습니다.`},{icon:"✦",title:c.sections.advice,body:`오늘의 조언은 ${cards[0].mission} 이 원형은 단순한 성격표가 아니라, 앞으로 어떤 태도를 선택해야 하는지 보여주는 상징입니다.`}];
 return[{icon:"♡",title:mode==="love"?c.sections.flow:c.sections.summary,body:`선택된 카드(${names})는 지금 상황이 단순한 호불호보다 흐름과 타이밍의 문제에 가깝다는 것을 보여줍니다. 첫 카드는 현재의 기본 에너지, 다음 카드는 상대나 환경의 반응, 이후 카드는 앞으로 열릴 가능성을 말합니다. 특히 관계에서는 “누가 더 좋아하느냐”보다 “서로가 같은 속도로 움직이고 있느냐”가 중요합니다.`},{icon:"☽",title:c.sections.emotion,body:"감정선은 겉으로 보이는 말보다 더 천천히 움직입니다. 한쪽은 이미 마음속에서 정리를 시작했지만, 다른 쪽은 아직 현실적인 확신이나 명분을 기다릴 수 있습니다. 그래서 지금은 시험하듯 확인하려 하기보다, 작고 분명한 표현을 통해 불필요한 오해를 줄이는 쪽이 좋습니다."},{icon:"✦",title:c.sections.advice,body:`오늘의 조언은 ${cards[0].mission} 카드가 강하게 좋거나 나쁘다는 식으로 단정하지 말고, 지금 내가 통제할 수 있는 행동 하나를 고르는 것이 핵심입니다.`},{icon:"⚠",title:c.sections.caution,body:`주의할 점은 ${cards[0].warning} 특히 연애나 관계 문제에서는 상대의 침묵을 곧바로 거절로 해석하거나, 반대로 작은 신호를 과장해서 기대하는 태도가 흐름을 흐릴 수 있습니다.`}];
}
function Deck({c,lang}:{c:CopyPack;lang:Lang}){ const [q,setQ]=useState(""); const list=TAROT_DECK.filter(card=>`${card.title.en} ${card.title.ko} ${card.id}`.toLowerCase().includes(q.toLowerCase())).slice(0,78); return <section className="deck"><h2>{c.tabs.deck[0]}</h2><p>{c.intros.deck}</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder={c.search}/><div className="deckGrid">{list.map(card=>{const t=getTarotText(card,lang,false); return <article key={card.id}><img src={rwsImageUrl(card.id)}/><b>{t.title}</b><p>{t.aura}</p></article>})}</div></section> }
function Sponsor({c}:{c:CopyPack}){ return <section className="sponsor"><h2>{c.tabs.sponsor[0]}</h2><p>{c.intros.sponsor}</p><a href="mailto:tbvjrkrh@gmail.com">tbvjrkrh@gmail.com</a></section> }
