# 문제 추천 목록 (BFS/DFS 이전, JS 손풀기 · 프로그래머스판)

> 목적: 새 알고리즘 학습이 아니라, **이미 아는 쉬운 문제를 JS로 반사적으로 풀기.**
> 백준 섭종으로 프로그래머스로 전환. 입력 파싱(`readline`) 없이 `function solution()` 채우기 → 알고리즘·JS 문법에 더 집중됨.
> 하루 3~4개면 충분. 막히면 힌트로 (답 스포 X).

## 목요일 — 문자열 · 정렬 · 구현 (손 다시 데우기)

| 번호 | 문제 | Lv | JS로 연습되는 것 |
|---|---|---|---|
| 120822 | [문자열 뒤집기](https://school.programmers.co.kr/learn/courses/30/lessons/120822) | 0 | `split('').reverse().join('')` |
| 42748 | [K번째수](https://school.programmers.co.kr/learn/courses/30/lessons/42748) | 1 | `slice` + `sort((a,b)=>a-b)` comparator |
| 12915 | [문자열 내 마음대로 정렬하기](https://school.programmers.co.kr/learn/courses/30/lessons/12915) | 1 | 다중 키 정렬 (comparator 심화) |
| 42576 | [완주하지 못한 선수](https://school.programmers.co.kr/learn/courses/30/lessons/42576) | 1 | `Map`/객체 해싱 + 카운팅 |

## 금요일 — 완전탐색 · 그리디 (실버, 개념은 알지)

| 번호 | 문제 | Lv | JS로 연습되는 것 |
|---|---|---|---|
| 42840 | [모의고사](https://school.programmers.co.kr/learn/courses/30/lessons/42840) | 1 | 완전탐색, 반복 + 조건 필터 |
| 42862 | [체육복](https://school.programmers.co.kr/learn/courses/30/lessons/42862) | 1 | 그리디, 배열 순회 |
| 42883 | [큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883) | 2 | 그리디, 스택/`while` |
| 42842 | [카펫](https://school.programmers.co.kr/learn/courses/30/lessons/42842) | 2 | 완전탐색, 약수 순회 |

## 고르는 법

- 순서대로 가도 되고, 끌리는 것부터 해도 됨.
- 정렬 comparator / Set·Map 은 드릴에서 씨름했던 것 → 실전으로 한 번 더 굳히기.
- 완전탐색·그리디 는 BFS 가기 직전 "루프·조건·자료구조" JS 워밍업.

## 다음 단계

- 이 이틀 끝나면 → 커리큘럼 최종 관문: **BOJ 2606(→ 프로그래머스 [네트워크 43162]) 을 AI 없이 재구현**.
- 그 후 BFS/DFS 등 후반 개념 진입.
