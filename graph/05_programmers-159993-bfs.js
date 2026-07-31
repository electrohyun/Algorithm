// BFS — 프로그래머스 미로 탈출 (159993)
// https://school.programmers.co.kr/learn/courses/30/lessons/159993

function findPos(maps, ch) {
  const y = maps.findIndex((row) => row.includes(ch));
  return [y, maps[y].indexOf(ch)]; // [y, x]
}

function solution(maps) {
  // BFS

  // 매 움직임마다 - 즉 루프 초기에 레버 건들였는지 + 출구 도착했는지 체크
  // 이미 방문했는지 안했는지는 중요하지 않다 그러나
  // 레버를 찾으면 visited 다시 초기화 (돌아가야 할 수 있으니)
  // 세로 n * 가로 m
  const [sy, sx] = findPos(maps, "S");
  const n = maps.length;
  const m = maps[0].length;
  let dist = Array.from({ length: n }, () => Array(m).fill(0));
  let queue = [[sx, sy]];
  let answer = [];

  while (queue.length > 0) {
    let [x, y] = queue.shift();
    if (maps[y][x] === "L") {
      answer.push(dist[y][x]);
    }

    if (y + 1 < n && dist[y + 1][x] === 0 && maps[y + 1][x] !== "X") {
      queue.push([x, y + 1]);
      dist[y + 1][x] = dist[y][x] + 1;
    }
    if (y > 0 && dist[y - 1][x] === 0 && maps[y - 1][x] !== "X") {
      queue.push([x, y - 1]);
      dist[y - 1][x] = dist[y][x] + 1;
    }
    if (x + 1 < m && dist[y][x + 1] === 0 && maps[y][x + 1] !== "X") {
      queue.push([x + 1, y]);
      dist[y][x + 1] = dist[y][x] + 1;
    }
    if (x > 0 && dist[y][x - 1] === 0 && maps[y][x - 1] !== "X") {
      queue.push([x - 1, y]);
      dist[y][x - 1] = dist[y][x] + 1;
    }
  }

  const lengthStartToLever = Math.min([...answer]);
  answer = [];

  const [ly, lx] = findPos(maps, "L");
  dist = Array.from({ length: n }, () => Array(m).fill(0));
  queue = [[lx, ly]];

  while (queue.length > 0) {
    let [x, y] = queue.shift();
    if (maps[y][x] === "E") {
      answer.push(dist[y][x]);
    }

    if (y + 1 < n && dist[y + 1][x] === 0 && maps[y + 1][x] !== "X") {
      queue.push([x, y + 1]);
      dist[y + 1][x] = dist[y][x] + 1;
    }
    if (y > 0 && dist[y - 1][x] === 0 && maps[y - 1][x] !== "X") {
      queue.push([x, y - 1]);
      dist[y - 1][x] = dist[y][x] + 1;
    }
    if (x + 1 < m && dist[y][x + 1] === 0 && maps[y][x + 1] !== "X") {
      queue.push([x + 1, y]);
      dist[y][x + 1] = dist[y][x] + 1;
    }
    if (x > 0 && dist[y][x - 1] === 0 && maps[y][x - 1] !== "X") {
      queue.push([x - 1, y]);
      dist[y][x - 1] = dist[y][x] + 1;
    }
  }

  const lengthLeverToExit = Math.min([...answer]);

  if (lengthStartToLever && lengthLeverToExit)
    return lengthStartToLever + lengthLeverToExit;

  return -1;
}

// 자기검증용
// console.log(solution(["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"])); // 기대값 16
// console.log(solution(["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"])); // 기대값 -1
