
import React, { useEffect, useMemo, useState } from "react";
import { TAROT_DECK, getTarotText, type SupportedCardLang, type TarotCardBase } from "./tarotDeck";

type Lang = SupportedCardLang;
type Mode = "home" | "daily" | "love" | "three" | "yesno" | "birth" | "deck" | "sponsor";
type DrawCount = 1 | 3 | 5 | 7;
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
  brand:string; brandSub:string; home:string; menu:string; landingTitle:string; landingSub:string; landingLead:string;
  chooseCount:string; chooseCountHelp:string; selectFromSpread:string; tip:string; selected:string; reveal:string; reshuffle:string; reset:string; copy:string; copied:string; wait:string;
  todayMessage:string; readingTitle:string; readingWaiting:string; aiExplainTitle:string; aiExplainText:string; cardBackNote:string; legal:string; search:string; sponsorEmail:string;
  name:string; birth:string; start:string; homeStart:string; deckStart:string; howTitle:string; how:string[];
  tabs: Record<Mode, [string,string,string]>;
  roles: string[];
  sections: { summary:string; flow:string; emotion:string; advice:string; caution:string; answer:string; cards:string };
  intros: Record<Exclude<Mode,"home">, string>;
};

const KO: Copy = {
  brand:"FateCard.today", brandSub:"AI TAROT", home:"홈", menu:"메뉴",
  landingTitle:"FateCard.today", landingSub:"AI가 함께 해석하는 나만의 타로",
  landingLead:"원하는 카드 수를 고르고, 펼쳐진 카드에서 직접 선택하세요. 모든 카드가 선택된 뒤에만 풀이가 열립니다.",
  chooseCount:"카드 수 선택", chooseCountHelp:"질문에 따라 적합한 카드 수를 선택해 보세요.",
  selectFromSpread:"카드를 클릭하거나 터치해 선택하세요", tip:"직감이 이끄는 카드를 선택하세요. 정답은 당신의 마음속에 있습니다.",
  selected:"선택됨", reveal:"풀이 보기", reshuffle:"다시 섞기", reset:"선택 초기화", copy:"풀이 복사", copied:"복사됨", wait:"카드를 모두 선택하면 해석이 나타납니다.",
  todayMessage:"오늘의 메시지", readingTitle:"당신의 리딩", readingWaiting:"카드를 모두 선택하면 여기에 해석이 나타납니다.",
  aiExplainTitle:"AI 타로 해석이란?", aiExplainText:"AI가 카드의 의미와 위치, 질문의 맥락을 종합적으로 분석하여 당신만을 위한 맞춤형 해석을 제공합니다.",
  cardBackNote:"카드 뒷면은 현대 상업 덱을 쓰지 않고 새로 만든 오리지널 디자인입니다. 카드 앞면은 1909년 퍼블릭 도메인 계열 이미지를 기준으로 표시합니다.",
  legal:"재미와 자기성찰용입니다. 의학·법률·금융 조언이 아닙니다.",
  search:"카드 검색", sponsorEmail:"tbvjrkrh@gmail.com", name:"이름", birth:"생년월일", start:"시작하기", homeStart:"오늘의 카드 시작", deckStart:"78장 보기",
  howTitle:"이렇게 진행됩니다", how:["원하는 리딩과 카드 수를 고릅니다.","펼쳐진 카드 전체에서 직접 카드를 선택합니다.","선택이 끝나면 카드가 공개되고 풀이가 나타납니다."],
  tabs:{
    home:["홈","처음 화면","⌂"], daily:["오늘의 카드","오늘의 흐름과 조언","☉"], love:["연애 타로","관계의 흐름과 감정선","♡"],
    three:["3카드 리딩","과거 · 현재 · 미래","▧"], yesno:["예/아니오","간단하고 명확한 상징 답변","?"], birth:["탄생 카드","생년월일로 보는 원형","♧"],
    deck:["78장 가이드","모든 카드 살펴보기","☷"], sponsor:["후원 / 광고 문의","제휴와 광고 문의","✉"]
  },
  roles:["첫 번째 카드","두 번째 카드","세 번째 카드","네 번째 카드","다섯 번째 카드","여섯 번째 카드","일곱 번째 카드"],
  sections:{summary:"종합 해석",flow:"흐름",emotion:"감정선",advice:"조언",caution:"주의",answer:"답변",cards:"선택 카드"},
  intros:{
    daily:"오늘 하루의 핵심 상징을 카드로 확인합니다.",
    love:"관계의 속도, 감정선, 숨은 신호를 카드 흐름으로 읽습니다.",
    three:"과거·현재·미래의 흐름을 선택한 카드 수만큼 펼쳐봅니다.",
    yesno:"질문에 대해 지금 에너지가 어느 방향으로 기울어 있는지 봅니다.",
    birth:"생년월일과 선택한 카드 흐름을 함께 읽어 상징 원형을 봅니다.",
    deck:"78장 전체 카드를 확인하고 카드별 기본 의미를 살펴봅니다.",
    sponsor:"광고, 제휴, 후원, 현지화 문의를 받습니다."
  }
};

