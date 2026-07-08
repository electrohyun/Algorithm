// ============================================================
// Day 1 — 입출력 파싱 (세트 2 · 인출 연습)
// ============================================================
// 규칙: 위 치트시트 없음. 안 보고 먼저 떠올려라.
//       진짜 막히면 파일 "맨 아래" 치트시트를 슬쩍 봐.
//       채점:  node js-methods/01b_io-parsing-set2.js
// ============================================================

// 드릴 1) 한 줄에 정수 하나. raw="42"  ->  42
function d1(raw) {
  return Number(raw);
}

// 드릴 2) 공백으로 구분된 두 정수. raw="8 2"  ->  [8, 2]
function d2(raw) {
  return raw.split(" ").map(Number);
}

// 드릴 3) 공백으로 구분된 정수들. raw="9 8 7 6"  ->  [9,8,7,6]
function d3(raw) {
  return raw.split(" ").map(Number);
}

// 드릴 4) 여러 줄 정수. raw="5\n15\n25\n35"  ->  [5,15,25,35]
function d4(raw) {
  return raw.split("\n").map(Number);
}

// 드릴 5) 앞뒤 공백/개행 제거 후 숫자. raw="\n  100  \n"  ->  100
function d5(raw) {
  // return raw.split("\n").trim().map(Number);
  return Number(raw.trim());
}

// 드릴 6) 첫 줄은 개수 N, 다음 줄들은 "a b" 간선. 모르겠다.
//   raw="2\n10 20\n30 40"  ->  [[10,20],[30,40]]
function d6(raw) {
  return raw.split("\n").slice(1).map((item) => item.split(" ").map(Number))
}

// 드릴 7) 첫 줄 "N M"을 구조분해로 받아 객체로. raw="3 9"  ->  {n:3, m:9}
function d7(raw) {
  const [n, m] = raw.split(" ").map(Number);
  return { n, m };
}

// 드릴 8) 숫자 배열을 공백 문자열로. arr=[5,6,7]  ->  "5 6 7" 답 봤음
function d8(arr) {
  return String(arr.join(" "));
}

// 드릴 9) 숫자 배열을 줄바꿈 문자열로. arr=[4,5]  ->  "4\n5"
function d9(arr) {
  return String(arr.join("\n"));
}

// 드릴 10) 종합: 첫 줄 N, 둘째 줄에 공백구분 정수 N개. 그 정수 배열 반환.
//   raw="4\n2 4 6 8"  ->  [2,4,6,8]
function d10(raw) {
  // return raw.split("\n").slice(1).split(" ").map(Number); // "2 4 6 8"
  return raw.split("\n").slice(1)[0].split(" ").map(Number)
}

// ============================================================
// 채점기 (건드리지 마)
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
const tests = [
  ["d1", d1("42"), 42],
  ["d2", d2("8 2"), [8, 2]],
  ["d3", d3("9 8 7 6"), [9, 8, 7, 6]],
  ["d4", d4("5\n15\n25\n35"), [5, 15, 25, 35]],
  ["d5", d5("\n  100  \n"), 100],
  [
    "d6",
    d6("2\n10 20\n30 40"),
    [
      [10, 20],
      [30, 40],
    ],
  ],
  ["d7", d7("3 9"), { n: 3, m: 9 }],
  ["d8", d8([5, 6, 7]), "5 6 7"],
  ["d9", d9([4, 5]), "4\n5"],
  ["d10", d10("4\n2 4 6 8"), [2, 4, 6, 8]],
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

// ============================================================
// ↓↓↓ 막힐 때만 보는 치트시트 (먼저 안 보고 풀기!) ↓↓↓
// ============================================================
//  "5".trim()              -> "5"        // 앞뒤 공백/개행 제거
//  Number("5")             -> 5          // 문자열 -> 숫자
//  "3 5".split(" ")        -> ["3","5"]  // 공백 기준 자르기
//  "a\nb".split("\n")      -> ["a","b"]  // 줄 기준 자르기
//  ["3","5"].map(Number)   -> [3, 5]     // 각 원소를 숫자로
//  [1,2,3,4].slice(1)      -> [2,3,4]    // 인덱스 1부터 끝까지
//  ["10 20"][0]            -> "10 20"    // 배열에서 첫 원소 꺼내기
//  [1,2,3].join(" ")       -> "1 2 3"    // 배열 -> 문자열(공백)
//  [1,2,3].join("\n")      -> "1\n2\n3"  // 배열 -> 문자열(줄바꿈)
//  const [n, m] = [3,9]    // n=3, m=9   // 배열: 순서로 꺼냄
//  return {n, m}           // {n:3,m:9}  // 객체로 반환(축약)
// ============================================================
