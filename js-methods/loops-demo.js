// ============================================================
// JS 반복문 총정리 — 실행해서 출력으로 차이 보기
//   node js-methods/loops-demo.js
// ============================================================

const arr = ["사과", "바나나", "체리"]; // 배열
const obj = { name: "철수", age: 20 }; // 객체

console.log("========== 배열:", JSON.stringify(arr), "==========\n");

// ── ① 옛날 for : 인덱스 i를 직접 굴림 (C++이랑 동일) ──
console.log("① for (let i...) — 인덱스가 필요할 때");
for (let i = 0; i < arr.length; i++) {
  console.log(`   i=${i}  arr[i]=${arr[i]}`);
}

// ── ② for...of : 값을 하나씩 (C++의 for(auto x : arr)) ──
console.log("\n② for...of — 값만 필요할 때 (배열 최애)");
for (const value of arr) {
  console.log(`   value=${value}`);
}

// ── ③ for...in : "키/인덱스"를 돈다. 배열에 쓰면 인덱스가 문자열! ──
console.log("\n③ for...in — 배열에 쓰면? (index가 문자열 '0','1'...)");
for (const key in arr) {
  console.log(`   key=${key} (typeof: ${typeof key})  arr[key]=${arr[key]}`);
}
console.log("   ⚠️ 배열엔 for...in 쓰지 마. 위처럼 key가 문자열이고 순서/상속 문제 생김.");

// ── ④ forEach : 각 원소에 콜백 실행. break 불가! ──
console.log("\n④ forEach — 각 원소에 '실행'. (인덱스도 둘째 인자로 받음)");
arr.forEach((value, index) => {
  console.log(`   index=${index}  value=${value}`);
});
console.log("   ⚠️ forEach 안에선 break/continue/return 으로 루프 못 멈춤.");

// ── ⑤ for...of + .entries() : 값 + 인덱스 둘 다 (best of both) ──
console.log("\n⑤ for...of + .entries() — 인덱스랑 값 둘 다 필요할 때");
for (const [index, value] of arr.entries()) {
  console.log(`   index=${index}  value=${value}`);
}

console.log("\n========== 객체:", JSON.stringify(obj), "==========\n");

// ── ⑥ for...in : 객체는 이걸로! 키를 돈다 ──
console.log("⑥ for...in — 객체의 '키'를 돈다 (객체엔 이게 정석)");
for (const key in obj) {
  console.log(`   key=${key}  value=${obj[key]}`);
}

// ── ⑦ Object.keys / values / entries : 객체를 배열로 바꿔서 돌기 ──
console.log("\n⑦ Object.entries(obj) — 객체를 [[키,값],...] 배열로 → for...of");
for (const [key, value] of Object.entries(obj)) {
  console.log(`   ${key} = ${value}`);
}

console.log("\n========== while 계열 ==========\n");

// ── ⑧ while : 조건이 참인 동안 (횟수 모를 때) ──
console.log("⑧ while — 조건 참인 동안 반복");
let n = 3;
while (n > 0) {
  console.log(`   n=${n}`);
  n--;
}

// ── ⑨ do...while : 무조건 1번은 실행하고 조건 검사 ──
console.log("\n⑨ do...while — 최소 1번은 실행 (조건을 뒤에서 검사)");
let m = 0;
do {
  console.log(`   m=${m} (조건 false여도 이 줄은 1번 실행됨)`);
  m--;
} while (m > 0);

console.log("\n========== 요약 ==========");
console.log(`
  배열 값만        →  for...of
  배열 값+인덱스   →  for...of + arr.entries()  (또는 옛날 for)
  객체 키          →  for...in  (또는 Object.entries + for...of)
  실행만(반환X)    →  forEach
  횟수 모름        →  while / do...while

  ⚠️ 핵심 함정: for...in 은 '객체'용. 배열엔 for...of 를 써라.
`);
