# FateCard.today v12

문구를 두 줄 기준으로 정리하고, UI 움직임/고급감을 강화한 버전입니다.

## v12 수정 사항

- 메인 문구를 짧은 2줄 구조로 변경
  - English: One card. / Today’s fate.
  - 한국어: 하루 한 장, / 오늘의 운명카드.
- 애매하게 1~2글자 때문에 줄이 밀리는 문제 완화
- 명시적 줄 분리 렌더링 적용
- 고급 오라클 배경 SVG 추가
- 배경 aura 애니메이션 추가
- 떠다니는 심볼/궤도 심볼 애니메이션 추가
- 카드 부유 모션 추가
- 카드 빛 반사 효과 추가
- 버튼 hover 모션 추가
- reduced-motion 대응
- Nano Banana용 UI 폴리시 프롬프트팩 추가

## 추가 파일

```text
public/assets/fatecard-luxury-oracle-bg.svg
NANO_BANANA_UI_POLISH_PROMPTS.md
UI_COPY_MOTION_VERIFICATION_V12.md
```

## 로컬 실행

```powershell
cd "$env:USERPROFILE\Desktop\fatecard_today_v12\fatecard_today_v12"; npm.cmd install --registry=https://registry.npmjs.org/; npm.cmd run dev
```

접속:

```text
http://localhost:5173
```

## 확인할 것

- 메인 문구가 자연스러운 2줄로 보이는지
- 카드/배경이 은은하게 움직이는지
- 움직임이 과하지 않은지
- 카드 결과와 공유 버튼이 겹치지 않는지
- 공유 기능이 유지되는지


## v15

- Full feature portal UI localization
- Chained feature interactions
- Localized non-English card labels/fallback readings
- Journal/copy/interpreter chaining


## v17

- Fixed FEATURE_UI TypeScript build error from v15/v16
- Keeps v16 copyright-safe original tarot artwork


## v19

- Direct click/touch tarot drawing flow
- Interpretation appears after all required cards are selected
- Menu-first feature selection
- Removed low-value tools from visitor UI
- Richer Korean reading blocks and localized UI for 8 languages
- Public-domain-inspired original tarot SVG artwork
- Copyright/content policy documentation
