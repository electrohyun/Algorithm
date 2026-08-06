# 프로그래머스 42898 등굣길

## 코드

```js
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
```

오늘의 발견:

- 새로운 DP 문제를 풀었다.
- 발상이 어렵다는걸 느낀다.

잘한 점:

- 해당 위치에 도달할 수 있는 개수를 센다는 첫 발상 외에는 수월하게 풀 수 있었다.

불확실한 점:

- 발상이 제일 중요하지 않을까, 시간이 많이 걸려서 아쉽다.

내일부터:

- 그래도 DP 한문제 더 도전!
