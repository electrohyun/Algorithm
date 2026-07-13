// ============================================================
// Day 4 — 배열 조작 + 정렬  push / shift / Array.from / fill / sort
// ============================================================
// 오늘 방식: 두 덩어리로 나뉜다.
//   [1~6 생성·조작]  어제처럼 for로 먼저 → method 한 줄로.  (_for / _method)
//   [7~10 정렬]      sort 는 for로 직접 구현하면 배꼽이 배보다 커진다.
//                    → for버전 없이 comparator "한 줄"에만 집중. (_method 만)
//
// [ 눈에 익히기 — 치트시트 ] --------------------------------
//
//  ● push / pop      : 뒤에 추가 / 뒤에서 빼기   (스택 = push + pop)
//    a.push(9)   -> a 끝에 9 추가,   반환값은 "새 길이"
//    a.pop()     -> 마지막 원소 빼서 "그 값" 반환
//
//  ● unshift / shift : 앞에 추가 / 앞에서 빼기   (큐 = push + shift)
//    a.unshift(0)-> a 맨앞에 0 추가, 반환값은 "새 길이"
//    a.shift()   -> 첫 원소 빼서 "그 값" 반환
//    ※ push/unshift 는 길이를 돌려주지 값을 안 돌려준다. 헷갈림 주의.
//
//  ● Array.from     : "규칙으로 배열 만들기". 0..n-1, 1..n, 초기화 등
//    Array.from({length:5}, (_, i) => i)     -> [0,1,2,3,4]
//    Array.from({length:5}, (_, i) => i + 1) -> [1,2,3,4,5]
//    (짧은 버전:  [...Array(5).keys()]        -> [0,1,2,3,4])
//
//  ● fill           : "같은 값으로 채우기"
//    Array(4).fill(0)                        -> [0,0,0,0]
//    new Array(3).fill(7)                    -> [7,7,7]
//
//  ● sort ★오늘의 핵심★ : comparator 없으면 "문자열"로 비교한다(=버그)
//    [3,1,2,10].sort()               -> [1, 10, 2, 3]  ← 함정! (사전순)
//    [3,1,2,10].sort((a,b) => a - b) -> [1, 2, 3, 10]  오름차순
//    [3,1,2,10].sort((a,b) => b - a) -> [10, 3, 2, 1]  내림차순
//    ※ a-b 가 음수면 a가 앞. "작은 게 앞으로" = 오름차순. b-a 는 반대.
//    ※ sort 는 "원본을 바꾼다(mutate)". 원본 지키려면  [...arr].sort(...)
//    ※ 문자열/객체:  arr.sort((a,b) => a.length - b.length)  처럼 뽑아서 빼기
//
//  ● 의도 → 메서드 대응표
//     뒤에 붙이기 / 빼기        →  push / pop
//     앞에 붙이기 / 빼기        →  unshift / shift
//     0..n-1, 규칙 배열 만들기  →  Array.from({length:n}, (_,i)=>...)
//     같은 값으로 채우기        →  Array(n).fill(v)
//     숫자 정렬                →  sort((a,b) => a - b)   ← 오름
//     숫자 역정렬               →  sort((a,b) => b - a)   ← 내림
//
// [ 손에 익히기 ] -------------------------------------------
// 1~6 은 _for 와 _method 둘 다, 7~10 은 _method 만 채워라.
// 다 채우면:  node js-methods/04_array-ops.js
// ============================================================

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
  // TODO: Array(n).fill(0)
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
  // TODO: Array.from(... i + 1)
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

// ============================================================
// 채점기 (건드리지 마) — node로 실행하면 ✅/❌ 뜬다
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// [드릴번호, 입력, 정답]
const cases = [
  [1, 5, [0, 1, 2, 3, 4]],
  [2, 4, [0, 0, 0, 0]],
  [3, 5, [1, 2, 3, 4, 5]],
  [4, 3, [3, 6, 9, 12, 15, 18, 21, 24, 27]],
  [5, [1, 2, 3, 4], [4, 3, 2, 1]],
  [6, [2, 3, 4], [0, 2, 3, 4, 99]],
  [7, [3, 1, 2, 10, 5], [1, 2, 3, 5, 10]],
  [8, [3, 1, 2, 10, 5], [10, 5, 3, 2, 1]],
  [9, ["bbb", "a", "cc", "dddd"], ["a", "cc", "bbb", "dddd"]],
  [10, "5 3 8 1 9 2", [9, 8, 5]],
];
// 드릴마다 [라벨, 함수] 목록. 1~6은 두 개, 7~10은 method 하나.
const fns = {
  1: [
    ["for   ", d1_for],
    ["method", d1_method],
  ],
  2: [
    ["for   ", d2_for],
    ["method", d2_method],
  ],
  3: [
    ["for   ", d3_for],
    ["method", d3_method],
  ],
  4: [
    ["for   ", d4_for],
    ["method", d4_method],
  ],
  5: [
    ["for   ", d5_for],
    ["method", d5_method],
  ],
  6: [
    ["for   ", d6_for],
    ["method", d6_method],
  ],
  7: [["method", d7_method]],
  8: [["method", d8_method]],
  9: [["method", d9_method]],
  10: [["method", d10_method]],
};
let pass = 0,
  total = 0;
for (const [n, input, want] of cases) {
  for (const [kind, fn] of fns[n]) {
    total++;
    let got;
    try {
      got = fn(input);
    } catch (e) {
      got = "에러: " + e.message;
    }
    const ok = eq(got, want);
    if (ok) pass++;
    console.log(
      `${ok ? "✅" : "❌"} d${n} [${kind}]  got=${JSON.stringify(got)}  want=${JSON.stringify(want)}`,
    );
  }
}
console.log(`\n${pass}/${total} 통과`);
