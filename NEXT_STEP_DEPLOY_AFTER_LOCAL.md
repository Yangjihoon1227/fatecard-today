# FateCard.today v11 다음 단계

## 1. 로컬에서 먼저 확인

확인 기준:
- 카드 뽑기 후 카드가 버튼을 가리지 않는지
- 공유하기/공유 카드 저장 버튼이 카드 아래에 정상 표시되는지
- 공유하기 클릭 시 SNS 아이콘 모달만 뜨는지
- 카드 본문이 스크롤로 끝까지 보이는지
- 같은 날 다시 뽑기가 막히는지

## 2. 로컬 확인 후 임시 공개 배포

localhost는 본인 PC에서만 접속됩니다. X에 올리려면 Render/Railway/Fly.io/VPS 같은 공개 주소가 필요합니다.

Render 기준 설정:
- Build Command: `npm install --registry=https://registry.npmjs.org/ && npm run build`
- Start Command: `npm run start`
- Environment:
  - SITE_URL = Render 임시 공개 URL
  - VITE_SITE_URL = Render 임시 공개 URL
  - SPONSOR_EMAIL = tbvjrkrh@gmail.com
  - VITE_SPONSOR_EMAIL = tbvjrkrh@gmail.com

## 3. 공개 배포 후 확인 URL

```text
https://임시공개주소/api/health
https://임시공개주소/api/metrics
```

## 4. X 첫 게시 문구

```text
I built FateCard.today — one tarot card per day.

78 tarot cards, upright/reversed meanings, one draw per local day, multilingual UI, and shareable result cards.

Try it:
[PUBLIC_URL]

#buildinpublic #tarot #webapp #indiehackers
```

한국어:

```text
FateCard.today 만들었습니다.

하루에 한 번만 뽑을 수 있는 오늘의 타로 카드입니다.
78장 전체 타로 덱, 정방향/역방향 해석, 언어별 시간대 초기화, 공유 카드 기능을 넣었습니다.

테스트:
[PUBLIC_URL]
```

## 5. 반응 있으면

- fatecard.today 도메인 구매
- SITE_URL / VITE_SITE_URL을 https://fatecard.today 로 변경
- JSON 저장을 Supabase/Postgres 같은 DB로 교체
- 카드 디자인 에셋을 Nano Banana 이미지로 교체
- 카드 해석을 8개 언어 전체 고품질 번역으로 확장
