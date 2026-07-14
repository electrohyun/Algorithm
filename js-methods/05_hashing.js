// ============================================================
// Day 5 — 해싱  Set / Map / 객체(dict) / 2D 배열   ★마지막 날★
// ============================================================
// 오늘 방식: day4 처럼 두 덩어리.
//   [1~6 생성·집계]  for + 객체(seen) 로 먼저 → Set/Map/reduce 한 줄로.  (_for / _method)
//   [7~10 응용]      Set/Map 이 진짜 힘 쓰는 문제. comparator/그룹핑 집중. (_method 만)
//
// [ 눈에 익히기 — 치트시트 ] --------------------------------
//
//  ● Set : "중복 없는 값 주머니". 존재 확인 O(1).
//    const s = new Set([1,2,2,3])   -> {1,2,3}  (중복 자동 제거)
//    s.has(2)   -> true             있냐? (배열 includes 보다 빠름)
//    s.add(9)   -> s 에 9 추가
//    s.size     -> 3                개수 (배열은 .length, Set/Map 은 .size!)
//    [...s]     -> [1,2,3]          다시 배열로
//    ※ 중복 제거 한 줄:  [...new Set(arr)]
//
//  ● Map : "키→값 사전". 키가 아무 타입이나 OK, 순서 보존.
//    const m = new Map()
//    m.set('a', 1)   -> 값 넣기 (같은 키면 덮어씀)
//    m.get('a')      -> 1        (없으면 undefined)
//    m.has('a')      -> true
//    m.size          -> 1
//    for (const [k, v] of m) {...}          키·값 순회
//    ※ 빈도수 패턴:  m.set(k, (m.get(k) ?? 0) + 1)
//
//  ● 객체(dict) : 키가 "문자열/숫자" 뿐이면 그냥 {} 로도 충분.
//    const o = {}
//    o[key] = (o[key] ?? 0) + 1              빈도수
//    key in o        -> 있냐?   (o[key] !== undefined 도 됨)
//    Object.keys(o)   -> ['a','b']           키 배열
//    Object.values(o) -> [3, 2]              값 배열
//    Object.entries(o)-> [['a',3],['b',2]]   [키,값] 쌍 배열
//    ※ Set/Map vs 객체:  키가 객체/혼합타입이거나 순서 중요 → Map. 아니면 {} 로 충분.
//
//  ● 2D 배열 ★함정★ : n×m 격자
//    (O)  Array.from({length:n}, () => Array(m).fill(0))
//    (X)  Array(n).fill(Array(m).fill(0))   ← 한 줄을 n번 "공유"! 한 칸 바꾸면 다 바뀜
//    grid[r][c]     -> r행 c열 접근
//
//  ● 의도 → 도구 대응표
//     중복 제거 / 있나 확인        →  Set  ( [...new Set(a)] , s.has(x) )
//     개수 세기(빈도수)            →  {} 또는 Map  ( o[k] = (o[k]??0)+1 )
//     키→값 매핑, 순서·키타입 자유  →  Map
//     격자(2D)                    →  Array.from({length:n}, () => Array(m).fill(0))
//
// [ 손에 익히기 ] -------------------------------------------
// 1~6 은 _for(객체/for로) 와 _method(Set/Map/reduce) 둘 다,
// 7~10 은 _method 만 채워라.  다 채우면:  node js-methods/05_hashing.js
// ============================================================

// ── 드릴 1) 중복 제거.  [1,2,2,3,3,3]  ->  [1,2,3]  (원본 순서 유지) ──
function d1_for(arr) {
  const answer = [];

  for (const element of arr) {
    if (answer.includes(element)) {
      continue;
    }
    answer.push(element);
  }

  return answer;
}
function d1_method(arr) {
  // 중요: Array는 되는데, Set은 왜 new Set? 기억하기
  return [...new Set(arr)];
}

// ── 드릴 2) 고유 원소 개수.  [1,2,2,3,1]  ->  3 ── (for는 쉬운데, 체이닝 어려웠다)
function d2_for(arr) {
  // const answer = [];

  // for (const element of arr) {
  //   if (answer.includes(element)) {
  //     continue;
  //   }

  //   answer.push(element);
  // }

  // return answer.length;

  return arr.filter((item, idx) => arr.indexOf(item) === idx).length;
}
function d2_method(arr) {
  return new Set(arr).size;
}

// ── 드릴 3) 빈도수 세기.  "aababc"  ->  {a:3, b:2, c:1} ──
function d3_for(str) {
  const answer = {};

  for (const element of str.split("")) {
    if (element in answer) {
      answer[element] += 1;
      continue;
    }

    answer[element] = 1;
  }

  return answer;
}
function d3_method(str) {
  return str.split("").reduce((acc, cur, idx) => {
    // if (!acc[cur]) {
    //   acc[cur] = 1;
    // } else {
    //   acc[cur] += 1;
    // }

    acc[cur] = (acc[cur] ?? 0) + 1;

    return acc;
  }, {});
}