const EN: Copy = {
  ...KO,
  home:"Home", menu:"Menu", landingTitle:"FateCard.today", landingSub:"AI-assisted tarot for your own reading",
  landingLead:"Choose how many cards you want, then pick directly from the spread. The reading opens only after every card is selected.",
  chooseCount:"Choose card count", chooseCountHelp:"Select the number of cards that fits your question.",
  selectFromSpread:"Click or tap cards to select", tip:"Choose the cards your instinct pulls toward. The answer begins with attention.",
  selected:"selected", reveal:"Show reading", reshuffle:"Shuffle again", reset:"Reset", copy:"Copy reading", copied:"Copied", wait:"Select all cards to reveal the interpretation.",
  todayMessage:"Today’s message", readingTitle:"Your reading", readingWaiting:"The interpretation appears here after all cards are selected.",
  aiExplainTitle:"What is AI tarot interpretation?", aiExplainText:"AI combines card meanings, positions, and the context of your question into a personalized symbolic reading.",
  cardBackNote:"Card backs are original non-commercial artwork. Card fronts use public-domain 1909 style tarot images.",
  legal:"Entertainment and self-reflection only. Not medical, legal, or financial advice.", search:"Search card", name:"Name", birth:"Birth date", start:"Start", homeStart:"Start today’s card", deckStart:"Browse 78 cards",
  howTitle:"How it works", how:["Choose a reading and card count.","Pick cards directly from the spread.","Once finished, the cards reveal and the reading appears."],
  tabs:{home:["Home","Start screen","⌂"],daily:["Today’s Card","Flow and advice","☉"],love:["Love Tarot","Relationship and emotion","♡"],three:["3-Card Reading","Past · Present · Future","▧"],yesno:["Yes / No","Clear symbolic answer","?"],birth:["Birth Card","Archetype from birth date","♧"],deck:["78-Card Guide","Browse every card","☷"],sponsor:["Sponsor / Ads","Partnership inquiry","✉"]},
  roles:["First card","Second card","Third card","Fourth card","Fifth card","Sixth card","Seventh card"],
  sections:{summary:"Full reading",flow:"Flow",emotion:"Emotional signal",advice:"Guidance",caution:"Caution",answer:"Answer",cards:"Selected cards"},
  intros:{daily:"Read the key symbol for today.",love:"Read the pace, emotion, and hidden signals of the relationship.",three:"Open the flow across the number of cards you choose.",yesno:"See which direction the current energy leans.",birth:"Read your symbolic archetype through birth date and selected cards.",deck:"Explore the full 78-card deck and basic meanings.",sponsor:"Partnership, ad, sponsorship, and localization inquiries."}
};

