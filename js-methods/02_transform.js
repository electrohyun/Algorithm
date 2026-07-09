// ============================================================
// Day 2 — 변환 3대장  map / filter / reduce
// ============================================================
// 오늘 방식: 문제 하나를 "두 번" 푼다.
//   A) for...of 로 먼저 풀어서 로직을 완성한다  (C++ 사고 그대로)
//   B) 같은 걸 map/filter/reduce 한 줄로 줄여본다
//   → 둘 다 ✅ 뜨면 "같은 일을 다른 문법으로 한 것"이 손에 박힌다.
//
// [ 눈에 익히기 — 치트시트 ] --------------------------------
//
//  ● for...of  : C++의  for (auto x : arr)  와 같음. 값을 하나씩 x로 받음.
//    const result = [];
//    for (const x of arr) { result.push(x * 2); }   // 하나씩 담기
//
//  ● map    : "매번 push(변환값)" 패턴 → 같은 길이 새 배열
//    [1,2,3].map(x => x * 2)                 -> [2, 4, 6]
//
//  ● filter : "if(조건) push(x)" 패턴 → 조건 통과만
//    [1,2,3,4].filter(x => x % 2 === 0)      -> [2, 4]
//
//  ● reduce : "누적변수 += ..." 패턴 → 값 하나로 접기
//    [1,2,3,4].reduce((acc, x) => acc + x, 0)   -> 10
//    (acc = accumulator 누적값, x = currentValue 지금 원소. 매번 새 acc를 return!)
//
//  ● 변환 대응표
//     result.push(변환값)        →  map
//     if(조건) result.push(x)    →  filter
//     누적 += / 누적[x] = ...     →  reduce
//
// [ 손에 익히기 ] -------------------------------------------
// 각 드릴마다 _for 와 _method 두 함수를 채워라.
// 다 채우면:  node js-methods/02_transform.js
// ============================================================

// ── 드릴 1) 각 수를 2배로.  [1,2,3]  ->  [2,4,6] ──
function d1_for(arr) {
  // TODO: for...of 로. (const result=[]; 돌면서 result.push(x*2); return result;)

  const result = [];

  for (const element of arr) {
    result.push(element * 2);
  }

  return result;
}
function d1_method(arr) {
  return arr.map((item) => item * 2);
}

// ── 드릴 2) 각 수를 제곱으로.  [1,2,3,4]  ->  [1,4,9,16] ──
function d2_for(arr) {
  const result = [];

  for (const element of arr) {
    result.push(element * element);
  }

  return result;
}
function d2_method(arr) {
  return arr.map((item) => item * item);
}

// ── 드릴 3) 짝수만 남겨라.  [1,2,3,4,5,6]  ->  [2,4,6] ──
function d3_for(arr) {
  const result = [];

  for (const element of arr) {
    if (element % 2 !== 0) continue;

    result.push(element);
  }

  return result;
}
function d3_method(arr) {
  return arr.filter((item) => item % 2 === 0);
}

// ── 드릴 4) 3보다 큰 것만.  [1,5,2,8,3,9]  ->  [5,8,9] ──
function d4_for(arr) {
  const result = [];

  for (const element of arr) {
    if (element <= 3) continue;

    result.push(element);
  }

  return result;
}
function d4_method(arr) {
  return arr.filter((item) => item > 3);
}

// ── 드릴 5) 전부 더한 합.  [1,2,3,4,5]  ->  15 ──
function d5_for(arr) {
  let result = 0;

  for (const element of arr) {
    result += element;
  }

  return result;
}
function d5_method(arr) {
  return arr.reduce((acc, item) => acc + item, 0);
}

// ── 드릴 6) 최댓값.  [3,1,4,1,5,9,2,6]  ->  9 ──
function d6_for(arr) {
  let max = 0;

  for (const element of arr) {
    if (element > max) max = element;
  }

  return max;
}
function d6_method(arr) {
  return arr.reduce((acc, item) => Math.max(acc, item), arr[0]);
}

// ── 드릴 7) 짝수만 골라 2배.  [1,2,3,4,5,6]  ->  [4,8,12] ──
function d7_for(arr) {
  const result = [];

  for (const element of arr) {
    if (element % 2 === 0) result.push(element * 2);
  }

  return result;
}
function d7_method(arr) {
  return arr.filter((item) => item % 2 === 0).map((item) => item * 2);
}

// ── 드릴 8) 짝수의 "개수".  [1,2,3,4,5,6]  ->  3 ──
function d8_for(arr) {
  let result = 0;

  for (const element of arr) {
    if (element % 2 === 0) result++;
  }

  return result;
}
function d8_method(arr) {
  return arr.filter((item) => item % 2 === 0).length;
}

// ── 드릴 9) 빈도 세기(객체).  ["a","b","a","c","a"]  ->  {a:3,b:1,c:1} ──
function d9_for(arr) {
  const result = {};

  for (const element of arr) {
    if (!result[element]) result[element] = 1;
    else result[element] += 1;
  }

  return result;
}
function d9_method(arr) {
  // 틀림 ㅠㅠ
  return arr.reduce((acc, item) => {
    acc[item] ? (acc[item] += 1) : (acc[item] = 1);
    return acc;
  }, {});
}

// ── 드릴 10) 종합: "1 2 3 4 5 6" -> 홀수만 골라 제곱해서 합 -> 35 ──
//   (1 + 9 + 25 = 35)
function d10_for(raw) {
  let result = 0;

  for (const element of raw) {
    if (element % 2 === 0) continue;

    result += element * element;
  }

  return result;
}
function d10_method(raw) {
  return raw
    .split(" ") // split 깜빡함
    .filter((item) => item % 2 !== 0)
    .map((item) => item * item)
    .reduce((acc, item) => acc + item, 0);
}

// ============================================================
// 채점기 (건드리지 마) — node로 실행하면 ✅/❌ 뜬다
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// [드릴번호, 입력, 정답]
const cases = [
  [1, [1, 2, 3], [2, 4, 6]],
  [2, [1, 2, 3, 4], [1, 4, 9, 16]],
  [3, [1, 2, 3, 4, 5, 6], [2, 4, 6]],
  [4, [1, 5, 2, 8, 3, 9], [5, 8, 9]],
  [5, [1, 2, 3, 4, 5], 15],
  [6, [3, 1, 4, 1, 5, 9, 2, 6], 9],
  [7, [1, 2, 3, 4, 5, 6], [4, 8, 12]],
  [8, [1, 2, 3, 4, 5, 6], 3],
  [9, ["a", "b", "a", "c", "a"], { a: 3, b: 1, c: 1 }],
  [10, "1 2 3 4 5 6", 35],
];
const fns = {
  1: [d1_for, d1_method],
  2: [d2_for, d2_method],
  3: [d3_for, d3_method],
  4: [d4_for, d4_method],
  5: [d5_for, d5_method],
  6: [d6_for, d6_method],
  7: [d7_for, d7_method],
  8: [d8_for, d8_method],
  9: [d9_for, d9_method],
  10: [d10_for, d10_method],
};
let pass = 0,
  total = 0;
for (const [n, input, want] of cases) {
  for (const [kind, fn] of [
    ["for   ", fns[n][0]],
    ["method", fns[n][1]],
  ]) {
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
