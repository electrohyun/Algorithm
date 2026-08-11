// 투포인터 · 그리디 — 프로그래머스 구명보트 (42885)
// https://school.programmers.co.kr/learn/courses/30/lessons/42885

// 1번풀이
function solution(people, limit) {
  // 변수 선언
  const queue = [];
  let answer = 0;

  // 오름차순 정렬
  const peopleQueue = people.sort((a, b) => a - b);

  // ??
  while (peopleQueue.length > 0) {
    // if (limit % peopleQueue[0] === 1) break;
    // 맨앞사람 out
    let currentWeight = peopleQueue.shift();

    if (limit - currentWeight - peopleQueue[0] >= 0 && peopleQueue.length > 0) {
      currentWeight += peopleQueue.shift();
    }

    currentWeight = 0;
    answer++;
  }

  answer += peopleQueue.length;

  return answer;
}

// 자기검증용
// console.log(solution([70, 50, 80, 50], 100)); // 기대값 3
// console.log(solution([70, 80, 50], 100)); // 기대값 3

// 2번풀이

function solution(people, limit) {
  // [30, 50, 50, 60, 70]

  // 정렬시킨뒤의 투포인터
  const peopleArray = people.sort((a, b) => a - b);

  let first = 0;
  let end = peopleArray.length - 1;
  let answer = 0;

  while (peopleArray.length > 0) {
    // if (peopleArray.length === 1) {
    //     answer++;
    //     break;
    // }
    // 맨 처음과 맨 끝 덧셈 값이 limit보다 작거나 같다면 2명 out
    if (peopleArray[first] + peopleArray[end] <= limit) {
      peopleArray.shift();
      peopleArray.pop();
      answer++;
      first++;
      end--;
      continue;
    }

    // 맨 처음과 맨 끝 덧셈 값이 limit보다 크다면 맨끝 out
    if (peopleArray[first] + peopleArray[end] > limit) {
      peopleArray.pop();
      answer++;
      end--;
      continue;
    }
  }

  return answer;
}
// 3번풀이 (정답)
function solution(people, limit) {
  // [30, 50, 50, 60, 70]

  // 정렬시킨뒤의 투포인터
  const peopleArray = people.sort((a, b) => a - b);

  let first = 0;
  let end = peopleArray.length - 1;
  let answer = 0;

  while (first <= end) {
    // if (peopleArray.length === 1) {
    //     answer++;
    //     break;
    // }
    // 맨 처음과 맨 끝 덧셈 값이 limit보다 작거나 같다면 2명 out
    if (peopleArray[first] + peopleArray[end] <= limit) {
      // peopleArray.shift();
      // peopleArray.pop();
      answer++;
      first++;
      end--;
      continue;
    }

    // 맨 처음과 맨 끝 덧셈 값이 limit보다 크다면 맨끝 out
    if (peopleArray[first] + peopleArray[end] > limit) {
      // peopleArray.pop();
      answer++;
      end--;
      continue;
    }
  }

  return answer;
}
