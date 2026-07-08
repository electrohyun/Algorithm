# JS 손풀기 (JS Methods)    

목표: 알고리즘 실력이 아니라 **"머릿속 논리 → JS 코드" 번역 반사신경**.
알고리즘은 C++로 됨. 문제는 생각을 JS로 못 옮기는 것.

## 하는 법 (매일)

1. **눈에 익히기** — 그날 파일 위쪽 치트시트를 읽는다. (손 X)
2. **손에 익히기** — 드릴 10개를 직접 채운다. `node js-methods/파일.js`로 채점.
3. **적용(선택)** — 아는 쉬운 문제 1개를 그날 메서드로.

드릴 10개는 필수, 추가는 선택.

## 커리큘럼 (평일 5일)

| Day | 파일 | 주제 |
|---|---|---|
| 1 | `01_io-parsing.js` | 입출력 파싱 `split` `map(Number)` `slice` `trim` `join` |
| 2 | `02_transform.js` | 변환 3대장 `map` `filter` `reduce` |
| 3 | `03_search.js` | 탐색계 `find` `findIndex` `some` `every` `includes` |
| 4 | `04_array-ops.js` | 배열 조작 + 정렬 `push` `shift` `Array.from` `fill` `sort` |
| 5 | `05_hashing.js` | 해싱 `Set` `Map` 객체 2D 배열 |

## 마무리

5일 뒤 BOJ 2606을 **AI 없이** 처음부터 재구현 → 반사신경 체크.

## 의도 → 메서드 (핵심 표)

| 하고 싶은 생각 | 메서드 |
|---|---|
| 각 원소를 바꿔서 새 배열 | `map` |
| 조건 맞는 것만 골라 새 배열 | `filter` |
| 다 합쳐서 값 하나로 | `reduce` |
| 조건 맞는 첫 원소 | `find` |
| 조건 맞는 첫 인덱스 | `findIndex` |
| 하나라도 맞나? | `some` |
| 전부 맞나? | `every` |
| 포함되어 있나? | `includes` |
| 정렬 (숫자는 comparator 필수!) | `sort((a,b)=>a-b)` |
