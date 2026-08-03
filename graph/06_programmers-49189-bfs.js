// BFS — 프로그래머스 가장 먼 노드 (49189)
// https://school.programmers.co.kr/learn/courses/30/lessons/49189

function solution(n, edge) {
  // 0     1      2          3          4     5    6
  // [[], [2,3], [1,3,4,5], [1,2,4,6], [2,3], [2], [3]]
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [first, second] of edge) {
    graph[first].push(second);
    graph[second].push(first);
  }

  const queue = [1];
  const dist = Array.from({ length: n + 1 }, () => 0);
  dist[1] = 1;

  while (queue.length > 0) {
    const cur = queue.shift();
    for (const next of graph[cur]) {
      if (dist[next] === 0) {
        dist[next] = dist[cur] + 1;
        queue.push(next);
      }
    }
  }

  const max = Math.max(...dist);

  return dist.filter((item) => item === max).length;
}

// 자기검증용
// console.log(solution(6, [[3,6],[4,3],[3,2],[1,3],[1,2],[2,4],[5,2]])); // 기대값 3