const UI: Record<Lang, Copy> = {
  ko: KO, en: EN,
  ja:{...EN,home:"ホーム",menu:"メニュー",landingSub:"AIが解釈するあなたのタロット",chooseCount:"枚数を選択",selectFromSpread:"カードをクリックまたはタップ",reveal:"解釈を見る",reshuffle:"シャッフル",reset:"リセット",tabs:{...EN.tabs,home:["ホーム","開始画面","⌂"],daily:["今日のカード","今日の流れ","☉"],love:["恋愛タロット","関係と感情","♡"],deck:["78枚ガイド","全カードを見る","☷"]}},
  zh:{...EN,home:"首页",menu:"菜单",landingSub:"AI为你解读塔罗",chooseCount:"选择张数",selectFromSpread:"点击或触摸选择卡牌",reveal:"查看解读",reshuffle:"重新洗牌",reset:"重置",tabs:{...EN.tabs,home:["首页","开始画面","⌂"],daily:["今日牌","今日趋势","☉"],love:["爱情塔罗","关系与情绪","♡"],deck:["78张指南","查看全部卡牌","☷"]}},
  es:{...EN,home:"Inicio",menu:"Menú",landingSub:"Tarot asistido por IA",chooseCount:"Elegir cartas",selectFromSpread:"Haz clic o toca una carta",reveal:"Ver lectura",reshuffle:"Mezclar",reset:"Reiniciar",tabs:{...EN.tabs,home:["Inicio","Pantalla inicial","⌂"],daily:["Carta diaria","Flujo y consejo","☉"],love:["Tarot amor","Relación y emoción","♡"],deck:["Guía 78 cartas","Ver todas","☷"]}},
  fr:{...EN,home:"Accueil",menu:"Menu",landingSub:"Tarot interprété par IA",chooseCount:"Choisir le nombre",selectFromSpread:"Clique ou touche une carte",reveal:"Voir la lecture",reshuffle:"Mélanger",reset:"Réinitialiser",tabs:{...EN.tabs,home:["Accueil","Écran initial","⌂"],daily:["Carte du jour","Flux et conseil","☉"],love:["Tarot amour","Relation et émotion","♡"],deck:["Guide 78 cartes","Voir tout","☷"]}},
  de:{...EN,home:"Start",menu:"Menü",landingSub:"KI-gestützte Tarotdeutung",chooseCount:"Kartenzahl wählen",selectFromSpread:"Karte klicken oder tippen",reveal:"Deutung zeigen",reshuffle:"Neu mischen",reset:"Zurücksetzen",tabs:{...EN.tabs,home:["Start","Startbildschirm","⌂"],daily:["Tageskarte","Fluss und Rat","☉"],love:["Liebestarot","Beziehung und Gefühl","♡"],deck:["78-Karten-Guide","Alle Karten","☷"]}},
  pt:{...EN,home:"Início",menu:"Menu",landingSub:"Tarô interpretado por IA",chooseCount:"Escolher cartas",selectFromSpread:"Clique ou toque na carta",reveal:"Ver leitura",reshuffle:"Embaralhar",reset:"Redefinir",tabs:{...EN.tabs,home:["Início","Tela inicial","⌂"],daily:["Carta do dia","Fluxo e conselho","☉"],love:["Tarô amor","Relação e emoção","♡"],deck:["Guia 78 cartas","Ver tudo","☷"]}}
};

function hashString(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619);}return Math.abs(h>>>0);}
function todayKey(lang:Lang){const tz=LANGS[lang].timeZone;const d=tz==="device"?new Date():new Date(new Date().toLocaleString("en-US",{timeZone:tz}));return d.toISOString().slice(0,10);}
function seededDeck(seed:string){return TAROT_DECK.map((card,i)=>({card,sort:hashString(seed+card.id+i)})).sort((a,b)=>a.sort-b.sort).map(x=>x.card);}
function makeCard(base:TarotCardBase,lang:Lang,seed:string):DrawCard{const rev=hashString(seed+":r")%100<28;const t=getTarotText(base,lang,rev);return{id:base.id,base,title:t.title,orientation:rev?"reversed":"upright",subtitle:t.subtitle,aura:t.aura,mission:t.mission,warning:t.warning,archetype:t.archetype,artPath:rwsImageUrl(base.id)};}

