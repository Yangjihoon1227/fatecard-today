# Visitor Counter Verification

검증일: 2026-05-11 KST

## 테스트 결과

로컬 Node API 서버(`server.cjs --api-only`)를 실행한 뒤 쿠키 세션을 나누어 테스트했습니다.

## 시나리오

1. 세션 A 첫 방문
   - totalPageViews: 1
   - uniqueVisitors: 1
   - todayPageViews: 1
   - todayUniqueVisitors: 1

2. 세션 A 새로고침/재방문
   - totalPageViews: 2
   - uniqueVisitors: 1
   - todayPageViews: 2
   - todayUniqueVisitors: 1

3. 세션 B 첫 방문
   - totalPageViews: 3
   - uniqueVisitors: 2
   - todayPageViews: 3
   - todayUniqueVisitors: 2

4. 세션 A 카드 첫 draw
   - draws: 1
   - allowed: true

5. 세션 A 같은 날 두 번째 draw
   - draws: 1 유지
   - allowed: false
   - 기존 cardId 반환

6. share API 호출
   - shares: 1 증가

## 결론

방문자수/고유 방문자/오늘 방문/1일 1카드 잠금/공유 카운트는 현재 서버 쿠키 기준으로 정상 작동합니다.

## 한계

- 쿠키 삭제, 시크릿 모드, 다른 브라우저는 새 방문자로 잡힐 수 있습니다.
- 봇 트래픽 필터링은 없습니다.
- 실제 상용 운영에서는 DB와 분석 도구를 붙이는 것이 맞습니다.
