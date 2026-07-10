// ============================================================
// Day 3 — 탐색계  find / findIndex / some / every / includes
// ============================================================
// 오늘 방식(어제와 동일): 문제 하나를 "두 번" 푼다.
//   A) for...of 로 먼저 풀어서 로직을 완성한다  (C++ 사고 그대로)
//   B) 같은 걸 탐색 메서드 한 줄로 줄여본다
//   → 탐색계의 핵심은 "찾으면 바로 멈춘다(early return / break)".
//     for버전의 return/break 위치가 곧 메서드로 바뀐다.
//
// [ 눈에 익히기 — 치트시트 ] --------------------------------
//
//  ● find     : 조건 맞는 "첫 값" 하나. 없으면 undefined.
//    [1,3,4,7].find(x => x % 2 === 0)        -> 4
//    (for버전: 돌다가 조건 맞으면 그 x를 return. 다 돌면 undefined)
//
//  ● findIndex: 조건 맞는 "첫 인덱스". 없으면 -1.
//    [1,3,4,7].findIndex(x => x % 2 === 0)   -> 2
//    (for버전: for (let i=0; i<arr.length; i++) ... 맞으면 i를 return, 끝나면 -1)
//    ※ find 는 값, findIndex 는 위치. 짝꿍이다.
//
//  ● some     : "하나라도 맞나?"  → true / false
//    [1,3,5,6].some(x => x % 2 === 0)        -> true
//    (for버전: 맞는 거 만나면 즉시 return true, 다 돌면 return false)
//
//  ● every    : "전부 맞나?"      → true / false
//    [2,4,6].every(x => x % 2 === 0)         -> true
//    (for버전: 안 맞는 거 만나면 즉시 return false, 다 돌면 return true)
//    ※ some 은 "반례 하나면 true", every 는 "반례 하나면 false". 거울짝.
//
//  ● includes : 그 "값"이 들어있나?  → true / false  (조건 아님, 값 비교)
//    [3,5,7].includes(7)                     -> true
//    "hello".includes("ell")                 -> true   (문자열도 됨)
//
//  ● 의도 → 메서드 대응표
//     조건 맞는 첫 "값"        →  find
//     조건 맞는 첫 "인덱스"    →  findIndex
//     하나라도 맞나?          →  some
//     전부 맞나?             →  every
//     이 값 있나?(값 비교)     →  includes
//
// [ 손에 익히기 ] -------------------------------------------
// 각 드릴마다 _for 와 _method 두 함수를 채워라.
// 다 채우면:  node js-methods/03_search.js
// ============================================================

// ── 드릴 1) 첫 번째 짝수 "값".  [1,3,5,8,10]  ->  8 ──
function d1_for(arr) {
  let answer = 0;

  for (const element of arr) {
    if (element % 2 === 0) {
      answer = element;
      break;
    }
  }

  return answer;
}
function d1_method(arr) {
  return arr.find((item) => item % 2 === 0);
}

// ── 드릴 2) 5보다 큰 첫 번째 "값".  [2,4,6,8]  ->  6 ──
function d2_for(arr) {
  let answer = 0;

  for (const element of arr) {
    if (element > 5) {
      answer = element;
      break;
    }
  }

  return answer;
}
function d2_method(arr) {
  return arr.find((item) => item > 5);
}

// ── 드릴 3) 첫 번째 짝수의 "인덱스".  [1,3,4,5]  ->  2 ──
function d3_for(arr) {
  let answer = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      answer = i;
      break;
    }
  }

  return answer;
}
function d3_method(arr) {
  return arr.findIndex((item) => item % 2 === 0);
}

// ── 드릴 4) 값이 0인 첫 인덱스, 없으면 -1.  [1,2,3]  ->  -1 ──
function d4_for(arr) {
  let answer = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) return i;
  }

  return -1;
}
function d4_method(arr) {
  return arr.findIndex((item) => item === 0);
}

// ── 드릴 5) 짝수가 하나라도 있나?  [1,3,5,7]  ->  false ──
function d5_for(arr) {
  for (const element of arr) {
    if (element % 2 === 0) return true;
  }

  return false;
}
function d5_method(arr) {
  return arr.some((item) => item % 2 === 0);
}

// ── 드릴 6) 100 넘는 수가 하나라도 있나?  [50,120,30]  ->  true ──
function d6_for(arr) {
  for (const element of arr) {
    if (element > 100) return true;
  }

  return false;
}
function d6_method(arr) {
  return arr.some((item) => item > 100);
}

// ── 드릴 7) 전부 양수인가?  [1,2,-3]  ->  false ──
function d7_for(arr) {
  for (const element of arr) {
    if (element < 0) return false;
  }

  return true;
}
function d7_method(arr) {
  return arr.every((item) => item > 0);
}

// ── 드릴 8) 전부 10 미만인가?  [3,5,9]  ->  true ──
function d8_for(arr) {
  for (const element of arr) {
    if (element >= 10) return false;
  }

  return true;
}
function d8_method(arr) {
  return arr.every((item) => item < 10);
}

// ── 드릴 9) 배열에 7이 들어있나?  [3,5,7,9]  ->  true ──
function d9_for(arr) {
  for (const element of arr) {
    if (element === 7) return true;
  }

  return false;
}
function d9_method(arr) {
  return arr.includes(7);
}

// ── 드릴 10) 종합: "1 3 5 4 7" -> 짝수가 있으면 "첫 짝수", 없으면 -1 -> 4 ──
//   (split -> map(Number) -> find. 없을 때 처리까지)
function d10_for(raw) {
  // TODO: raw를 split(" ") 하고 for로 돌며 짝수(숫자로 변환!) 찾기.

  const data = raw.split(" ");

  for (const element of data) {
    if (Number(element) % 2 === 0) return Number(element);
  }

  return -1;
}
function d10_method(raw) {
  return raw
    .split(" ")
    .map(Number)
    .find((item) => item % 2 === 0);
}

// ============================================================
// 채점기 (건드리지 마) — node로 실행하면 ✅/❌ 뜬다
// ============================================================
function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
// [드릴번호, 입력, 정답]
const cases = [
  [1, [1, 3, 5, 8, 10], 8],
  [2, [2, 4, 6, 8], 6],
  [3, [1, 3, 4, 5], 2],
  [4, [1, 2, 3], -1],
  [5, [1, 3, 5, 7], false],
  [6, [50, 120, 30], true],
  [7, [1, 2, -3], false],
  [8, [3, 5, 9], true],
  [9, [3, 5, 7, 9], true],
  [10, "1 3 5 4 7", 4],
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