export default function App(){
  const [lang,setLang]=useState<Lang>((localStorage.getItem("fate-lang") as Lang)||"ko");
  const [mode,setMode]=useState<Mode>("home");
  const [drawer,setDrawer]=useState(true);
  const [drawCount,setDrawCount]=useState<DrawCount>(3);
  const [shuffleSeed,setShuffleSeed]=useState(()=>"seed-"+Date.now());
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [revealed,setRevealed]=useState(false);
  const [name,setName]=useState(localStorage.getItem("fate-name")||"");
  const [birth,setBirth]=useState(localStorage.getItem("fate-birth")||"2000-12-27");
  const [copied,setCopied]=useState(false);

  const c=UI[lang]||KO;
  const deck=useMemo(()=>seededDeck(`${mode}-${todayKey(lang)}-${shuffleSeed}-${name}-${birth}`),[mode,lang,shuffleSeed,name,birth]);
  const selectedCards=selectedIds.map((id,i)=>makeCard(TAROT_DECK.find(x=>x.id===id)||TAROT_DECK[0],lang,`${shuffleSeed}-${id}-${i}`));
  const complete=selectedIds.length>=drawCount;
  const blocks=makeReading(mode,selectedCards,c,birth);

  useEffect(()=>{localStorage.setItem("fate-lang",lang);localStorage.setItem("fate-name",name);localStorage.setItem("fate-birth",birth);},[lang,name,birth]);
  useEffect(()=>{setSelectedIds([]);setRevealed(false);setCopied(false);},[mode,drawCount,lang]);
  const go=(m:Mode)=>{setMode(m);setSelectedIds([]);setRevealed(false);setCopied(false);window.scrollTo({top:0,behavior:"smooth"});};
  const reshuffle=()=>{setShuffleSeed("seed-"+Date.now());setSelectedIds([]);setRevealed(false);setCopied(false);};
  const choose=(id:string)=>{if(selectedIds.includes(id)||selectedIds.length>=drawCount||revealed)return;setSelectedIds([...selectedIds,id]);};
  const showReading=()=>{if(complete)setRevealed(true);};
  const copyReading=async()=>{await navigator.clipboard?.writeText(blocks.map(x=>`${x.title}\n${x.body}`).join("\n\n"));setCopied(true);};

  return <div className={`app ${drawer?"drawerOpen":"drawerClosed"}`}>
    <aside className="sidebar">
      <div className="sideBrand">
        <button className="menuBtn" onClick={()=>setDrawer(!drawer)} aria-label={c.menu}>☰</button>
        <button className="brandSeal" onClick={()=>go("home")} title={c.home}>△</button>
        <button className="brandName" onClick={()=>go("home")}><b>{c.brand}</b><small>{c.brandSub}</small></button>
      </div>
      <nav className="navList">{(["home","daily","love","three","yesno","birth","deck"] as Mode[]).map(m=>
        <button key={m} className={mode===m?"active":""} onClick={()=>go(m)} title={c.tabs[m][0]}>
          <span>{c.tabs[m][2]}</span><b>{c.tabs[m][0]}</b><small>{c.tabs[m][1]}</small>
        </button>
      )}</nav>
      <div className="membership"><div>✦</div><b>프리미엄 멤버십</b><p>더 깊은 리딩과 혜택을 경험해 보세요.</p></div>
      <button className="sponsor" onClick={()=>go("sponsor")}>✉ {c.tabs.sponsor[0]}</button>
    </aside>

    <main className="main">
      <header className="topBar">
        <button className="homeIcon" onClick={()=>go("home")} title={c.home}>⌂</button>
        <button className="topBrand" onClick={()=>go("home")}>{c.brand}</button>
        <div className="topSpacer"/>
        <button className="messageBtn">✦ {c.todayMessage}</button>
        <label className="language">◎ <select value={lang} onChange={e=>setLang(e.target.value as Lang)}>{Object.entries(LANGS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></label>
      </header>

      {mode==="home" && <Home c={c} setCount={setDrawCount} drawCount={drawCount} go={go}/>}
      {mode==="deck" && <Deck c={c} lang={lang}/>}
      {mode==="sponsor" && <Sponsor c={c}/>}
      {mode!=="home" && mode!=="deck" && mode!=="sponsor" &&
        <Reading c={c} mode={mode} lang={lang} deck={deck} drawCount={drawCount} setDrawCount={setDrawCount} selectedIds={selectedIds} selectedCards={selectedCards} complete={complete} revealed={revealed} choose={choose} reshuffle={reshuffle} showReading={showReading} blocks={blocks} copyReading={copyReading} copied={copied} name={name} setName={setName} birth={birth} setBirth={setBirth}/>
      }
      <footer>{c.legal}</footer>
    </main>
  </div>
}

function Home({c,setCount,drawCount,go}:{c:Copy;setCount:(n:DrawCount)=>void;drawCount:DrawCount;go:(m:Mode)=>void}){
  return <section className="homePage">
    <div className="homeHero">
      <div className="moonMark">☾</div>
      <h1>{c.landingTitle}</h1>
      <p className="sub">{c.landingSub}</p>
      <div className="divider">◇ ✦ ◇</div>
      <p className="lead">{c.landingLead}</p>
      <CardCount c={c} drawCount={drawCount} setDrawCount={setCount}/>
      <div className="homeActions">
        <button onClick={()=>go("daily")}>{c.homeStart}</button>
        <button onClick={()=>go("love")}>{c.tabs.love[0]}</button>
        <button onClick={()=>go("deck")}>{c.deckStart}</button>
      </div>
    </div>
    <div className="spreadPreview" aria-hidden="true">{Array.from({length:42}).map((_,i)=><img key={i} src="/cards/back.svg" style={{"--i":i} as React.CSSProperties}/>)}</div>
    <div className="howPanel"><h2>{c.howTitle}</h2>{c.how.map(x=><p key={x}>✦ {x}</p>)}</div>
  </section>
}

function CardCount({c,drawCount,setDrawCount}:{c:Copy;drawCount:DrawCount;setDrawCount:(n:DrawCount)=>void}){
  return <div className="countSelect"><b>✧ {c.chooseCount}</b>{([1,3,5,7] as DrawCount[]).map(n=><button key={n} className={drawCount===n?"active":""} onClick={()=>setDrawCount(n)}>{n}{n===1?"장":"장"}</button>)}<small>{c.chooseCountHelp}</small></div>
}

function Reading({c,mode,lang,deck,drawCount,setDrawCount,selectedIds,selectedCards,complete,revealed,choose,reshuffle,showReading,blocks,copyReading,copied,name,setName,birth,setBirth}:{c:Copy;mode:Mode;lang:Lang;deck:TarotCardBase[];drawCount:DrawCount;setDrawCount:(n:DrawCount)=>void;selectedIds:string[];selectedCards:DrawCard[];complete:boolean;revealed:boolean;choose:(id:string)=>void;reshuffle:()=>void;showReading:()=>void;blocks:{icon:string;title:string;body:string}[];copyReading:()=>void;copied:boolean;name:string;setName:(s:string)=>void;birth:string;setBirth:(s:string)=>void;}){
  return <section className="reader">
    <div className="readerHero">
      <p className="eyebrow">FATECARD · {c.tabs[mode][0]}</p>
      <h1>{mode==="daily"?c.tabs.daily[0]:c.tabs[mode][0]}</h1>
      <p>{c.intros[mode as Exclude<Mode,"home">]}</p>
      <div className="userInputs"><input value={name} onChange={e=>setName(e.target.value)} placeholder={c.name}/><input type="date" value={birth} onChange={e=>setBirth(e.target.value)}/></div>
      <CardCount c={c} drawCount={drawCount} setDrawCount={setDrawCount}/>
    </div>

    <div className="readerGrid">
      <section className="deckTable">
        <div className="tableHead"><h2>{c.selectFromSpread}</h2><span>{selectedIds.length}/{drawCount} {c.selected}</span></div>
        <div className="fullSpread">
          {deck.map((card,i)=>{
            const order=selectedIds.indexOf(card.id)+1;
            return <button key={card.id} onClick={()=>choose(card.id)} className={`spreadCard ${order>0?"picked":""}`} disabled={selectedIds.length>=drawCount || order>0 || revealed} style={{"--i":i} as React.CSSProperties}>
              <img src={order>0 && revealed ? rwsImageUrl(card.id) : "/cards/back.svg"} alt="tarot card"/>
              {order>0 && <em>{order}</em>}
            </button>
          })}
        </div>
        <div className="actions"><button onClick={reshuffle}>↻ {c.reshuffle}</button><button className="primary" disabled={!complete} onClick={showReading}>✦ {c.reveal}</button><button disabled={!selectedIds.length} onClick={reshuffle}>⟲ {c.reset}</button></div>
        <p className="tip">✦ TIP&nbsp; {c.tip}</p>
      </section>

      <aside className="readingPanel">
        <h3>{c.readingTitle}</h3>
        {!revealed && <div className="waiting"><div className="crescent">☾</div><p>{c.readingWaiting}</p><div className="placeholders">{Array.from({length:drawCount}).map((_,i)=><span key={i}/>)}</div><article><h4>{c.aiExplainTitle}</h4><p>{c.aiExplainText}</p></article></div>}
        {revealed && <><div className="chosenCards">{selectedCards.map((card,i)=><div key={card.id}><img src={card.artPath}/><small>{c.roles[i]}</small><b>{card.title}</b></div>)}</div>{blocks.map(b=><article key={b.title}><h4>{b.icon} {b.title}</h4><p>{b.body}</p></article>)}<button className="copyBtn" onClick={copyReading}>{copied?c.copied:c.copy}</button></>}
      </aside>
    </div>
  </section>
}

function makeReading(mode:Mode,cards:DrawCard[],c:Copy,birth:string){
  if(!cards.length)return[];
  const names=cards.map(x=>x.title).join(" · ");
  if(mode==="yesno"){
    const yes=cards[0].orientation==="upright";
    return [
      {icon:"◇",title:c.sections.answer,body:`${yes?"YES 쪽으로 기울어 있습니다. 단, 이것은 무조건적인 허락이 아니라 지금 흐름이 열려 있다는 신호에 가깝습니다.":"NO 또는 보류 쪽으로 기울어 있습니다. 지금은 밀어붙이기보다 조건을 정리하고 타이밍을 다시 보는 편이 낫습니다."} ${cards[0].aura}`},
      {icon:"✦",title:c.sections.advice,body:`${cards[0].mission} 질문이 사람의 마음과 관련되어 있다면 상대의 속도와 경계를 존중하는 것이 핵심입니다.`},
      {icon:"⚠",title:c.sections.caution,body:`${cards[0].warning} 카드가 주는 답을 확정 예언으로 받아들이기보다, 지금 선택에서 조심해야 할 방향으로 읽는 것이 안전합니다.`}
    ];
  }
  if(mode==="birth"){
    return [
      {icon:"✶",title:c.sections.summary,body:`생년월일 ${birth}와 선택된 카드(${names})는 당신이 반복해서 끌리는 삶의 주제와 선택 패턴을 보여줍니다. 장점은 분명하지만, 익숙한 방식으로만 문제를 풀려고 할 때 흐름이 좁아질 수 있습니다.`},
      {icon:"☽",title:c.sections.flow,body:"이 리딩은 타고난 성향을 고정된 운명으로 단정하지 않습니다. 지금 어떤 태도를 선택할 때 더 자연스럽게 힘이 붙는지, 반대로 어디서 에너지가 새는지를 보여주는 상징 지도에 가깝습니다."},
      {icon:"✦",title:c.sections.advice,body:`가장 먼저 적용할 조언은 ${cards[0].mission} 입니다. 거창한 변화보다 오늘의 작은 선택 하나가 원형을 현실로 끌어내는 출발점입니다.`}
    ];
  }
  return [
    {icon:"♡",title:mode==="love"?c.sections.flow:c.sections.summary,body:`선택된 카드(${names})는 지금 상황이 단순한 호불호보다 흐름과 타이밍의 문제에 가깝다는 것을 보여줍니다. 첫 카드는 현재의 기본 에너지, 다음 카드는 상대나 환경의 반응, 이후 카드는 앞으로 열릴 가능성을 말합니다. 관계 문제라면 “누가 더 좋아하느냐”보다 서로가 같은 속도로 움직이고 있는지가 더 중요합니다.`},
    {icon:"☽",title:c.sections.emotion,body:"감정선은 겉으로 보이는 말보다 천천히 움직입니다. 한쪽은 이미 마음속에서 정리를 시작했지만, 다른 쪽은 아직 현실적인 확신이나 명분을 기다릴 수 있습니다. 시험하듯 확인하려 하기보다 작고 분명한 표현으로 오해를 줄이는 쪽이 낫습니다."},
    {icon:"✦",title:c.sections.advice,body:`오늘의 조언은 ${cards[0].mission} 카드가 좋다/나쁘다로 단정하기보다, 지금 내가 통제할 수 있는 행동 하나를 고르는 것이 핵심입니다. 연락, 대화, 결정, 거리두기 중 무엇을 선택하든 감정적인 반응보다 일관성이 더 중요합니다.`},
    {icon:"⚠",title:c.sections.caution,body:`주의할 점은 ${cards[0].warning} 작은 신호를 과장해서 기대하거나, 침묵을 곧바로 거절로 해석하면 흐름을 왜곡할 수 있습니다.`}
  ];
}

function Deck({c,lang}:{c:Copy;lang:Lang}){
  const [q,setQ]=useState("");
  const list=TAROT_DECK.filter(card=>`${card.title.en} ${card.title.ko} ${card.id}`.toLowerCase().includes(q.toLowerCase()));
  return <section className="deckGuide"><h1>{c.tabs.deck[0]}</h1><p>{c.intros.deck}</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder={c.search}/><div className="deckGrid">{list.map(card=>{const t=getTarotText(card,lang,false);return <article key={card.id}><img src={rwsImageUrl(card.id)}/><b>{t.title}</b><p>{t.aura}</p></article>})}</div></section>
}
function Sponsor({c}:{c:Copy}){return <section className="sponsorPage"><h1>{c.tabs.sponsor[0]}</h1><p>{c.intros.sponsor}</p><a href={`mailto:${c.sponsorEmail}`}>{c.sponsorEmail}</a></section>}
