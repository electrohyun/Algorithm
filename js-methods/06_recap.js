// ============================================================
// Day 6 — 총복습  "내가 틀렸던 것만" 10선   ★JS 손풀기 마지막★
// ============================================================
// 규칙: 각 함수 몸통을 직접 채운다. 다 채우면  node js-methods/06_recap.js
//       스텁은 비워두면 FAIL 로 뜬다. 답은 안 적혀있음 — 반사신경 체크용.
//
// 이 10개는 새 문제가 아니라, Day1~5 에서 내가 실제로 틀린 지점 저격이다.
//   d1  [Day1] 배열에 trim 쓰지 말기 (trim은 문자열 전용)
//   d2  [Day1] split 결과는 배열 / map은 "함수"를 인자로 받는다
//   d3  [Day2] 빈도 세기 reduce  (그때 d9 틀림)
//   d4  [Day3] includes 에 콜백 넣지 말기 (값을 받는다) / 첫 원소는 find
//   d5  [Day4] push/unshift 는 "길이"를 반환한다 (배열 아님!)
//   d6  [Day5] 중복 제거 — Set 은 new 필수
//   d7  [Day5] 고유 원소 개수 — filter 체이닝
//   d8  [Day5] 교집합 — Set.has
//   d9  [Day5] ⭐첫 중복 원소 — seen 빈 통 → has 조회 → add. Set엔 indexOf 없음
//   d10 [Day5] 빈도 내림차순 고유 문자 — Object.entries 배열화 → sort → 키만
// ============================================================

// ── d1) [Day1] "  10 20 30  "  ->  [10, 20, 30] ──
//   함정: trim 은 문자열에! 배열에 trim 쓰다 틀렸었다.
function d1(raw) {
  return raw.trim().split(" ").map(Number);
}

// ── d2) [Day1] "1,2,3,4"  ->  10  (합) ──
//   함정: split(',') 결과는 배열. map 은 함수를 인자로 받는다.
function d2(raw) {
  return raw
    .split(",")
    .map(Number)
    .reduce((acc, cur, _) => acc + cur);
}

// ── d3) [Day2] ["a","b","a","c","a"]  ->  {a:3, b:1, c:1}  (빈도 세기) ──
//   reduce 로. (그때 d9_method 틀렸던 거)
function d3(arr) {
  return arr.reduce((acc, cur, idx) => {
    acc[cur] = (acc[cur] ?? 0) + 1;

    return acc;
  }, {});
}

// ── d4) [Day3] 배열에 target 이 "있나?" → true/false ──
//   함정: includes 는 값을 받는다. 콜백(some) 넣지 말기.
function d4(arr, target) {
  return arr.includes(target);
}

// ── d5) [Day4] arr 끝에 x 를 붙인 "배열"을 돌려줘라.  ([1,2], 3) -> [1,2,3] ──
//   함정: push 는 길이(3)를 반환한다. 배열을 돌려주려면?
function d5(arr, x) {
  return [...arr, x];
}

// ── d6) [Day5] [1,2,2,3,3,3]  ->  [1,2,3]  (중복 제거, 순서 유지) ──
//   함정: Set 은 new 필수.
function d6(arr) {
  return [...new Set(arr)];
}

// ── d7) [Day5] [1,2,2,3,1]  ->  3  (고유 원소 "개수") ──
//   filter 체이닝. (indexOf 관용구)
function d7(arr) {
  // return new Set(arr).size;

  return arr.filter((item, idx) => arr.indexOf(item) === idx).length;
}

// ── d8) [Day5] 교집합.  ([1,2,3,4], [2,4,6])  ->  [2,4] ──
//   b 를 Set 으로 만들고 a 를 filter. (has)
function d8(a, b) {
  const set = new Set(b);

  return a.filter((item) => set.has(item));
}

// ── d9) [Day5] ⭐첫 중복 원소.  [2,1,3,1,4,2]  ->  1  (없으면 -1) ──
//   앞에서부터 보다가 "이미 본 값" 처음 만나면 그게 답.
//   seen 은 빈 통으로 시작 → has 로 조회 → add. Set엔 indexOf 없다!
function d9(arr) {
  const set = new Set();

  for (const element of arr) {
    if (set.has(element)) return element;
    set.add(element);
  }

  return -1;
}

// ── d10) [Day5] "a b a c b a"  ->  ["a","b","c"]  (빈도 내림차순 고유 문자) ──
//   split → 빈도 세기 → Object.entries 로 배열화 → count 내림차순 sort → 키만 map.
function d10(raw) {
  return Object.entries(
    raw.split(" ").reduce((acc, cur, idx) => {
      acc[cur] = (acc[cur] ?? 0) + 1;

      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
}

// ============================================================
// 채점기 (건드리지 말 것)
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
const cases = [
  ["d1", () => d1("  10 20 30  "), [10, 20, 30]],
  ["d2", () => d2("1,2,3,4"), 10],
  ["d3", () => d3(["a", "b", "a", "c", "a"]), { a: 3, b: 1, c: 1 }],
  ["d4a", () => d4([1, 2, 3, 4], 3), true],
  ["d4b", () => d4([1, 2, 3, 4], 9), false],
  ["d5", () => d5([1, 2], 3), [1, 2, 3]],
  ["d6", () => d6([1, 2, 2, 3, 3, 3]), [1, 2, 3]],
  ["d7", () => d7([1, 2, 2, 3, 1]), 3],
  ["d8", () => d8([1, 2, 3, 4], [2, 4, 6]), [2, 4]],
  ["d9a", () => d9([2, 1, 3, 1, 4, 2]), 1],
  ["d9b", () => d9([1, 2, 3]), -1],
  ["d10", () => d10("a b a c b a"), ["a", "b", "c"]],
];

let pass = 0;
for (const [name, run, want] of cases) {
  let got, ok;
  try {
    got = run();
    ok = eq(got, want);
  } catch (e) {
    got = "ERROR: " + e.message;
    ok = false;
  }
  if (ok) pass++;
  console.log(
    `${ok ? "✅" : "❌"} ${name.padEnd(4)}  기대 ${JSON.stringify(want)}  ->  받음 ${JSON.stringify(got)}`,
  );
}
console.log(`\n${pass}/${cases.length} 통과`);