// ── 드릴 4) 두 배열 교집합.  [1,2,3,4],[2,4,6]  ->  [2,4]  (a 순서 유지) ──
function d4_for(a, b) {
  const answer = [];

  for (const element of a) {
    if (b.includes(element)) {
      answer.push(element);
    }
  }

  return answer;
}
function d4_method(a, b) {
  // 틀림
  // TODO: const set = new Set(b);  a.filter(x => set.has(x))
  const set = new Set(b);
  return a.filter((item) => set.has(item));
}

// ── 드릴 5) 두 배열 합집합(중복없이).  [1,2,3],[2,3,4]  ->  [1,2,3,4] ──
function d5_for(a, b) {
  const answer = [];

  const temp = [...a, ...b];

  for (const element of temp) {
    if (answer.includes(element)) continue;

    answer.push(element);
  }

  return answer;
}
function d5_method(a, b) {
  return [...new Set([...a, ...b])];
}

// ── 드릴 6) n×m 격자를 0으로.  n=2, m=3  ->  [[0,0,0],[0,0,0]] ──
//   ※ Array(n).fill(Array(m).fill(0)) 은 함정! 한 줄을 공유한다.
function d6_for(n, m) {
  const answer = [];

  for (let i = 0; i < n; i++) {
    answer.push([]);
    for (let j = 0; j < m; j++) {
      answer[i].push(0);
    }
  }

  return answer;
}
function d6_method(n, m) {
  return Array.from({ length: n }, (_, i) => Array(m).fill(0));
}

// ── 드릴 7) 최빈값(가장 많이 나온 문자).  "aababc"  ->  "a" ──
//   (빈도 세고 → 최대값 키 찾기)
function d7_method(str) {
  const answer = {};
  // TODO: 빈도 객체 만든 뒤 Object.entries 를 count 내림차순 정렬해서 [0][0]
  for (const element of str.split("")) {
    answer[element] = (answer[element] ?? 0) + 1;
  }

  return Object.entries(answer).sort((a, b) => b[1] - a[1])[0][0];
}

// ── 드릴 8) 첫 중복 원소.  [2,1,3,1,4,2]  ->  1  (없으면 -1) ──
//   (앞에서부터 보다가 "이미 본 값" 처음 만나는 순간 그게 답) 복습필수!
function d8_method(arr) {
  const set = new Set();

  // for (const element of arr) {
  //   const prevIndex = set.size;
  //   set.add(element);
  //   const nextIndex = set.size;

  //   if (prevIndex + 1 !== nextIndex) return element;
  // }

  for (const element of arr) {
    if (set.has(element)) return element; // 넣기 전에 "이미 봤어?" → 있으면 첫 중복
    set.add(element); // 처음 보는 거면 통에 넣고 계속
  }

  return -1;
}

// ── 드릴 9) 홀짝 그룹핑.  [1,2,3,4,5]  ->  {odd:[1,3,5], even:[2,4]} ──
function d9_method(arr) {
  const odd = [],
    even = [];

  for (const element of arr) {
    if (element % 2 !== 0) {
      odd.push(element);
      continue;
    }

    even.push(element);
  }

  return { odd: odd, even: even };
}

// ── 드릴 10) 종합: "a b a c b a" -> 빈도 내림차순 고유 문자 -> ["a","b","c"] ──
//   (split → 빈도 세기 → entries 를 count 내림차순 정렬 → 키만 뽑기) 살짝 아쉬움
function d10_method(raw) {
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
// 채점기 (건드리지 마) — node로 실행하면 ✅/❌ 뜬다
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// [드릴번호, 입력(배열이면 인자 여러개), 정답]
const cases = [
  [1, [[1, 2, 2, 3, 3, 3]], [1, 2, 3]],
  [2, [[1, 2, 2, 3, 1]], 3],
  [3, ["aababc"], { a: 3, b: 2, c: 1 }],
  [
    4,
    [
      [1, 2, 3, 4],
      [2, 4, 6],
    ],
    [2, 4],
  ],
  [
    5,
    [
      [1, 2, 3],
      [2, 3, 4],
    ],
    [1, 2, 3, 4],
  ],
  [
    6,
    [2, 3],
    [
      [0, 0, 0],
      [0, 0, 0],
    ],
  ],
  [7, ["aababc"], "a"],
  [8, [[2, 1, 3, 1, 4, 2]], 1],
  [9, [[1, 2, 3, 4, 5]], { odd: [1, 3, 5], even: [2, 4] }],
  [10, ["a b a c b a"], ["a", "b", "c"]],
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
      got = fn(...input);
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
