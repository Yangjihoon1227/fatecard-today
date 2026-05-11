# FateCard.today v6 다음 순서

## 1. 로컬 최종 확인
PowerShell에서:

```powershell
cd "$env:USERPROFILE\Desktop\fatecard_today_v6\fatecard_today_v6"; npm.cmd install --registry=https://registry.npmjs.org/; npm.cmd run dev
```

확인:
- 카드 1회 뽑기
- 새로고침 후 같은 날 다시 못 뽑는지
- 언어 변경
- 공유 카드 저장
- 공유하기 버튼
- X에 공유 버튼
- 링크 복사 버튼

## 2. 임시 공개 배포
Render/Railway/Fly.io/VPS 중 하나에 배포합니다.

Render 기준:
- Build Command: `npm install --registry=https://registry.npmjs.org/ && npm run build`
- Start Command: `npm run start`
- Environment:
  - SITE_URL = Render 임시 공개 URL
  - VITE_SITE_URL = Render 임시 공개 URL
  - SPONSOR_EMAIL = tbvjrkrh@gmail.com
  - VITE_SPONSOR_EMAIL = tbvjrkrh@gmail.com

## 3. X 게시 전 확인
임시 공개 주소가 생기면:

```text
https://임시주소/api/health
https://임시주소/api/metrics
```

이 두 주소가 열리는지 확인합니다.

## 4. X 게시 문구

```text
I built FateCard.today — one daily fate card, one draw per day.

Pick your language, draw today’s card, and share the result.
What did you get today?

🔮 Try it:
[PUBLIC_URL]

#buildinpublic #indiehackers #AI #fortune #webapp
```

한국어:

```text
FateCard.today 만들었습니다.

하루에 한 번만 뽑을 수 있는 오늘의 운명카드입니다.
언어별 시간대 기준으로 00시에 초기화되고, 결과 카드는 저장/공유할 수 있습니다.

🔮 테스트:
[PUBLIC_URL]
```

## 5. 반응 있으면
- fatecard.today 도메인 구매
- SITE_URL / VITE_SITE_URL을 https://fatecard.today 로 변경
- DB 연동으로 JSON 파일 저장 방식 교체
- 공유용 OG 이미지 추가
- 카드 종류 50~100개로 확장
