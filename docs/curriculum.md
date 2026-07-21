# 알고리즘 훈련 커리큘럼 (유형별)

> 목적: 유형을 **의존성 순서**로 쌓는다 — 앞 유형이 뒤 유형의 재료가 되도록.
> 대상 병목: 알고리즘 자체보다 **사고 → JS 코드** 번역. 그래서 앞부분은 "새 개념"보다 "손에 붙이기"가 목적이고, Phase 4부터 성격이 *발상* 중심으로 바뀐다.
> BFS/DFS는 재료(스택·큐, 재귀)가 먼저라 후반부에 놓인다.

문제는 프로그래머스 기준. 순서대로 가도 되고 끌리는 것부터 해도 되지만, **Phase 간 순서는 지키는 게 이득**이다.

---

## Phase 1 — 기초 체력 (알고리즘 X, JS 반사력 O)

| # | 유형 | JS로 연습되는 것 | 대표 문제 |
|---|---|---|---|
| 1 | 문자열·배열·구현/시뮬레이션 | `split/map/filter/join`, 인덱스 다루기 | [120822 문자열 뒤집기](https://school.programmers.co.kr/learn/courses/30/lessons/120822), [12931 자릿수 더하기](https://school.programmers.co.kr/learn/courses/30/lessons/12931) |
| 2 | 정렬 + comparator | `sort((a,b)=>...)`, 다중 키 정렬 | [42748 K번째수](https://school.programmers.co.kr/learn/courses/30/lessons/42748), [12915 문자열 내 마음대로 정렬하기](https://school.programmers.co.kr/learn/courses/30/lessons/12915) |
| 3 | 해싱 (Set/Map/객체) | 카운팅·중복·조회 O(1) | [42576 완주하지 못한 선수](https://school.programmers.co.kr/learn/courses/30/lessons/42576), [1845 폰켓몬](https://school.programmers.co.kr/learn/courses/30/lessons/1845) |

## Phase 2 — 탐색의 뼈대

| # | 유형 | JS로 연습되는 것 | 대표 문제 |
|---|---|---|---|
| 4 | 완전탐색 (브루트포스) | 경우의 수를 *나열*하는 감각 (모든 탐색의 부모) | [42840 모의고사](https://school.programmers.co.kr/learn/courses/30/lessons/42840), [42842 카펫](https://school.programmers.co.kr/learn/courses/30/lessons/42842) |
| 5 | 그리디 | 정렬 + 탐욕적 선택 | [42862 체육복](https://school.programmers.co.kr/learn/courses/30/lessons/42862), [42883 큰 수 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/42883) |
| 6 | 스택·큐·덱 | 자료구조 자체 (BFS=큐 / DFS=스택의 재료) | [42586 기능개발](https://school.programmers.co.kr/learn/courses/30/lessons/42586), [42583 다리를 지나는 트럭](https://school.programmers.co.kr/learn/courses/30/lessons/42583) |

## Phase 3 — 배열 위 최적화 (한 단계 도약)

| # | 유형 | JS로 연습되는 것 | 대표 문제 |
|---|---|---|---|
| 7 | 투포인터 / 슬라이딩 윈도우 | 두 인덱스로 구간 훑기 | [12980 점프와 순간 이동](https://school.programmers.co.kr/learn/courses/30/lessons/12980), [연속된 부분 수열의 합](https://school.programmers.co.kr/learn/courses/30/lessons/178870) |
| 8 | 이분탐색 (정렬이 전제) | 탐색 범위 반씩 줄이기, `parametric search` | [43238 입국심사](https://school.programmers.co.kr/learn/courses/30/lessons/43238) |

## Phase 4 — 상태공간 탐색 (여기서 "진짜 알고리즘" 시작)

| # | 유형 | JS로 연습되는 것 | 대표 문제 |
|---|---|---|---|
| 9 | 재귀 / 백트래킹 | DFS의 뿌리. 순열·조합·부분집합으로 몸풀기 | [42839 소수 찾기](https://school.programmers.co.kr/learn/courses/30/lessons/42839), [87946 피로도](https://school.programmers.co.kr/learn/courses/30/lessons/87946) |
| 10 | **BFS / DFS (그래프 탐색)** | 방문 배열, 큐/스택, 인접 리스트 | [43162 네트워크](https://school.programmers.co.kr/learn/courses/30/lessons/43162), [43165 타겟 넘버](https://school.programmers.co.kr/learn/courses/30/lessons/43165) |

## Phase 5 — 보스급

| # | 유형 | JS로 연습되는 것 | 대표 문제 |
|---|---|---|---|
| 11 | DP (동적계획법) | 완전탐색(4) + 메모이제이션(3, 9) | [12900 2 x n 타일링](https://school.programmers.co.kr/learn/courses/30/lessons/12900), [43105 정수 삼각형](https://school.programmers.co.kr/learn/courses/30/lessons/43105) |
| 12 | 심화 (필요할 때 곁가지) | 다익스트라·유니온파인드·트리 순회 | 상황에 따라 |

---

## 이 순서의 논리

- **4 → 9 → 10 → 11** 이 한 줄기다. 완전탐색으로 "나열"을 배우고 → 재귀로 "상태공간"을 배우고 → 그래프에서 BFS/DFS로 구조화하고 → DP에서 그걸 최적화. BFS/DFS가 후반인 이유.
- **Phase 1~2** 는 알고리즘보다 JS 반사력 굳히기. 현재 병목(사고→JS)에 직접 대응.
- **Phase 4 부터 성격이 바뀐다** — JS 문법이 아니라 *발상*이 병목이 됨.

## 관문 (게이트)

- **Phase 3~4 경계**: 프로그래머스 [43162 네트워크](https://school.programmers.co.kr/learn/courses/30/lessons/43162)를 **AI 없이 재구현**. 통과하면 BFS/DFS 본격 진입.

## 현재 위치 (2026-07-21 기준)

문자열/정렬/해싱/완전탐색/그리디 완료 → **Phase 1~2 거의 완료.**
다음 스텝: **스택·큐(6)** → **재귀/백트래킹(9)** → 예정대로 **BFS/DFS(10)**.
