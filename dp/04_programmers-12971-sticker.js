// 프로그래머스 12971 - 스티커 모으기2
// https://school.programmers.co.kr/learn/courses/30/lessons/12971

function calc(arr, i) {
  if (i >= arr.length - 1) return 0;

  return arr[i] + Math.max(calc(arr, i + 2), calc(arr, i + 3));
}

function solution(sticker) {
  if (sticker.length === 1) return sticker[0];

  const sums = [];

  // 14,6,5,11,3,9,2,10
  const first = [...sticker];

  // 6,5,11,3,9,2,10,14
  const second = [...sticker];
  second.push(second.shift());

  // 10,14,6,5,11,3,9,2
  const third = [...sticker];
  third.unshift(third.pop());

  sums.push(calc(first, 0));
  sums.push(calc(second, 0));
  sums.push(calc(third, 0));

  return Math.max(...sums);
}

// ── 반복문 버전 (점화식 동일, 방향만 뒤집음) ──────────────────

function calcLoop(arr) {
  const n = arr.length;
  const dp = Array(n).fill(0);

  for (let i = n - 2; i >= 0; i--) {
    dp[i] = arr[i] + Math.max(dp[i + 2] ?? 0, dp[i + 3] ?? 0);
  }

  return dp[0];
}

function solutionFast(sticker) {
  if (sticker.length === 1) return sticker[0];

  const sums = [];

  // 14,6,5,11,3,9,2,10
  const first = [...sticker];

  // 6,5,11,3,9,2,10,14
  const second = [...sticker];
  second.push(second.shift());

  // 10,14,6,5,11,3,9,2
  const third = [...sticker];
  third.unshift(third.pop());

  sums.push(calcLoop(first));
  sums.push(calcLoop(second));
  sums.push(calcLoop(third));

  return Math.max(...sums);
}
