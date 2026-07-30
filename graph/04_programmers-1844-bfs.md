# 프로그래머스 1844 게임 맵 최단거리

```js
function solution(maps) {
  const n = maps.length; // 세로(행)
  const m = maps[0].length; // 가로(열)
  const dist = Array.from({ length: n }, () => Array(m).fill(0)); // 거리판 (0 = 아직 안 옴)
  const queue = [[0, 0]];
  const answer = [];

  let x = 0;
  let y = 0;

  dist[0][0] = 1;

  while (queue.length > 0) {
    const [y, x] = queue.shift();

    if (x === m - 1 && y === n - 1) answer.push(dist[y][x]);

    if (y + 1 < n && maps[y + 1][x] === 1 && dist[y + 1][x] === 0) {
      queue.push([y + 1, x]);
      dist[y + 1][x] = dist[y][x] + 1;
    }
    if (y - 1 >= 0 && maps[y - 1][x] === 1 && dist[y - 1][x] === 0) {
      queue.push([y - 1, x]);
      dist[y - 1][x] = dist[y][x] + 1;
    }

    if (x + 1 < m && maps[y][x + 1] === 1 && dist[y][x + 1] === 0) {
      queue.push([y, x + 1]);
      dist[y][x + 1] = dist[y][x] + 1;
    }

    if (x - 1 >= 0 && maps[y][x - 1] === 1 && dist[y][x - 1] === 0) {
      queue.push([y, x - 1]);
      dist[y][x - 1] = dist[y][x] + 1;
    }
  }

  return Math.min([...answer]) ? Math.min([...answer]) : -1;
}
```

오늘의 발견:

- bfs 풀이 방법

잘한 점:

- 끝까지 집중해서 풀었다.

불확실한 점:

- queue를 사용해 bfs를 해결하는 발상
- 루프문 안에서의 x, y를 사용한 무상태(stateless)? 유상태(stateful)? 느낌이 아리송하다
- 2차원 배열 어떻게 만들지 하는 데에 5분 썼다. 바로 튀어나오게 연습해야 할 것이다.

내일부터:

- bfs 한문제 더!!!
