// ============================================================
// Day 1 — 입출력 파싱
// ============================================================
// 백준 첫 줄에서 막히던 그 벽. 문자열로 들어온 입력을
// 원하는 숫자/배열 구조로 바꾸는 연습.
//
// [ 눈에 익히기 — 치트시트 ] --------------------------------
//
//  "5".trim()                  -> "5"        // 앞뒤 공백/개행 제거
//  Number("5")                 -> 5          // 문자열 -> 숫자
//  "3 5".split(" ")            -> ["3","5"]  // 공백 기준 자르기
//  "a\nb".split("\n")          -> ["a","b"]  // 줄 기준 자르기
//  ["3","5"].map(Number)       -> [3, 5]     // 각 원소를 숫자로
//  [1,2,3,4].slice(1)          -> [2,3,4]    // 인덱스 1부터 끝까지
//  [1,2,3,4].slice(1,3)        -> [2,3]      // 1 이상 3 미만
//  [1,2,3].join(" ")           -> "1 2 3"    // 배열 -> 문자열(공백)
//  [1,2,3].join("\n")          -> "1\n2\n3"  // 배열 -> 문자열(줄바꿈)
//  const [a,b] = [3,5]         // a=3, b=5   // 구조분해 할당
//
//  * 실제 백준 입력 한 덩어리(참고용, 여기선 raw 문자열로 대체):
//    const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
//
// [ 손에 익히기 — 드릴 10개 ] -------------------------------
// 각 함수의 TODO를 채워라. 다 채우면:  node js-methods/01_io-parsing.js
// ============================================================

// 드릴 1) 한 줄에 정수 하나. raw="5"  ->  숫자 5
function d1(raw) {
  return Number(raw);
}

// 드릴 2) 공백으로 구분된 두 정수. raw="3 5"  ->  [3, 5]
function d2(raw) {
  return raw.split(" ").map(Number);
}

// 드릴 3) 공백으로 구분된 정수들. raw="1 2 3 4 5"  ->  [1,2,3,4,5]
function d3(raw) {
  return raw.split(" ").map(Number);
}

// 드릴 4) 여러 줄 정수. raw="10\n20\n30"  ->  [10,20,30]
function d4(raw) {
  return raw.split("\n").map(Number);
}

// 드릴 5) 앞뒤 공백/개행 제거 후 숫자. raw="  42\n"  ->  42 체크
function d5(raw) {
  return Number(raw.trim().split("\n"));
}

// 드릴 6) 첫 줄은 개수 N, 그 다음 줄들은 "a b" 간선. 모르겠다...
//   raw="3\n1 2\n3 4\n5 6"  ->  [[1,2],[3,4],[5,6]]
//   힌트: split("\n") -> slice(1) -> map(줄 => 줄 나눠서 숫자배열)
function d6(raw) {
  return raw
    .split("\n")
    .slice(1)
    .map((slice) => slice.split(" ").map(Number));
}

// 드릴 7) 첫 줄 "N M"을 구조분해로 받아 객체로. raw="7 6"  ->  {n:7, m:6}
function d7(raw) {
  const [n, m] = raw.split(" ").map(Number);
  return { n, m };
}

// 드릴 8) 숫자 배열을 공백 문자열로. arr=[1,2,3]  ->  "1 2 3"
function d8(arr) {
  return arr.join(" ");
}

// 드릴 9) 숫자 배열을 줄바꿈 문자열로. arr=[1,2,3]  ->  "1\n2\n3"
function d9(arr) {
  return arr.join("\n");
}

// 드릴 10) 종합: 첫 줄 N, 둘째 줄에 공백구분 정수 N개. 그 정수 배열 반환.
//   raw="3\n10 20 30"  ->  [10,20,30]
function d10(raw) {
  return raw.split("\n").slice(1)[0].split(" ").map(Number);
}

// ============================================================
// 채점기 (건드리지 마) — node로 실행하면 ✅/❌ 뜬다
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
const tests = [
  ["d1", d1("5"), 5],
  ["d2", d2("3 5"), [3, 5]],
  ["d3", d3("1 2 3 4 5"), [1, 2, 3, 4, 5]],
  ["d4", d4("10\n20\n30"), [10, 20, 30]],
  ["d5", d5("  42\n"), 42],
  [
    "d6",
    d6("3\n1 2\n3 4\n5 6"),
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
  ],
  ["d7", d7("7 6"), { n: 7, m: 6 }],
  ["d8", d8([1, 2, 3]), "1 2 3"],
  ["d9", d9([1, 2, 3]), "1\n2\n3"],
  ["d10", d10("3\n10 20 30"), [10, 20, 30]],
];
let pass = 0;
for (const [name, got, want] of tests) {
  const ok = eq(got, want);
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "❌"} ${name}  got=${JSON.stringify(got)}  want=${JSON.stringify(want)}`,
  );
}
console.log(`\n${pass}/${tests.length} 통과`);
