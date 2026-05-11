# 도메인 구매 전 배포 순서

1. GitHub 새 저장소 생성
2. 이 프로젝트 업로드
3. Render 또는 Railway에서 Node 서비스 생성
4. Build Command: npm install --registry=https://registry.npmjs.org/ && npm run build
5. Start Command: npm run start
6. 환경변수:
   - SITE_URL = Render/Railway 임시 공개 URL
   - VITE_SITE_URL = Render/Railway 임시 공개 URL
   - SPONSOR_EMAIL = tbvjrkrh@gmail.com
   - VITE_SPONSOR_EMAIL = tbvjrkrh@gmail.com
7. 배포 후 /api/metrics 확인
8. 카드 뽑기, 새로고침, 1일 1회 잠금 확인
9. 공유 문구에 임시 공개 주소가 들어가는지 확인
10. fatecard.today 구매 후 SITE_URL/VITE_SITE_URL만 https://fatecard.today 로 변경

주의:
- Render 무료 플랜은 잠자기/디스크 유지 조건을 확인해야 합니다.
- 장기 운영은 외부 DB가 필요합니다.
