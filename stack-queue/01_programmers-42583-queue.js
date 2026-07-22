// 스택·큐 — 프로그래머스 다리를 지나는 트럭 (42583)
// 커리큘럼 Phase 2 #6: 스택·큐·덱. BFS(큐)·DFS(스택)의 재료.

// https://school.programmers.co.kr/learn/courses/30/lessons/42583
// 큐: 길이 bridge_length인 다리 위를 트럭이 순서대로 건넌다.
// 다리는 무게 weight까지만 버팀. 모든 트럭이 건너는 데 걸리는 최소 시간(초)은?
function solution(bridge_length, weight, truck_weights) {
  const waiting = truck_weights;
  const passing = [];
  const exitAt = [];
  let onBridge = 0;
  let time = 0;

  while (passing.length || waiting.length) {
    time++;

    if (passing.length && exitAt[0] === time) {
      onBridge -= passing.shift();
      exitAt.shift();
    }

    if (
      waiting.length &&
      onBridge + waiting[0] <= weight &&
      passing.length < bridge_length
    ) {
      onBridge += waiting[0];
      passing.push(waiting[0]);
      exitAt.push(time + bridge_length);
      waiting.shift();
    }
  }

  return time;
}
