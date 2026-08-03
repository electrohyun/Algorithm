# 프로그래머스 49189 가장 먼 노드

- https://school.programmers.co.kr/learn/courses/30/lessons/49189
- 유형: 그래프 · BFS (인접 리스트)

## 문제 요약

- 노드 `n`개, 간선 목록 `edge` (양방향)
- 1번 노드에서 "가장 멀리 떨어진 노드"의 개수를 구하기
- 가장 멀다 = 최단 경로(간선 수)가 최대인 노드

## 내 풀이

```js
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
```

## 회고

오늘의 발견:

- 주말 쉬고 오니 금새 bfs를 잊었다. 알고리즘 고수의 길은 멀고 험하다.

잘한 점:

- 그래프를 만들어야 한다는 발상을 바로 떠올려서 다행이었다.
- 큰 값을 찾아서 메서드 체이닝 (filter -> length) 하는 과정이 바로 연상되어 풀 수 있었다.

불확실한 점:

- bfs 구현을 바로 못 떠올렸다.
- 그래프를 그릴때 first - second 선만 추가하고, 그 반대는 추가하지 않았다.
- dist[1]부터 1을 채워어야 했는데, 1부터 시작하는 숫자를 쓰기로 해놓고 dist[0] = 1을 주고 시작했었다.

내일부터:

- 내일부터 DP.
