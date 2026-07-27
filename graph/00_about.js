function bfs(graph, start) {
  // queue 만들기
  const queue = [];
  let head = 0;

  // 방문 기록표 만들기
  const visited = Array(graph.length).fill(false);

  // 시작점을 queue에 넣기
  queue.push(start);

  // 시작점 방문 처리하기
  visited[start] = true;

  while (head < queue.length) {
    // queue에서 하나 꺼내기
    const current = queue[head++];

    console.log(current); // 방문한 노드 출력

    // 현재 노드와 연결된 애들 확인하기
    for (const next of graph[current]) {
      // 이미 방문했으면 넘어가기
      if (visited[next]) continue;

      // 처음 보는 노드면 방문 처리하기
      visited[next] = true;

      // 다음에 처리하려고 queue에 넣기
      queue.push(next);
    }
  }
}
