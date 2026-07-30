// BFS — 프로그래머스 게임 맵 최단거리 (1844)
// https://school.programmers.co.kr/learn/courses/30/lessons/1844

// DFS: 틀린 접근
function solution(maps) {
  // 세로x가로 = NxM
  const n = maps.length;
  const m = maps[0].length;
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  const result = [];

  let count = 0;

  function search(x, y, map) {
    visited[y][x] = true;
    count++;

    if (y === n - 1 && x === m - 1) {
      result.push(count);
      count = 0;
    }
    if (x + 1 < m && map[y][x + 1] === 1 && visited[y][x + 1] === 0)
      search(x + 1, y, map);
    if (x - 1 >= 0 && map[y][x - 1] === 1 && visited[y][x - 1] === 0)
      search(x - 1, y, map);
    if (y + 1 < n && map[y + 1][x] === 1 && visited[y + 1][x] === 0)
      search(x, y + 1, map);
    if (y - 1 >= 0 && map[y - 1][x] === 1 && visited[y - 1][x] === 0)
      search(x, y - 1, map);
  }

  search(0, 0, maps);

  return Math.min([...result]) ? Math.min([...result]) : -1;
}

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

// 자기검증용
// console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]])); // 기대값 11
// console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]])); // 기대값 -1
