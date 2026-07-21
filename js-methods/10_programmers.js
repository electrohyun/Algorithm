// JS 손풀기 Day10 — 프로그래머스 (스택·큐)
// 커리큘럼 Phase 2 #6: 스택·큐·덱. BFS(큐)·DFS(스택)의 재료.

// ── p1) 기능개발 (42586) ──
// https://school.programmers.co.kr/learn/courses/30/lessons/42586
// 큐: 앞 작업이 끝나야 뒤 작업 배포. 앞에서부터 몇 개가 한 번에 나가는지 카운트.
function solution(progresses, speeds) {
  const answer = [];

  let progressesQueue = progresses;
  let speedsQueue = speeds;

  while (true) {
    if (progressesQueue.length === 0) break;

    if (progressesQueue[0] >= 100) {
      let deployCount = 1;
      progressesQueue.shift();
      speedsQueue.shift();

      // 근데 다음 것도 배포 가능하면...
      while (progressesQueue[0] >= 100) {
        // 끝에 다다르면 종료. 안전하게 먼저 체크
        if (progressesQueue.length <= 0) {
          break;
        }

        deployCount += 1;
        progressesQueue.shift();
        speedsQueue.shift();
      }

      // 순회 끝
      answer.push(deployCount);
      deployCount = 0;
    } else {
      // 계산방식 때문에 해당 speeds 엘리먼트도 날려야함
      progressesQueue = progressesQueue.map(
        (item, index) => item + speedsQueue[index],
      );
    }
  }

  return answer;
}

function solution(progresses, speeds) {
  const days = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));

  const answer = [];
  while (days.length > 0) {
    const front = days.shift();
    let count = 1;

    while (days.length > 0 && days[0] <= front) {
      days.shift();
      count += 1;
    }

    answer.push(count);
  }
  return answer;
}
