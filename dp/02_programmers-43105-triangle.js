// 프로그래머스 43105 - 정수 삼각형
// https://school.programmers.co.kr/learn/courses/30/lessons/43105
//
// 종이 먼저 → 점화식 세우고 직접 채우기.
// 힌트: 각 칸까지 올 수 있는 "합의 최댓값"을 저장한다면?

function solution(triangle) {
  // const dp = [].push([]);
  const dp = [];
  // dp[1] = triangle[0];
  // dp[2] = Math.max(triangle[1][0], triangle[1][1]);
  dp[0] = [triangle[0][0]];

  // for (let i = 3; i < triangle.length; i++) {
  for (let i = 1; i < triangle.length; i++) {
    dp[i] = [];
    for (let j = 0; j < triangle[i].length; j++) {
      if (j === 0) {
        dp[i][j] = triangle[i][j] + dp[i - 1][j];
        continue;
      }
      if (j === triangle[i].length - 1) {
        dp[i][j] = triangle[i][j] + dp[i - 1][j - 1];
        continue;
      }

      // dp[i][j] = triangle[i][j] + Math.max(dp[i - 1][j], dp[i - 1][j + 1]);
      dp[i][j] = triangle[i][j] + Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
    }
  }

  return Math.max(...dp[triangle.length - 1]);
}
