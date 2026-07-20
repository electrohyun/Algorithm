// ============================================================
// Day 9 — 프로그래머스 JS 손풀기 (그리디 · 완전탐색)
// ============================================================
// 규칙: 새 알고리즘 X. 아는 쉬운 문제를 JS로 반사적으로 푸는 워밍업.
//       채점은 프로그래머스 사이트에서. 여기엔 통과한 풀이만 정리.
//   p1  큰 수 만들기     (Lv2, 42883)  — Day 8 미해결 → 재도전
//   p2  카펫            (Lv2, 42842)  — Day 8 시간부족으로 제외
// ============================================================

// ── p1) 큰 수 만들기 ── (나중에 재도전)
// https://school.programmers.co.kr/learn/courses/30/lessons/42883
// 그리디 + 스택(모노토닉). 왼쪽부터 한 글자씩, "지금 게 맨 뒤보다 크고 예산(k) 남으면"
// 맨 뒤를 버린다 → 큰 숫자를 앞으로. 다 돌고 k 남으면(내림차순) 뒤에서 잘라냄.
function p1(number, k) {
  const stack = [];

  for (const digit of number) {
    // 맨 뒤가 지금보다 작고, 아직 버릴 예산 있으면 → 계속 버림 (if 아니라 while!)
    while (stack.length > 0 && stack[stack.length - 1] < digit && k > 0) {
      stack.pop();
      k -= 1;
    }
    stack.push(digit); // 안 버려진 것 포함, 지금 숫자는 매번 넣기
  }

  // k가 남았다 = 스캔 중 못 버림(내림차순) → 뒤에서 k개 잘라내기
  return stack.slice(0, stack.length - k).join("");
}

// ── p2) 카펫 ──
// https://school.programmers.co.kr/learn/courses/30/lessons/42842
function solution(brown, yellow) {
  const squareSize = brown + yellow;

  const xyPair = [];

  for (let x = 1; x <= squareSize; x++) {
    const y = squareSize / x;
    const isTooTall = y > x; // 세로가 가로보다 길면 후보 아님

    if (isTooTall) continue;

    const isDivisor = squareSize % x === 0;

    if (isDivisor) xyPair.push([x, y]);
  }

  for (const [x, y] of xyPair) {
    const yellowWidth = x - 2;
    const yellowHeight = y - 2;

    const isAnswer = yellowWidth * yellowHeight === yellow;

    if (isAnswer) return [x, y];
  }

  return -1;
}
