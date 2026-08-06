// 프로그래머스 42898 - 등굣길
// https://school.programmers.co.kr/learn/courses/30/lessons/42898
//
// 종이 먼저 → 점화식 세우고 직접 채우기.

function solution(m, n, puddles) {
  // 지도
  const maps = Array.from({ length: n }, () => Array(m).fill(0));
  let answer = 0;

  // 웅덩이
  puddles.map(([x, y]) => (maps[y - 1][x - 1] = -1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0) {
        if (maps[i][j] === -1) break;
        maps[i][j] = 1;
      }

      if (j === 0) {
        if (maps[i][j] === -1) break;
        maps[i][j] = 1;
      }
    }
    if (maps[i][0] === -1) break;
  }

  maps[0][0] = -1;
  // maps[n-1][m-1] = -1

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (maps[i][j] === -1) continue;

      // 값 할당
      // 위가 웅덩이면 오는길 안늘어남
      if (maps[i - 1][j] === -1) {
        maps[i][j] = maps[i][j - 1];
        if (i === n - 1 && j === m - 1) answer = maps[i][j];
        continue;
      }

      // 왼쪽이 웅덩이면 오는길 안늘어남
      if (maps[i][j - 1] === -1) {
        maps[i][j] = maps[i - 1][j];
        if (i === n - 1 && j === m - 1) answer = maps[i][j];
        continue;
      }

      // 해당사항 없으면
      maps[i][j] = (maps[i - 1][j] + maps[i][j - 1]) % 1000000007;

      if (i === n - 1 && j === m - 1) answer = maps[i][j];
    }
  }

  return answer;
}

// ── 리팩터 버전 ──────────────────────────────────────────────
// 핵심: 웅덩이를 -1 대신 "0"으로 취급 → 특수처리 분기가 통째로 사라짐.
//   · 웅덩이=0 이라 그냥 (위+왼쪽) 더하면 됨 (0은 합에 영향 없음)
//   · 첫 행/열은 삼항(i>0?:0, j>0?:0)으로 경계 흡수
//   · 도착점 값을 바로 return

function solutionClean(m, n, puddles) {
  const MOD = 1000000007;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  const isPuddle = new Set(puddles.map(([x, y]) => `${y - 1},${x - 1}`));

  dp[0][0] = 1; // 시작점: 도달하는 방법 1가지

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) continue; // 시작점은 이미 1
      if (isPuddle.has(`${i},${j}`)) continue; // 웅덩이는 0 그대로

      const up = i > 0 ? dp[i - 1][j] : 0; // 첫 행이면 위가 없음
      const left = j > 0 ? dp[i][j - 1] : 0; // 첫 열이면 왼쪽이 없음
      dp[i][j] = (up + left) % MOD;
    }
  }

  return dp[n - 1][m - 1];
}
