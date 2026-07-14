# JS 손풀기 Day5 해싱 (Set / Map / 객체 / 2D 배열)

- 자바스크립트 감잡기 마지막 날이다. 평소 어려워했던 것들을 풀고, 내일 마지막으로 5일차동안 공부한 내용을 총 복습해야겠다.

## 복습 표시 (내 메모 기준)

> 마무리 시 내가 코드 주석에 남긴 메모를 모아둔 곳. 다음에 여기부터 다시 본다.

| 드릴          | 표시            | 내 메모                              | 되짚을 포인트                                                             |
| ------------- | --------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| d1_method     | 🔖 개념         | "Array는 되는데 Set은 왜 `new Set`?" | 구세대(Array)는 `new` 없어도 됨 / 신세대(Set·Map)는 `new` 필수            |
| d2            | 🔁 체이닝       | "for는 쉬운데 체이닝 어려웠다"       | `filter((v,i)=>arr.indexOf(v)===i).length` 관용구                         |
| d4_method     | ❌→✅           | "틀림"                               | `const set = new Set(b); a.filter(x => set.has(x))`                       |
| **d8_method** | ⭐ **복습필수** | "복습필수!"                          | `seen`은 **빈 통**으로 시작 → `has`로 조회 후 `add`. Set엔 `indexOf` 없음 |
| d10_method    | 🤔 아쉬움       | "살짝 아쉬움"                        | 객체→정렬 전에 `Object.entries`로 배열화, 끝에 `.map(e=>e[0])`            |

## 문제

```ts
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
function d7_method(str) {
  const answer = {};

  for (const element of str.split("")) {
    answer[element] = (answer[element] ?? 0) + 1;
  }

  return Object.entries(answer).sort((a, b) => b[1] - a[1])[0][0];
}

// ── 드릴 8) 첫 중복 원소.  [2,1,3,1,4,2]  ->  1  (없으면 -1) ── 복습필수!
function d8_method(arr) {
  const set = new Set();

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

// ── 드릴 10) 종합: "a b a c b a" -> 빈도 내림차순 고유 문자 -> ["a","b","c"] ── 살짝 아쉬움
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
```

## 회고

오늘의 발견:

- Set 사용법
- dict -> Object.keys에서 객체.keys처럼 사용하는게 아니라, 무조건 Object.keys로 사용해야 한다. 이름만 그런 것 뿐으로, 관계 없다.
- 가장 중요한 건, 공식 하나 배웠다. 요긴하게 쓸 수 있을 듯. answer[element] = (answer[element] ?? 0) + 1;

잘한 점:

- 끝까지 포기하지 않고 도전했다.

불확실한 점:

- 제법 많이 틀렸다.

내일부터:

- 자바스크립트 메서드 5일차 내용들을 총 복습을 마지막으로 진행해보려 한다.
