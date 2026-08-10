// 1번 풀이
// 합계: 52.9 / 100.0
function solutionBruteForce(sequence, k) {
  const index = sequence.indexOf(k);

  if (index !== -1) {
    return [index, index];
  }

  for (let length = 1; length <= sequence.length; length++) {
    for (let start = 0; start + length <= sequence.length; start++) {
      const end = start + length - 1;

      // sequence[start]부터 sequence[end]까지가 현재 확인할 구간
      let sum = 0;
      for (let i = start; i <= end; i++) {
        sum += sequence[i];
      }
      if (sum === k) return [start, end];
    }
  }
}

// 2번 풀이
function solution(sequence, k) {
  let left = 0;
  let sum = 0;
  let answer = [0, sequence.length - 1];

  for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right];

    while (sum > k) {
      sum -= sequence[left];
      left++;
    }

    if (sum === k && right - left < answer[1] - answer[0]) {
      answer = [left, right];
    }
  }

  return answer;
}
// // 3번 시도 - 맨 끝 구간으로 길이를 미리 거르기(틀림)
// function solutionSuffixExperiment(sequence, k) {
//   const index = sequence.indexOf(k);

//   if (index !== -1) {
//     return [index, index];
//   }

//   // 길이가 작거나 같은거 버리기
//   for (let length = 1; length <= sequence.length; length++) {
//     const start = sequence.length - length;
//     const end = sequence.length - 1;

//     let sum = 0;
//     for (let i = start; i <= end; i++) {
//       sum += sequence[i];
//     }
//     if (sum === k) return [start, end];
//     if (sum > k) break;
//   }
// }
