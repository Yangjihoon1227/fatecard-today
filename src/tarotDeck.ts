export type SupportedCardLang = "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt";

export type TarotCardBase = {
  id: string;
  arcana: "major" | "minor";
  title: { en: string; ko: string };
  symbol: string;
  luckyColor: string;
  keywords: {
    upright: { en: string; ko: string };
    reversed: { en: string; ko: string };
  };
  meaning: {
    upright: { en: string; ko: string };
    reversed: { en: string; ko: string };
  };
  advice: {
    upright: { en: string; ko: string };
    reversed: { en: string; ko: string };
  };
  scores: { love: number; money: number; work: number; mind: number };
};

export const TAROT_DECK: TarotCardBase[] = [
  {
    id: "major_00_fool",
    arcana: "major",
    title: { en: "The Fool", ko: "바보" },
    symbol: "✦",
    luckyColor: "#facc15",
    keywords: {
      upright: { en: "fresh start, freedom, curiosity, spontaneous movement", ko: "new beginning, innocence, leap of faith" },
      reversed: { en: "recklessness, naivety, poor preparation, careless risk", ko: "recklessness, naivety, poor preparation, careless risk" }
    },
    meaning: {
      upright: {
        en: "A new door is opening. Move lightly, but do not confuse freedom with zero responsibility.",
        ko: "새로운 문이 열린다. 가볍게 움직여도 좋지만 자유를 무책임과 착각하면 안 된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: recklessness, naivety, poor preparation, careless risk",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: recklessness, naivety, poor preparation, careless risk"
      }
    },
    advice: {
      upright: { en: "Take one small first step you have been delaying.", ko: "미뤄둔 첫걸음 하나를 작게 시작하라." },
      reversed: { en: "Before jumping, check the ground once.", ko: "뛰어들기 전 바닥을 한 번만 확인하라." }
    },
    scores: { love: 87, money: 62, work: 78, mind: 72 }
  },
  {
    id: "major_01_magician",
    arcana: "major",
    title: { en: "The Magician", ko: "마법사" },
    symbol: "✶",
    luckyColor: "#8b5cf6",
    keywords: {
      upright: { en: "skill, timing, initiative, making ideas real", ko: "willpower, skill, manifestation, tools" },
      reversed: { en: "manipulation, scattered will, unused talent", ko: "manipulation, scattered will, unused talent" }
    },
    meaning: {
      upright: {
        en: "You already have more tools than you admit. The issue is not potential but execution.",
        ko: "너는 생각보다 많은 도구를 이미 갖고 있다. 문제는 가능성이 아니라 실행이다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: manipulation, scattered will, unused talent",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: manipulation, scattered will, unused talent"
      }
    },
    advice: {
      upright: { en: "Turn one idea into a visible draft today.", ko: "아이디어 하나를 오늘 눈에 보이는 초안으로 바꿔라." },
      reversed: { en: "Do not use clever words to avoid real action.", ko: "말솜씨로 실제 행동을 피하지 마라." }
    },
    scores: { love: 50, money: 82, work: 61, mind: 64 }
  },
  {
    id: "major_02_high_priestess",
    arcana: "major",
    title: { en: "The High Priestess", ko: "여사제" },
    symbol: "☾",
    luckyColor: "#a78bfa",
    keywords: {
      upright: { en: "intuition, silence, hidden knowledge, subtle signals", ko: "intuition, mystery, inner knowledge" },
      reversed: { en: "secrets, confusion, ignoring intuition", ko: "secrets, confusion, ignoring intuition" }
    },
    meaning: {
      upright: {
        en: "The answer is not loud today. Watch what repeats quietly.",
        ko: "오늘 답은 시끄럽게 오지 않는다. 조용히 반복되는 신호를 봐라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: secrets, confusion, ignoring intuition",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: secrets, confusion, ignoring intuition"
      }
    },
    advice: {
      upright: { en: "Write down the feeling you keep dismissing.", ko: "계속 무시하던 느낌을 적어라." },
      reversed: { en: "Do not reveal everything too early.", ko: "모든 것을 너무 빨리 드러내지 마라." }
    },
    scores: { love: 61, money: 87, work: 86, mind: 82 }
  },
  {
    id: "major_03_empress",
    arcana: "major",
    title: { en: "The Empress", ko: "여황제" },
    symbol: "◆",
    luckyColor: "#fb7185",
    keywords: {
      upright: { en: "growth, care, sensuality, creativity, comfort", ko: "abundance, nurture, beauty, creation" },
      reversed: { en: "overgiving, dependency, creative block", ko: "overgiving, dependency, creative block" }
    },
    meaning: {
      upright: {
        en: "Growth comes through care, not force. Feed what you want to become real.",
        ko: "성장은 힘으로 밀어붙이는 게 아니라 돌보는 데서 온다. 현실로 만들고 싶은 것에 에너지를 줘라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overgiving, dependency, creative block",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: overgiving, dependency, creative block"
      }
    },
    advice: {
      upright: { en: "Improve one physical space around you.", ko: "주변의 물리적 공간 하나를 정돈하거나 아름답게 만들어라." },
      reversed: { en: "Do not confuse caring with sacrificing yourself.", ko: "돌봄을 자기희생과 혼동하지 마라." }
    },
    scores: { love: 81, money: 58, work: 52, mind: 63 }
  },
  {
    id: "major_04_emperor",
    arcana: "major",
    title: { en: "The Emperor", ko: "황제" },
    symbol: "▣",
    luckyColor: "#ef4444",
    keywords: {
      upright: { en: "structure, discipline, leadership, boundaries", ko: "structure, authority, discipline, order" },
      reversed: { en: "control, rigidity, domination, coldness", ko: "control, rigidity, domination, coldness" }
    },
    meaning: {
      upright: {
        en: "Order wins today. A clear boundary will solve more than another emotional explanation.",
        ko: "오늘은 질서가 이긴다. 감정 설명보다 명확한 경계가 더 많이 해결한다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: control, rigidity, domination, coldness",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: control, rigidity, domination, coldness"
      }
    },
    advice: {
      upright: { en: "Set one rule and actually follow it.", ko: "규칙 하나를 정하고 실제로 지켜라." },
      reversed: { en: "Authority without listening becomes weakness.", ko: "듣지 않는 권위는 약점이 된다." }
    },
    scores: { love: 62, money: 53, work: 64, mind: 47 }
  },
  {
    id: "major_05_hierophant",
    arcana: "major",
    title: { en: "The Hierophant", ko: "교황" },
    symbol: "♜",
    luckyColor: "#d97706",
    keywords: {
      upright: { en: "tradition, learning, mentorship, shared values", ko: "tradition, teaching, belief, institution" },
      reversed: { en: "blind conformity, dogma, stale rules", ko: "blind conformity, dogma, stale rules" }
    },
    meaning: {
      upright: {
        en: "A proven framework helps today. Do not reject structure just because it is old.",
        ko: "오늘은 검증된 틀이 도움이 된다. 오래됐다는 이유만으로 구조를 버리지 마라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blind conformity, dogma, stale rules",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: blind conformity, dogma, stale rules"
      }
    },
    advice: {
      upright: { en: "Learn from one reliable source before improvising.", ko: "즉흥적으로 하기 전에 믿을 만한 출처 하나에서 배워라." },
      reversed: { en: "Respect tradition, but do not outsource your conscience.", ko: "전통은 존중하되 양심까지 외주 주지는 마라." }
    },
    scores: { love: 54, money: 49, work: 79, mind: 54 }
  },
  {
    id: "major_06_lovers",
    arcana: "major",
    title: { en: "The Lovers", ko: "연인" },
    symbol: "♥",
    luckyColor: "#ec4899",
    keywords: {
      upright: { en: "alignment, love, choice, values, honest connection", ko: "choice, union, values, attraction" },
      reversed: { en: "indecision, temptation, misalignment", ko: "indecision, temptation, misalignment" }
    },
    meaning: {
      upright: {
        en: "The real question is not who you like, but what choice matches your values.",
        ko: "핵심은 누구를 좋아하느냐가 아니라 어떤 선택이 네 가치와 맞느냐이다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: indecision, temptation, misalignment",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: indecision, temptation, misalignment"
      }
    },
    advice: {
      upright: { en: "Make one choice that your future self can respect.", ko: "미래의 네가 존중할 선택 하나를 해라." },
      reversed: { en: "Attraction is not the same as alignment.", ko: "끌림과 맞음은 다르다." }
    },
    scores: { love: 90, money: 87, work: 57, mind: 72 }
  },
  {
    id: "major_07_chariot",
    arcana: "major",
    title: { en: "The Chariot", ko: "전차" },
    symbol: "➤",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "willpower, movement, victory, focused control", ko: "drive, victory, control, direction" },
      reversed: { en: "aggression, lack of direction, ego battle", ko: "aggression, lack of direction, ego battle" }
    },
    meaning: {
      upright: {
        en: "Momentum is available, but only if you choose a direction and hold it.",
        ko: "추진력은 있다. 단, 방향을 정하고 붙잡을 때만 힘이 된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: aggression, lack of direction, ego battle",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: aggression, lack of direction, ego battle"
      }
    },
    advice: {
      upright: { en: "Choose the main target and ignore one distraction.", ko: "주요 목표 하나를 정하고 방해 하나를 무시하라." },
      reversed: { en: "Speed without direction only creates damage.", ko: "방향 없는 속도는 피해만 만든다." }
    },
    scores: { love: 68, money: 74, work: 86, mind: 60 }
  },
  {
    id: "major_08_strength",
    arcana: "major",
    title: { en: "Strength", ko: "힘" },
    symbol: "♌",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "quiet courage, patience, emotional control, compassion", ko: "courage, patience, compassion, inner power" },
      reversed: { en: "self-doubt, force, impatience, pride", ko: "self-doubt, force, impatience, pride" }
    },
    meaning: {
      upright: {
        en: "Gentleness is not weakness today. Control yourself before trying to control the situation.",
        ko: "오늘 부드러움은 약함이 아니다. 상황을 통제하기 전에 자신부터 통제하라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: self-doubt, force, impatience, pride",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: self-doubt, force, impatience, pride"
      }
    },
    advice: {
      upright: { en: "Respond calmly to one irritating thing.", ko: "짜증 나는 일 하나에 차분히 반응하라." },
      reversed: { en: "Do not mistake pressure for strength.", ko: "압박을 힘으로 착각하지 마라." }
    },
    scores: { love: 59, money: 64, work: 81, mind: 89 }
  },
  {
    id: "major_09_hermit",
    arcana: "major",
    title: { en: "The Hermit", ko: "은둔자" },
    symbol: "☉",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "solitude, wisdom, inner search, careful reflection", ko: "solitude, wisdom, search, guidance" },
      reversed: { en: "isolation, withdrawal, loneliness", ko: "isolation, withdrawal, loneliness" }
    },
    meaning: {
      upright: {
        en: "Step back to see clearly. Noise is the enemy of today’s answer.",
        ko: "명확히 보기 위해 한 발 물러서라. 오늘 답의 적은 소음이다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: isolation, withdrawal, loneliness",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: isolation, withdrawal, loneliness"
      }
    },
    advice: {
      upright: { en: "Spend ten quiet minutes without input.", ko: "아무 입력 없이 조용한 10분을 보내라." },
      reversed: { en: "Do not disappear when honest communication is needed.", ko: "정직한 소통이 필요한 순간에 사라지지 마라." }
    },
    scores: { love: 82, money: 80, work: 50, mind: 66 }
  },
  {
    id: "major_10_wheel",
    arcana: "major",
    title: { en: "Wheel of Fortune", ko: "운명의 수레바퀴" },
    symbol: "◎",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "change, timing, luck, cycles, turning point", ko: "change, cycle, luck, turning point" },
      reversed: { en: "bad timing, resistance, repeated pattern", ko: "bad timing, resistance, repeated pattern" }
    },
    meaning: {
      upright: {
        en: "A cycle is turning. Adapt quickly instead of arguing with timing.",
        ko: "주기가 바뀌고 있다. 타이밍과 싸우지 말고 빠르게 적응하라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: bad timing, resistance, repeated pattern",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: bad timing, resistance, repeated pattern"
      }
    },
    advice: {
      upright: { en: "Notice one repeating pattern and adjust it.", ko: "반복되는 패턴 하나를 보고 조정하라." },
      reversed: { en: "Luck still requires positioning.", ko: "운도 위치 선정이 필요하다." }
    },
    scores: { love: 59, money: 48, work: 51, mind: 63 }
  },
  {
    id: "major_11_justice",
    arcana: "major",
    title: { en: "Justice", ko: "정의" },
    symbol: "⚖",
    luckyColor: "#60a5fa",
    keywords: {
      upright: { en: "truth, fairness, accountability, clear decision", ko: "truth, fairness, accountability, decision" },
      reversed: { en: "bias, avoidance, unfairness", ko: "bias, avoidance, unfairness" }
    },
    meaning: {
      upright: {
        en: "Facts matter today. The fair answer may not be the comfortable one.",
        ko: "오늘은 사실이 중요하다. 공정한 답이 편한 답은 아닐 수 있다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: bias, avoidance, unfairness",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: bias, avoidance, unfairness"
      }
    },
    advice: {
      upright: { en: "Make one decision based on evidence, not mood.", ko: "기분이 아니라 증거로 결정 하나를 내려라." },
      reversed: { en: "Do not edit the truth to protect your ego.", ko: "자존심을 지키려고 진실을 편집하지 마라." }
    },
    scores: { love: 68, money: 78, work: 65, mind: 47 }
  },
  {
    id: "major_12_hanged_man",
    arcana: "major",
    title: { en: "The Hanged Man", ko: "매달린 사람" },
    symbol: "▽",
    luckyColor: "#06b6d4",
    keywords: {
      upright: { en: "pause, surrender, new perspective, necessary delay", ko: "pause, surrender, perspective, delay" },
      reversed: { en: "stalling, martyrdom, resistance", ko: "stalling, martyrdom, resistance" }
    },
    meaning: {
      upright: {
        en: "Progress may look like waiting. Change your angle before forcing movement.",
        ko: "진전이 기다림처럼 보일 수 있다. 억지로 움직이기 전에 각도를 바꿔라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: stalling, martyrdom, resistance",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: stalling, martyrdom, resistance"
      }
    },
    advice: {
      upright: { en: "Look at one problem from the opposite side.", ko: "문제 하나를 반대편 시선에서 보라." },
      reversed: { en: "Do not call avoidance spiritual patience.", ko: "회피를 영적인 인내라고 부르지 마라." }
    },
    scores: { love: 89, money: 65, work: 80, mind: 51 }
  },
  {
    id: "major_13_death",
    arcana: "major",
    title: { en: "Death", ko: "죽음" },
    symbol: "✚",
    luckyColor: "#111827",
    keywords: {
      upright: { en: "ending, transformation, release, renewal", ko: "ending, transformation, release, renewal" },
      reversed: { en: "resistance, fear of change, clinging", ko: "resistance, fear of change, clinging" }
    },
    meaning: {
      upright: {
        en: "Something has served its purpose. Ending it cleanly creates space.",
        ko: "어떤 것은 이미 역할을 다했다. 깨끗하게 끝내야 공간이 생긴다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: resistance, fear of change, clinging",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: resistance, fear of change, clinging"
      }
    },
    advice: {
      upright: { en: "Close one loop you know is over.", ko: "끝났다는 걸 아는 고리 하나를 닫아라." },
      reversed: { en: "Dragging a dead thing forward costs life.", ko: "죽은 것을 끌고 가면 산 에너지가 줄어든다." }
    },
    scores: { love: 72, money: 85, work: 75, mind: 88 }
  },
  {
    id: "major_14_temperance",
    arcana: "major",
    title: { en: "Temperance", ko: "절제" },
    symbol: "≈",
    luckyColor: "#14b8a6",
    keywords: {
      upright: { en: "balance, patience, healing, integration", ko: "balance, moderation, healing, blending" },
      reversed: { en: "excess, impatience, imbalance", ko: "excess, impatience, imbalance" }
    },
    meaning: {
      upright: {
        en: "Blend, do not force. Today’s success comes through measured adjustment.",
        ko: "억지로 밀지 말고 섞어라. 오늘 성공은 적당한 조정에서 온다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: excess, impatience, imbalance",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: excess, impatience, imbalance"
      }
    },
    advice: {
      upright: { en: "Reduce one excess by half.", ko: "과한 것 하나를 절반으로 줄여라." },
      reversed: { en: "Extremes will waste your energy.", ko: "극단은 에너지를 낭비한다." }
    },
    scores: { love: 59, money: 52, work: 66, mind: 57 }
  },
  {
    id: "major_15_devil",
    arcana: "major",
    title: { en: "The Devil", ko: "악마" },
    symbol: "♛",
    luckyColor: "#7f1d1d",
    keywords: {
      upright: { en: "attachment, desire, shadow, material pull", ko: "attachment, temptation, shadow, bondage" },
      reversed: { en: "release, awareness, breaking chains", ko: "release, awareness, breaking chains" }
    },
    meaning: {
      upright: {
        en: "Look honestly at what controls you. Naming the chain weakens it.",
        ko: "무엇이 너를 조종하는지 정직하게 봐라. 사슬의 이름을 붙이면 약해진다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: release, awareness, breaking chains",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: release, awareness, breaking chains"
      }
    },
    advice: {
      upright: { en: "Avoid one addictive loop for one hour.", ko: "중독적 루프 하나를 한 시간 피하라." },
      reversed: { en: "Pleasure with no boundary becomes a bill.", ko: "경계 없는 쾌락은 청구서가 된다." }
    },
    scores: { love: 64, money: 73, work: 61, mind: 63 }
  },
  {
    id: "major_16_tower",
    arcana: "major",
    title: { en: "The Tower", ko: "탑" },
    symbol: "⚡",
    luckyColor: "#dc2626",
    keywords: {
      upright: { en: "sudden change, collapse, revelation, liberation", ko: "collapse, revelation, disruption, truth" },
      reversed: { en: "avoided disaster, fear, delayed collapse", ko: "avoided disaster, fear, delayed collapse" }
    },
    meaning: {
      upright: {
        en: "A false structure cannot hold. Let truth break what was already unstable.",
        ko: "거짓 구조는 버티지 못한다. 이미 불안정했던 것을 진실이 깨게 둬라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: avoided disaster, fear, delayed collapse",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: avoided disaster, fear, delayed collapse"
      }
    },
    advice: {
      upright: { en: "Identify one fragile assumption.", ko: "취약한 가정 하나를 찾아라." },
      reversed: { en: "Do not rebuild the same weak tower immediately.", ko: "같은 약한 탑을 곧바로 다시 세우지 마라." }
    },
    scores: { love: 59, money: 90, work: 89, mind: 92 }
  },
  {
    id: "major_17_star",
    arcana: "major",
    title: { en: "The Star", ko: "별" },
    symbol: "★",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "hope, renewal, inspiration, calm guidance", ko: "hope, renewal, inspiration, healing" },
      reversed: { en: "discouragement, cynicism, lost faith", ko: "discouragement, cynicism, lost faith" }
    },
    meaning: {
      upright: {
        en: "Hope returns quietly. Follow the small light, not the loud fear.",
        ko: "희망은 조용히 돌아온다. 큰 두려움보다 작은 빛을 따라가라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: discouragement, cynicism, lost faith",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: discouragement, cynicism, lost faith"
      }
    },
    advice: {
      upright: { en: "Do one thing that restores faith in yourself.", ko: "자신에 대한 믿음을 회복시키는 일 하나를 해라." },
      reversed: { en: "Hope is not a plan, but it can restart one.", ko: "희망은 계획은 아니지만 계획을 다시 시작하게 한다." }
    },
    scores: { love: 71, money: 59, work: 58, mind: 53 }
  },
  {
    id: "major_18_moon",
    arcana: "major",
    title: { en: "The Moon", ko: "달" },
    symbol: "☽",
    luckyColor: "#64748b",
    keywords: {
      upright: { en: "dreams, intuition, uncertainty, hidden fears", ko: "illusion, dream, fear, subconscious" },
      reversed: { en: "clarity, confusion ending, deception exposed", ko: "clarity, confusion ending, deception exposed" }
    },
    meaning: {
      upright: {
        en: "Not everything is clear yet. Move slowly and verify shadows before reacting.",
        ko: "아직 모든 것이 분명하지 않다. 반응하기 전에 그림자를 확인하며 천천히 움직여라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: clarity, confusion ending, deception exposed",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: clarity, confusion ending, deception exposed"
      }
    },
    advice: {
      upright: { en: "Do not decide from fear tonight.", ko: "오늘 밤 두려움으로 결정하지 마라." },
      reversed: { en: "Anxiety can imitate intuition.", ko: "불안은 직감을 흉내낼 수 있다." }
    },
    scores: { love: 57, money: 76, work: 73, mind: 73 }
  },
  {
    id: "major_19_sun",
    arcana: "major",
    title: { en: "The Sun", ko: "태양" },
    symbol: "☀",
    luckyColor: "#f59e0b",
    keywords: {
      upright: { en: "joy, clarity, success, confidence, vitality", ko: "joy, success, clarity, vitality" },
      reversed: { en: "temporary sadness, ego, delayed success", ko: "temporary sadness, ego, delayed success" }
    },
    meaning: {
      upright: {
        en: "Clarity brings warmth. Let yourself be seen without overperforming.",
        ko: "명확함이 따뜻함을 가져온다. 과하게 증명하지 말고 드러나라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: temporary sadness, ego, delayed success",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: temporary sadness, ego, delayed success"
      }
    },
    advice: {
      upright: { en: "Share one honest good thing.", ko: "솔직한 좋은 소식 하나를 나눠라." },
      reversed: { en: "Confidence becomes arrogance when it stops listening.", ko: "듣지 않는 자신감은 오만이 된다." }
    },
    scores: { love: 73, money: 54, work: 91, mind: 46 }
  },
  {
    id: "major_20_judgement",
    arcana: "major",
    title: { en: "Judgement", ko: "심판" },
    symbol: "✧",
    luckyColor: "#c084fc",
    keywords: {
      upright: { en: "awakening, review, calling, honest reckoning", ko: "calling, awakening, review, rebirth" },
      reversed: { en: "self-judgment, avoidance, refusing the call", ko: "self-judgment, avoidance, refusing the call" }
    },
    meaning: {
      upright: {
        en: "A bigger version of you is asking for a decision. Review, then rise.",
        ko: "더 큰 버전의 네가 결정을 요구한다. 돌아보고 올라서라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: self-judgment, avoidance, refusing the call",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: self-judgment, avoidance, refusing the call"
      }
    },
    advice: {
      upright: { en: "Answer one call you have ignored.", ko: "무시해온 부름 하나에 답하라." },
      reversed: { en: "Do not punish yourself instead of changing.", ko: "변화 대신 자기처벌을 하지 마라." }
    },
    scores: { love: 51, money: 80, work: 50, mind: 50 }
  },
  {
    id: "major_21_world",
    arcana: "major",
    title: { en: "The World", ko: "세계" },
    symbol: "⊕",
    luckyColor: "#10b981",
    keywords: {
      upright: { en: "completion, integration, achievement, wholeness", ko: "completion, integration, achievement, wholeness" },
      reversed: { en: "unfinished business, delay, lack of closure", ko: "unfinished business, delay, lack of closure" }
    },
    meaning: {
      upright: {
        en: "A cycle can complete with dignity. Gather the lesson and step through.",
        ko: "한 주기가 품위 있게 완성될 수 있다. 배움을 챙기고 다음 문으로 가라."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: unfinished business, delay, lack of closure",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: unfinished business, delay, lack of closure"
      }
    },
    advice: {
      upright: { en: "Mark one chapter as complete.", ko: "한 챕터를 완료로 표시하라." },
      reversed: { en: "Do not keep polishing what is already complete.", ko: "이미 완성된 것을 계속 만지작거리지 마라." }
    },
    scores: { love: 70, money: 63, work: 91, mind: 71 }
  },
  {
    id: "minor_wands_ace",
    arcana: "minor",
    title: { en: "Ace of Wands", ko: "에이스 완드" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "new seed, fire, ambition, action, creativity", ko: "new seed, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of new seed", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A new seed appears. Use the first spark before it fades. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "새 씨앗이 나타난다. 첫 불꽃이 사라지기 전에 써라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of new seed",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 64, money: 47, work: 60, mind: 72 }
  },
  {
    id: "minor_wands_two",
    arcana: "minor",
    title: { en: "Two of Wands", ko: "완드 2" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "choice and balance, fire, ambition, action, creativity", ko: "choice and balance, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of choice and balance", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Two forces ask for balance. Do not rush the comparison. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "두 힘이 균형을 요구한다. 비교를 서두르지 마라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of choice and balance",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 63, money: 49, work: 61, mind: 76 }
  },
  {
    id: "minor_wands_three",
    arcana: "minor",
    title: { en: "Three of Wands", ko: "완드 3" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "growth and collaboration, fire, ambition, action, creativity", ko: "growth and collaboration, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of growth and collaboration", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Something grows through support, feedback, or early structure. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "무언가가 지지, 피드백, 초기 구조를 통해 자란다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of growth and collaboration",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 66, money: 67, work: 59, mind: 63 }
  },
  {
    id: "minor_wands_four",
    arcana: "minor",
    title: { en: "Four of Wands", ko: "완드 4" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "stability and pause, fire, ambition, action, creativity", ko: "stability and pause, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of stability and pause", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Stability matters now. Build a base before expansion. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "지금은 안정이 중요하다. 확장 전에 기반을 만들어라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of stability and pause",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 67, money: 52, work: 76, mind: 74 }
  },
  {
    id: "minor_wands_five",
    arcana: "minor",
    title: { en: "Five of Wands", ko: "완드 5" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "tension and challenge, fire, ambition, action, creativity", ko: "tension and challenge, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of tension and challenge", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A challenge exposes what needs correction. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "도전은 고쳐야 할 것을 드러낸다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of tension and challenge",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 58, money: 62, work: 92, mind: 80 }
  },
  {
    id: "minor_wands_six",
    arcana: "minor",
    title: { en: "Six of Wands", ko: "완드 6" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "movement and recovery, fire, ambition, action, creativity", ko: "movement and recovery, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of movement and recovery", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Recovery or progress is possible through a more generous view. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "더 너그러운 관점을 통해 회복이나 진전이 가능하다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of movement and recovery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 89, money: 79, work: 84, mind: 68 }
  },
  {
    id: "minor_wands_seven",
    arcana: "minor",
    title: { en: "Seven of Wands", ko: "완드 7" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "test and strategy, fire, ambition, action, creativity", ko: "test and strategy, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of test and strategy", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are being tested. Strategy matters more than force. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "시험대에 올랐다. 힘보다 전략이 중요하다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of test and strategy",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 60, money: 74, work: 78, mind: 85 }
  },
  {
    id: "minor_wands_eight",
    arcana: "minor",
    title: { en: "Eight of Wands", ko: "완드 8" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "motion and effort, fire, ambition, action, creativity", ko: "motion and effort, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of motion and effort", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Momentum builds through repetition and focused effort. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "반복과 집중된 노력으로 추진력이 생긴다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of motion and effort",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 68, money: 51, work: 88, mind: 73 }
  },
  {
    id: "minor_wands_nine",
    arcana: "minor",
    title: { en: "Nine of Wands", ko: "완드 9" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "threshold and resilience, fire, ambition, action, creativity", ko: "threshold and resilience, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of threshold and resilience", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are close to a threshold. Protect your energy. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "문턱에 가까워졌다. 에너지를 보호하라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of threshold and resilience",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 64, money: 68, work: 92, mind: 91 }
  },
  {
    id: "minor_wands_ten",
    arcana: "minor",
    title: { en: "Ten of Wands", ko: "완드 10" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "completion and burden, fire, ambition, action, creativity", ko: "completion and burden, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of completion and burden", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "The cycle is heavy because it is nearing completion. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "주기가 완성에 가까워져 무겁게 느껴진다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of completion and burden",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 67, money: 55, work: 76, mind: 68 }
  },
  {
    id: "minor_wands_page",
    arcana: "minor",
    title: { en: "Page of Wands", ko: "페이지 완드" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "message and beginner mind, fire, ambition, action, creativity", ko: "message and beginner mind, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of message and beginner mind", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A message or beginner energy arrives. Stay curious. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "메시지나 초심자의 에너지가 온다. 호기심을 유지하라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of message and beginner mind",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 69, money: 66, work: 64, mind: 47 }
  },
  {
    id: "minor_wands_knight",
    arcana: "minor",
    title: { en: "Knight of Wands", ko: "기사 완드" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "movement and pursuit, fire, ambition, action, creativity", ko: "movement and pursuit, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of movement and pursuit", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Movement accelerates. Aim your pursuit carefully. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "움직임이 빨라진다. 추구하는 방향을 신중히 조준하라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of movement and pursuit",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 79, money: 85, work: 72, mind: 51 }
  },
  {
    id: "minor_wands_queen",
    arcana: "minor",
    title: { en: "Queen of Wands", ko: "퀸 완드" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "maturity and inner mastery, fire, ambition, action, creativity", ko: "maturity and inner mastery, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of maturity and inner mastery", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Maturity comes through embodied understanding. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "체화된 이해를 통해 성숙이 온다. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of maturity and inner mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 68, money: 82, work: 84, mind: 78 }
  },
  {
    id: "minor_wands_king",
    arcana: "minor",
    title: { en: "King of Wands", ko: "킹 완드" },
    symbol: "🔥",
    luckyColor: "#f97316",
    keywords: {
      upright: { en: "leadership and mastery, fire, ambition, action, creativity", ko: "leadership and mastery, fire, ambition, action, creativity" },
      reversed: { en: "blocked energy, burnout, impatience, scattered ambition, shadow of leadership and mastery", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Lead the energy instead of being ruled by it. In the suit of Wands, this points to ambition, creative fire, visibility, courage.",
        ko: "그 에너지에 지배되지 말고 이끌어라. 완드의 영역에서는 야망, 창조성, 행동력, 용기와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: blocked energy, burnout, impatience, scattered ambition, shadow of leadership and mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라."
      }
    },
    advice: {
      upright: { en: "Act before the spark cools.", ko: "불꽃이 식기 전에 행동하라." },
      reversed: { en: "Watch for blocked energy, burnout, impatience, scattered ambition.", ko: "막힌 에너지, 번아웃, 조급함, 흩어진 야망을 경계하라." }
    },
    scores: { love: 52, money: 50, work: 71, mind: 63 }
  },
  {
    id: "minor_cups_ace",
    arcana: "minor",
    title: { en: "Ace of Cups", ko: "에이스 컵" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "new seed, emotion, love, intuition, relationship", ko: "new seed, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of new seed", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A new seed appears. Use the first spark before it fades. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "새 씨앗이 나타난다. 첫 불꽃이 사라지기 전에 써라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of new seed",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 52, money: 85, work: 77, mind: 58 }
  },
  {
    id: "minor_cups_two",
    arcana: "minor",
    title: { en: "Two of Cups", ko: "컵 2" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "choice and balance, emotion, love, intuition, relationship", ko: "choice and balance, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of choice and balance", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Two forces ask for balance. Do not rush the comparison. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "두 힘이 균형을 요구한다. 비교를 서두르지 마라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of choice and balance",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 85, money: 52, work: 49, mind: 65 }
  },
  {
    id: "minor_cups_three",
    arcana: "minor",
    title: { en: "Three of Cups", ko: "컵 3" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "growth and collaboration, emotion, love, intuition, relationship", ko: "growth and collaboration, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of growth and collaboration", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Something grows through support, feedback, or early structure. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "무언가가 지지, 피드백, 초기 구조를 통해 자란다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of growth and collaboration",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 74, money: 63, work: 75, mind: 86 }
  },
  {
    id: "minor_cups_four",
    arcana: "minor",
    title: { en: "Four of Cups", ko: "컵 4" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "stability and pause, emotion, love, intuition, relationship", ko: "stability and pause, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of stability and pause", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Stability matters now. Build a base before expansion. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "지금은 안정이 중요하다. 확장 전에 기반을 만들어라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of stability and pause",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 90, money: 50, work: 48, mind: 80 }
  },
  {
    id: "minor_cups_five",
    arcana: "minor",
    title: { en: "Five of Cups", ko: "컵 5" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "tension and challenge, emotion, love, intuition, relationship", ko: "tension and challenge, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of tension and challenge", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A challenge exposes what needs correction. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "도전은 고쳐야 할 것을 드러낸다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of tension and challenge",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 79, money: 71, work: 68, mind: 85 }
  },
  {
    id: "minor_cups_six",
    arcana: "minor",
    title: { en: "Six of Cups", ko: "컵 6" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "movement and recovery, emotion, love, intuition, relationship", ko: "movement and recovery, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of movement and recovery", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Recovery or progress is possible through a more generous view. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "더 너그러운 관점을 통해 회복이나 진전이 가능하다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of movement and recovery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 63, money: 68, work: 48, mind: 49 }
  },
  {
    id: "minor_cups_seven",
    arcana: "minor",
    title: { en: "Seven of Cups", ko: "컵 7" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "test and strategy, emotion, love, intuition, relationship", ko: "test and strategy, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of test and strategy", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are being tested. Strategy matters more than force. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "시험대에 올랐다. 힘보다 전략이 중요하다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of test and strategy",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 72, money: 74, work: 70, mind: 49 }
  },
  {
    id: "minor_cups_eight",
    arcana: "minor",
    title: { en: "Eight of Cups", ko: "컵 8" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "motion and effort, emotion, love, intuition, relationship", ko: "motion and effort, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of motion and effort", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Momentum builds through repetition and focused effort. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "반복과 집중된 노력으로 추진력이 생긴다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of motion and effort",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 57, money: 66, work: 64, mind: 88 }
  },
  {
    id: "minor_cups_nine",
    arcana: "minor",
    title: { en: "Nine of Cups", ko: "컵 9" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "threshold and resilience, emotion, love, intuition, relationship", ko: "threshold and resilience, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of threshold and resilience", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are close to a threshold. Protect your energy. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "문턱에 가까워졌다. 에너지를 보호하라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of threshold and resilience",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 68, money: 71, work: 86, mind: 52 }
  },
  {
    id: "minor_cups_ten",
    arcana: "minor",
    title: { en: "Ten of Cups", ko: "컵 10" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "completion and burden, emotion, love, intuition, relationship", ko: "completion and burden, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of completion and burden", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "The cycle is heavy because it is nearing completion. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "주기가 완성에 가까워져 무겁게 느껴진다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of completion and burden",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 84, money: 83, work: 62, mind: 65 }
  },
  {
    id: "minor_cups_page",
    arcana: "minor",
    title: { en: "Page of Cups", ko: "페이지 컵" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "message and beginner mind, emotion, love, intuition, relationship", ko: "message and beginner mind, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of message and beginner mind", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A message or beginner energy arrives. Stay curious. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "메시지나 초심자의 에너지가 온다. 호기심을 유지하라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of message and beginner mind",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 69, money: 69, work: 60, mind: 92 }
  },
  {
    id: "minor_cups_knight",
    arcana: "minor",
    title: { en: "Knight of Cups", ko: "기사 컵" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "movement and pursuit, emotion, love, intuition, relationship", ko: "movement and pursuit, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of movement and pursuit", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Movement accelerates. Aim your pursuit carefully. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "움직임이 빨라진다. 추구하는 방향을 신중히 조준하라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of movement and pursuit",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 58, money: 63, work: 82, mind: 81 }
  },
  {
    id: "minor_cups_queen",
    arcana: "minor",
    title: { en: "Queen of Cups", ko: "퀸 컵" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "maturity and inner mastery, emotion, love, intuition, relationship", ko: "maturity and inner mastery, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of maturity and inner mastery", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Maturity comes through embodied understanding. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "체화된 이해를 통해 성숙이 온다. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of maturity and inner mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 90, money: 54, work: 88, mind: 78 }
  },
  {
    id: "minor_cups_king",
    arcana: "minor",
    title: { en: "King of Cups", ko: "킹 컵" },
    symbol: "💧",
    luckyColor: "#38bdf8",
    keywords: {
      upright: { en: "leadership and mastery, emotion, love, intuition, relationship", ko: "leadership and mastery, emotion, love, intuition, relationship" },
      reversed: { en: "emotional confusion, avoidance, dependency, unrealistic longing, shadow of leadership and mastery", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Lead the energy instead of being ruled by it. In the suit of Cups, this points to feelings, relationships, intuition, healing.",
        ko: "그 에너지에 지배되지 말고 이끌어라. 컵의 영역에서는 감정, 관계, 직감, 치유와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: emotional confusion, avoidance, dependency, unrealistic longing, shadow of leadership and mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라."
      }
    },
    advice: {
      upright: { en: "Respect the feeling, but verify the story.", ko: "감정은 존중하되 이야기는 검증하라." },
      reversed: { en: "Watch for emotional confusion, avoidance, dependency, unrealistic longing.", ko: "감정 혼란, 회피, 의존, 비현실적 그리움을 경계하라." }
    },
    scores: { love: 85, money: 68, work: 61, mind: 60 }
  },
  {
    id: "minor_swords_ace",
    arcana: "minor",
    title: { en: "Ace of Swords", ko: "에이스 소드" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "new seed, mind, truth, conflict, decision", ko: "new seed, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of new seed", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A new seed appears. Use the first spark before it fades. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "새 씨앗이 나타난다. 첫 불꽃이 사라지기 전에 써라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of new seed",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 70, money: 72, work: 74, mind: 89 }
  },
  {
    id: "minor_swords_two",
    arcana: "minor",
    title: { en: "Two of Swords", ko: "소드 2" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "choice and balance, mind, truth, conflict, decision", ko: "choice and balance, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of choice and balance", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Two forces ask for balance. Do not rush the comparison. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "두 힘이 균형을 요구한다. 비교를 서두르지 마라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of choice and balance",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 82, money: 84, work: 76, mind: 80 }
  },
  {
    id: "minor_swords_three",
    arcana: "minor",
    title: { en: "Three of Swords", ko: "소드 3" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "growth and collaboration, mind, truth, conflict, decision", ko: "growth and collaboration, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of growth and collaboration", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Something grows through support, feedback, or early structure. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "무언가가 지지, 피드백, 초기 구조를 통해 자란다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of growth and collaboration",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 50, money: 67, work: 78, mind: 80 }
  },
  {
    id: "minor_swords_four",
    arcana: "minor",
    title: { en: "Four of Swords", ko: "소드 4" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "stability and pause, mind, truth, conflict, decision", ko: "stability and pause, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of stability and pause", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Stability matters now. Build a base before expansion. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "지금은 안정이 중요하다. 확장 전에 기반을 만들어라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of stability and pause",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 63, money: 50, work: 49, mind: 92 }
  },
  {
    id: "minor_swords_five",
    arcana: "minor",
    title: { en: "Five of Swords", ko: "소드 5" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "tension and challenge, mind, truth, conflict, decision", ko: "tension and challenge, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of tension and challenge", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A challenge exposes what needs correction. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "도전은 고쳐야 할 것을 드러낸다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of tension and challenge",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 54, money: 70, work: 73, mind: 56 }
  },
  {
    id: "minor_swords_six",
    arcana: "minor",
    title: { en: "Six of Swords", ko: "소드 6" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "movement and recovery, mind, truth, conflict, decision", ko: "movement and recovery, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of movement and recovery", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Recovery or progress is possible through a more generous view. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "더 너그러운 관점을 통해 회복이나 진전이 가능하다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of movement and recovery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 72, money: 57, work: 53, mind: 92 }
  },
  {
    id: "minor_swords_seven",
    arcana: "minor",
    title: { en: "Seven of Swords", ko: "소드 7" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "test and strategy, mind, truth, conflict, decision", ko: "test and strategy, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of test and strategy", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are being tested. Strategy matters more than force. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "시험대에 올랐다. 힘보다 전략이 중요하다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of test and strategy",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 66, money: 85, work: 78, mind: 61 }
  },
  {
    id: "minor_swords_eight",
    arcana: "minor",
    title: { en: "Eight of Swords", ko: "소드 8" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "motion and effort, mind, truth, conflict, decision", ko: "motion and effort, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of motion and effort", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Momentum builds through repetition and focused effort. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "반복과 집중된 노력으로 추진력이 생긴다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of motion and effort",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 85, money: 74, work: 61, mind: 71 }
  },
  {
    id: "minor_swords_nine",
    arcana: "minor",
    title: { en: "Nine of Swords", ko: "소드 9" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "threshold and resilience, mind, truth, conflict, decision", ko: "threshold and resilience, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of threshold and resilience", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are close to a threshold. Protect your energy. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "문턱에 가까워졌다. 에너지를 보호하라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of threshold and resilience",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 81, money: 65, work: 92, mind: 75 }
  },
  {
    id: "minor_swords_ten",
    arcana: "minor",
    title: { en: "Ten of Swords", ko: "소드 10" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "completion and burden, mind, truth, conflict, decision", ko: "completion and burden, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of completion and burden", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "The cycle is heavy because it is nearing completion. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "주기가 완성에 가까워져 무겁게 느껴진다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of completion and burden",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 73, money: 72, work: 59, mind: 53 }
  },
  {
    id: "minor_swords_page",
    arcana: "minor",
    title: { en: "Page of Swords", ko: "페이지 소드" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "message and beginner mind, mind, truth, conflict, decision", ko: "message and beginner mind, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of message and beginner mind", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A message or beginner energy arrives. Stay curious. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "메시지나 초심자의 에너지가 온다. 호기심을 유지하라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of message and beginner mind",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 64, money: 87, work: 72, mind: 74 }
  },
  {
    id: "minor_swords_knight",
    arcana: "minor",
    title: { en: "Knight of Swords", ko: "기사 소드" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "movement and pursuit, mind, truth, conflict, decision", ko: "movement and pursuit, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of movement and pursuit", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Movement accelerates. Aim your pursuit carefully. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "움직임이 빨라진다. 추구하는 방향을 신중히 조준하라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of movement and pursuit",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 54, money: 65, work: 91, mind: 60 }
  },
  {
    id: "minor_swords_queen",
    arcana: "minor",
    title: { en: "Queen of Swords", ko: "퀸 소드" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "maturity and inner mastery, mind, truth, conflict, decision", ko: "maturity and inner mastery, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of maturity and inner mastery", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Maturity comes through embodied understanding. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "체화된 이해를 통해 성숙이 온다. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of maturity and inner mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 59, money: 46, work: 55, mind: 57 }
  },
  {
    id: "minor_swords_king",
    arcana: "minor",
    title: { en: "King of Swords", ko: "킹 소드" },
    symbol: "⚔",
    luckyColor: "#94a3b8",
    keywords: {
      upright: { en: "leadership and mastery, mind, truth, conflict, decision", ko: "leadership and mastery, mind, truth, conflict, decision" },
      reversed: { en: "overthinking, harsh words, avoidance of truth, mental noise, shadow of leadership and mastery", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Lead the energy instead of being ruled by it. In the suit of Swords, this points to thoughts, words, truth, conflict, decision.",
        ko: "그 에너지에 지배되지 말고 이끌어라. 소드의 영역에서는 생각, 말, 진실, 갈등, 결정와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: overthinking, harsh words, avoidance of truth, mental noise, shadow of leadership and mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라."
      }
    },
    advice: {
      upright: { en: "Use clarity without cruelty.", ko: "잔인함 없이 명확함을 써라." },
      reversed: { en: "Watch for overthinking, harsh words, avoidance of truth, mental noise.", ko: "과thinking, 날카로운 말, 진실 회피, 정신적 소음을 경계하라." }
    },
    scores: { love: 88, money: 70, work: 74, mind: 47 }
  },
  {
    id: "minor_pentacles_ace",
    arcana: "minor",
    title: { en: "Ace of Pentacles", ko: "에이스 펜타클" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "new seed, money, body, work, material reality", ko: "new seed, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of new seed", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A new seed appears. Use the first spark before it fades. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "새 씨앗이 나타난다. 첫 불꽃이 사라지기 전에 써라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of new seed",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 82, money: 73, work: 60, mind: 76 }
  },
  {
    id: "minor_pentacles_two",
    arcana: "minor",
    title: { en: "Two of Pentacles", ko: "펜타클 2" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "choice and balance, money, body, work, material reality", ko: "choice and balance, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of choice and balance", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Two forces ask for balance. Do not rush the comparison. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "두 힘이 균형을 요구한다. 비교를 서두르지 마라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of choice and balance",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 71, money: 61, work: 88, mind: 86 }
  },
  {
    id: "minor_pentacles_three",
    arcana: "minor",
    title: { en: "Three of Pentacles", ko: "펜타클 3" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "growth and collaboration, money, body, work, material reality", ko: "growth and collaboration, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of growth and collaboration", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Something grows through support, feedback, or early structure. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "무언가가 지지, 피드백, 초기 구조를 통해 자란다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of growth and collaboration",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 83, money: 67, work: 86, mind: 78 }
  },
  {
    id: "minor_pentacles_four",
    arcana: "minor",
    title: { en: "Four of Pentacles", ko: "펜타클 4" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "stability and pause, money, body, work, material reality", ko: "stability and pause, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of stability and pause", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Stability matters now. Build a base before expansion. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "지금은 안정이 중요하다. 확장 전에 기반을 만들어라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of stability and pause",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 76, money: 73, work: 61, mind: 62 }
  },
  {
    id: "minor_pentacles_five",
    arcana: "minor",
    title: { en: "Five of Pentacles", ko: "펜타클 5" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "tension and challenge, money, body, work, material reality", ko: "tension and challenge, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of tension and challenge", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A challenge exposes what needs correction. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "도전은 고쳐야 할 것을 드러낸다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of tension and challenge",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 69, money: 56, work: 80, mind: 55 }
  },
  {
    id: "minor_pentacles_six",
    arcana: "minor",
    title: { en: "Six of Pentacles", ko: "펜타클 6" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "movement and recovery, money, body, work, material reality", ko: "movement and recovery, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of movement and recovery", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Recovery or progress is possible through a more generous view. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "더 너그러운 관점을 통해 회복이나 진전이 가능하다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of movement and recovery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 67, money: 58, work: 50, mind: 80 }
  },
  {
    id: "minor_pentacles_seven",
    arcana: "minor",
    title: { en: "Seven of Pentacles", ko: "펜타클 7" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "test and strategy, money, body, work, material reality", ko: "test and strategy, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of test and strategy", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are being tested. Strategy matters more than force. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "시험대에 올랐다. 힘보다 전략이 중요하다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of test and strategy",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 56, money: 47, work: 77, mind: 74 }
  },
  {
    id: "minor_pentacles_eight",
    arcana: "minor",
    title: { en: "Eight of Pentacles", ko: "펜타클 8" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "motion and effort, money, body, work, material reality", ko: "motion and effort, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of motion and effort", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Momentum builds through repetition and focused effort. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "반복과 집중된 노력으로 추진력이 생긴다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of motion and effort",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 65, money: 75, work: 76, mind: 57 }
  },
  {
    id: "minor_pentacles_nine",
    arcana: "minor",
    title: { en: "Nine of Pentacles", ko: "펜타클 9" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "threshold and resilience, money, body, work, material reality", ko: "threshold and resilience, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of threshold and resilience", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "You are close to a threshold. Protect your energy. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "문턱에 가까워졌다. 에너지를 보호하라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of threshold and resilience",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 78, money: 84, work: 84, mind: 90 }
  },
  {
    id: "minor_pentacles_ten",
    arcana: "minor",
    title: { en: "Ten of Pentacles", ko: "펜타클 10" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "completion and burden, money, body, work, material reality", ko: "completion and burden, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of completion and burden", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "The cycle is heavy because it is nearing completion. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "주기가 완성에 가까워져 무겁게 느껴진다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of completion and burden",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 50, money: 82, work: 61, mind: 75 }
  },
  {
    id: "minor_pentacles_page",
    arcana: "minor",
    title: { en: "Page of Pentacles", ko: "페이지 펜타클" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "message and beginner mind, money, body, work, material reality", ko: "message and beginner mind, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of message and beginner mind", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "A message or beginner energy arrives. Stay curious. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "메시지나 초심자의 에너지가 온다. 호기심을 유지하라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of message and beginner mind",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 54, money: 87, work: 61, mind: 83 }
  },
  {
    id: "minor_pentacles_knight",
    arcana: "minor",
    title: { en: "Knight of Pentacles", ko: "기사 펜타클" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "movement and pursuit, money, body, work, material reality", ko: "movement and pursuit, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of movement and pursuit", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Movement accelerates. Aim your pursuit carefully. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "움직임이 빨라진다. 추구하는 방향을 신중히 조준하라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of movement and pursuit",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 67, money: 49, work: 75, mind: 84 }
  },
  {
    id: "minor_pentacles_queen",
    arcana: "minor",
    title: { en: "Queen of Pentacles", ko: "퀸 펜타클" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "maturity and inner mastery, money, body, work, material reality", ko: "maturity and inner mastery, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of maturity and inner mastery", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Maturity comes through embodied understanding. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "체화된 이해를 통해 성숙이 온다. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of maturity and inner mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 70, money: 58, work: 66, mind: 66 }
  },
  {
    id: "minor_pentacles_king",
    arcana: "minor",
    title: { en: "King of Pentacles", ko: "킹 펜타클" },
    symbol: "◆",
    luckyColor: "#22c55e",
    keywords: {
      upright: { en: "leadership and mastery, money, body, work, material reality", ko: "leadership and mastery, money, body, work, material reality" },
      reversed: { en: "delay, waste, insecurity, poor planning, material imbalance, shadow of leadership and mastery", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    meaning: {
      upright: {
        en: "Lead the energy instead of being ruled by it. In the suit of Pentacles, this points to money, work, body, time, real-world results.",
        ko: "그 에너지에 지배되지 말고 이끌어라. 펜타클의 영역에서는 돈, 일, 몸, 시간, 현실 결과와 연결된다."
      },
      reversed: {
        en: "The reversed side asks you to slow down, correct the imbalance, and avoid repeating the shadow pattern: delay, waste, insecurity, poor planning, material imbalance, shadow of leadership and mastery",
        ko: "역방향은 속도를 늦추고 불균형을 바로잡으며 그림자 패턴을 반복하지 말라고 말한다: 지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라."
      }
    },
    advice: {
      upright: { en: "Make it practical enough to survive the day.", ko: "오늘을 버틸 만큼 실용적으로 만들어라." },
      reversed: { en: "Watch for delay, waste, insecurity, poor planning, material imbalance.", ko: "지연, 낭비, 불안, 계획 부족, 현실 균형 붕괴을 경계하라." }
    },
    scores: { love: 74, money: 78, work: 83, mind: 49 }
  }
];

const MAJOR_TITLE_I18N: Record<string, Record<string, string>> = {
  ja: { fool:"愚者", magician:"魔術師", high_priestess:"女教皇", empress:"女帝", emperor:"皇帝", hierophant:"教皇", lovers:"恋人", chariot:"戦車", strength:"力", hermit:"隠者", wheel:"運命の輪", justice:"正義", hanged_man:"吊るされた男", death:"死神", temperance:"節制", devil:"悪魔", tower:"塔", star:"星", moon:"月", sun:"太陽", judgement:"審判", world:"世界" },
  zh: { fool:"愚者", magician:"魔术师", high_priestess:"女祭司", empress:"女皇", emperor:"皇帝", hierophant:"教皇", lovers:"恋人", chariot:"战车", strength:"力量", hermit:"隐士", wheel:"命运之轮", justice:"正义", hanged_man:"倒吊人", death:"死神", temperance:"节制", devil:"恶魔", tower:"高塔", star:"星星", moon:"月亮", sun:"太阳", judgement:"审判", world:"世界" },
  es: { fool:"El Loco", magician:"El Mago", high_priestess:"La Sacerdotisa", empress:"La Emperatriz", emperor:"El Emperador", hierophant:"El Hierofante", lovers:"Los Enamorados", chariot:"El Carro", strength:"La Fuerza", hermit:"El Ermitaño", wheel:"La Rueda de la Fortuna", justice:"La Justicia", hanged_man:"El Colgado", death:"La Muerte", temperance:"La Templanza", devil:"El Diablo", tower:"La Torre", star:"La Estrella", moon:"La Luna", sun:"El Sol", judgement:"El Juicio", world:"El Mundo" },
  fr: { fool:"Le Mat", magician:"Le Magicien", high_priestess:"La Papesse", empress:"L’Impératrice", emperor:"L’Empereur", hierophant:"Le Pape", lovers:"Les Amoureux", chariot:"Le Chariot", strength:"La Force", hermit:"L’Ermite", wheel:"La Roue de Fortune", justice:"La Justice", hanged_man:"Le Pendu", death:"La Mort", temperance:"Tempérance", devil:"Le Diable", tower:"La Maison Dieu", star:"L’Étoile", moon:"La Lune", sun:"Le Soleil", judgement:"Le Jugement", world:"Le Monde" },
  de: { fool:"Der Narr", magician:"Der Magier", high_priestess:"Die Hohepriesterin", empress:"Die Herrscherin", emperor:"Der Herrscher", hierophant:"Der Hierophant", lovers:"Die Liebenden", chariot:"Der Wagen", strength:"Die Kraft", hermit:"Der Eremit", wheel:"Rad des Schicksals", justice:"Gerechtigkeit", hanged_man:"Der Gehängte", death:"Der Tod", temperance:"Mäßigkeit", devil:"Der Teufel", tower:"Der Turm", star:"Der Stern", moon:"Der Mond", sun:"Die Sonne", judgement:"Gericht", world:"Die Welt" },
  pt: { fool:"O Louco", magician:"O Mago", high_priestess:"A Sacerdotisa", empress:"A Imperatriz", emperor:"O Imperador", hierophant:"O Hierofante", lovers:"Os Enamorados", chariot:"O Carro", strength:"A Força", hermit:"O Eremita", wheel:"A Roda da Fortuna", justice:"A Justiça", hanged_man:"O Enforcado", death:"A Morte", temperance:"A Temperança", devil:"O Diabo", tower:"A Torre", star:"A Estrela", moon:"A Lua", sun:"O Sol", judgement:"O Julgamento", world:"O Mundo" }
};
const SUIT_I18N: Record<string, Record<string, string>> = {
  ja:{wands:"ワンド",cups:"カップ",swords:"ソード",pentacles:"ペンタクル"}, zh:{wands:"权杖",cups:"圣杯",swords:"宝剑",pentacles:"星币"}, es:{wands:"Bastos",cups:"Copas",swords:"Espadas",pentacles:"Oros"}, fr:{wands:"Bâtons",cups:"Coupes",swords:"Épées",pentacles:"Deniers"}, de:{wands:"Stäbe",cups:"Kelche",swords:"Schwerter",pentacles:"Münzen"}, pt:{wands:"Paus",cups:"Copas",swords:"Espadas",pentacles:"Ouros"}
};
const RANK_I18N: Record<string, Record<string, string>> = {
  ja:{ace:"エース",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",ten:"10",page:"ペイジ",knight:"ナイト",queen:"クイーン",king:"キング"}, zh:{ace:"王牌",two:"二",three:"三",four:"四",five:"五",six:"六",seven:"七",eight:"八",nine:"九",ten:"十",page:"侍从",knight:"骑士",queen:"王后",king:"国王"}, es:{ace:"As",two:"Dos",three:"Tres",four:"Cuatro",five:"Cinco",six:"Seis",seven:"Siete",eight:"Ocho",nine:"Nueve",ten:"Diez",page:"Sota",knight:"Caballero",queen:"Reina",king:"Rey"}, fr:{ace:"As",two:"Deux",three:"Trois",four:"Quatre",five:"Cinq",six:"Six",seven:"Sept",eight:"Huit",nine:"Neuf",ten:"Dix",page:"Valet",knight:"Chevalier",queen:"Reine",king:"Roi"}, de:{ace:"Ass",two:"Zwei",three:"Drei",four:"Vier",five:"Fünf",six:"Sechs",seven:"Sieben",eight:"Acht",nine:"Neun",ten:"Zehn",page:"Bube",knight:"Ritter",queen:"Königin",king:"König"}, pt:{ace:"Ás",two:"Dois",three:"Três",four:"Quatro",five:"Cinco",six:"Seis",seven:"Sete",eight:"Oito",nine:"Nove",ten:"Dez",page:"Valete",knight:"Cavaleiro",queen:"Rainha",king:"Rei"}
};
const TEXT_I18N: Record<string, any> = {
  en:{upright:"Upright",reversed:"Reversed",major:"Major Arcana",minor:"Minor Arcana",auraU:"This card asks for clear attention, steady action, and honest reflection.",auraR:"This reversed card warns against avoidance, imbalance, or repeating the same pattern.",mission:"Take one useful action today instead of looking for another sign.",warning:"Do not force the interpretation to fit what you already want."},
  ko:{upright:"정방향",reversed:"역방향",major:"메이저 아르카나",minor:"마이너 아르카나",auraU:"이 카드는 분명한 관찰, 안정적인 행동, 솔직한 성찰을 요구한다.",auraR:"역방향은 회피, 불균형, 반복되는 패턴을 경고한다.",mission:"다른 신호를 찾기보다 오늘 할 수 있는 행동 하나를 해라.",warning:"이미 원하는 답에 해석을 억지로 맞추지 마라."},
  ja:{upright:"正位置",reversed:"逆位置",major:"大アルカナ",minor:"小アルカナ",auraU:"このカードは明確な観察、落ち着いた行動、正直な内省を求めています。",auraR:"逆位置は回避、不均衡、同じパターンの繰り返しに注意を促します。",mission:"別のサインを探すより、今日できる行動を一つ選びましょう。",warning:"望む答えに合わせて解釈を曲げないでください。"},
  zh:{upright:"正位",reversed:"逆位",major:"大阿卡那",minor:"小阿卡那",auraU:"这张牌要求清晰观察、稳定行动和诚实反思。",auraR:"逆位提醒你避免逃避、失衡或重复旧模式。",mission:"不要再寻找另一个信号，今天先做一个有用的行动。",warning:"不要把解释强行套进你想要的答案。"},
  es:{upright:"Derecha",reversed:"Invertida",major:"Arcano Mayor",minor:"Arcano Menor",auraU:"Esta carta pide atención clara, acción estable y reflexión honesta.",auraR:"La carta invertida advierte sobre evasión, desequilibrio o patrones repetidos.",mission:"Haz una acción útil hoy en vez de buscar otra señal.",warning:"No fuerces la interpretación para que diga lo que quieres."},
  fr:{upright:"Endroit",reversed:"Renversée",major:"Arcane Majeur",minor:"Arcane Mineur",auraU:"Cette carte demande une attention claire, une action stable et une réflexion honnête.",auraR:"La carte renversée avertit contre l’évitement, le déséquilibre ou les schémas répétés.",mission:"Fais une action utile aujourd’hui au lieu de chercher un autre signe.",warning:"Ne force pas l’interprétation pour confirmer ce que tu veux."},
  de:{upright:"Aufrecht",reversed:"Umgekehrt",major:"Große Arkana",minor:"Kleine Arkana",auraU:"Diese Karte verlangt klare Aufmerksamkeit, ruhiges Handeln und ehrliche Reflexion.",auraR:"Die umgekehrte Karte warnt vor Ausweichen, Ungleichgewicht oder alten Mustern.",mission:"Tue heute eine nützliche Sache, statt nach einem weiteren Zeichen zu suchen.",warning:"Biege die Deutung nicht so, dass sie nur deinen Wunsch bestätigt."},
  pt:{upright:"Normal",reversed:"Invertida",major:"Arcano Maior",minor:"Arcano Menor",auraU:"Esta carta pede atenção clara, ação firme e reflexão honesta.",auraR:"A carta invertida alerta para fuga, desequilíbrio ou repetição de padrões.",mission:"Faça uma ação útil hoje em vez de procurar outro sinal.",warning:"Não force a interpretação para caber no que você quer ouvir."}
};

function localTitle(card: TarotCardBase, lang: SupportedCardLang) {
  if (lang === "ko" || lang === "en") return card.title[lang === "ko" ? "ko" : "en"];
  if (card.arcana === "major") {
    const key = card.id.replace(/^major_\\d+_/, "");
    return MAJOR_TITLE_I18N[lang]?.[key] || card.title.en;
  }
  const parts = card.id.split("_");
  const suit = parts[1];
  const rank = parts[2];
  const s = SUIT_I18N[lang]?.[suit] || suit;
  const r = RANK_I18N[lang]?.[rank] || rank;
  if (lang === "es" || lang === "fr" || lang === "pt") return `${r} de ${s}`;
  if (lang === "de") return `${r} der ${s}`;
  return `${s} ${r}`;
}

export function getTarotText(card: TarotCardBase, lang: SupportedCardLang, reversed: boolean) {
  const baseLang = lang === "ko" ? "ko" : "en";
  const direction = reversed ? "reversed" : "upright";
  const ui = TEXT_I18N[lang] || TEXT_I18N.en;
  if (lang === "ko" || lang === "en") {
    return {
      title: card.title[baseLang],
      subtitle: reversed ? `${ui.reversed} · ${card.keywords.reversed[baseLang]}` : `${ui.upright} · ${card.keywords.upright[baseLang]}`,
      aura: card.meaning[direction][baseLang],
      tone: card.advice.upright[baseLang],
      warning: card.advice.reversed[baseLang],
      mission: card.advice.upright[baseLang],
      archetype: card.arcana === "major" ? ui.major : ui.minor
    };
  }
  return {
    title: localTitle(card, lang),
    subtitle: `${reversed ? ui.reversed : ui.upright} · ${card.keywords[direction].en}`,
    aura: reversed ? ui.auraR : ui.auraU,
    tone: ui.mission,
    warning: ui.warning,
    mission: ui.mission,
    archetype: card.arcana === "major" ? ui.major : ui.minor
  };
}
