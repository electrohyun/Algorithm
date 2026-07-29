// BFS/DFS — 프로그래머스 타겟 넘버 (43165)
// https://school.programmers.co.kr/learn/courses/30/lessons/43165

function solution(numbers, target) {
  let answer = 0;
  let index = 0;

  function dfs(idx, sum) {
    // 끝나면... 대조해서 방법의 수+1
    if (idx + 1 === numbers.length) {
      if (sum === target) answer++;
      return 0;
    }

    // 안 끝나면...
    dfs(idx + 1, sum + numbers[idx + 1]);
    dfs(idx + 1, sum - numbers[idx + 1]);
  }

  dfs(0, numbers[0]);
  dfs(0, -numbers[0]);

  return answer;
}

// 자기검증용
// console.log(solution([1, 1, 1, 1, 1], 3)); // 기대값 5
// console.log(solution([4, 1, 2, 1], 4));    // 기대값 2
