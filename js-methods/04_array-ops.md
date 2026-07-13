# JS 손풀기 Day4 배열 조작 + 정렬 (push / shift / Array.from / fill / sort)

배열 만들기(Array.from / fill), 앞뒤 조작(unshift / push), 그리고 오늘의 핵심 sort comparator까지. 드릴 자체는 금방 끝났는데 중간에 CS로 크게 샜다 — `new`(Array vs new Array), 1급 객체, `new Function`, mutate vs 원본 보존까지. 재밌어서 오히려 이날이 제일 기억에 남을 듯.

## 문제

```ts
// ── 드릴 1) 0부터 n-1까지.  n=5  ->  [0,1,2,3,4] ──
function d1_for(n) {
  const answer = [];

  for (let i = 0; i < n; i++) {
    answer.push(i);
  }

  return answer;
}
function d1_method(n) {
  return Array.from({ length: n }, (_, i) => i);
}

// ── 드릴 2) n칸을 전부 0으로.  n=4  ->  [0,0,0,0] ──
function d2_for(n) {
  const answer = [];

  for (let i = 0; i < n; i++) {
    answer.push(0);
  }

  return answer;
}
function d2_method(n) {
  return Array(n).fill(0);
}

// ── 드릴 3) 1부터 n까지.  n=5  ->  [1,2,3,4,5] ──
function d3_for(n) {
  const answer = [];

  for (let i = 1; i <= n; i++) {
    answer.push(i);
  }

  return answer;
}
function d3_method(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

// ── 드릴 4) n단 구구단 결과.  n=3  ->  [3,6,9,12,15,18,21,24,27] ──
function d4_for(n) {
  const answer = [];

  for (let i = 1; i < 10; i++) {
    answer.push(n * i);
  }

  return answer;
}
function d4_method(n) {
  return Array.from({ length: 9 }, (_, i) => n * (i + 1));
}

// ── 드릴 5) 뒤집기.  [1,2,3,4]  ->  [4,3,2,1]  (원본 안 건드리기) ──
function d5_for(arr) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    answer.push(arr[arr.length - 1 - i]);
  }

  return answer;
}
function d5_method(arr) {
  return [...arr].reverse();
}

// ── 드릴 6) 앞에 0, 뒤에 99 붙이기.  [2,3,4]  ->  [0,2,3,4,99] ──
function d6_for(arr) {
  const answer = [...arr];

  answer.unshift(0);
  answer.push(99);

  return answer;
}
function d6_method(arr) {
  return [0, ...arr, 99];
}

// ── 드릴 7) 숫자 오름차순.  [3,1,2,10,5]  ->  [1,2,3,5,10] ──
//   ※ 그냥 sort() 하면 [1,10,2,3,5] 나온다. comparator 필수!
function d7_method(arr) {
  return [...arr].sort((a, b) => a - b);
}

// ── 드릴 8) 숫자 내림차순.  [3,1,2,10,5]  ->  [10,5,3,2,1] ──
function d8_method(arr) {
  return [...arr].sort((a, b) => b - a);
}

// ── 드릴 9) 문자열 길이 오름차순.  ["bbb","a","cc","dddd"]  ->  ["a","cc","bbb","dddd"] ──
function d9_method(arr) {
  return [...arr].sort((a, b) => a.length - b.length);
}

// ── 드릴 10) 종합: "5 3 8 1 9 2" -> 내림차순 정렬 후 상위 3개 -> [9,8,5] ──
//   (split → map(Number) → sort 내림차순 → slice(0,3))
function d10_method(raw) {
  const answer = raw
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 3);

  return answer;
}
```

## 회고

오늘의 발견:

- fill은 채워준다.
- from은 배열의 길이, 내용물까지 책임져주는 든든한 메서드

잘한 점:

- 5분 안에 풀었다.

불확실한 점:

- unshift는 길이를 반환한다고 한다. 실제 문제 풀때 적용하다가 헷갈릴 듯하다.

내일부터:

- 5일차 화이팅!!!
