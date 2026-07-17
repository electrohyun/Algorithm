// ============================================================
// Day 8 — 프로그래머스 JS 손풀기 (완전탐색 · 그리디)
// ============================================================
// 규칙: 새 알고리즘 X. 아는 쉬운 문제를 JS로 반사적으로 푸는 워밍업.
//       채점은 프로그래머스 사이트에서. 여기엔 통과한 풀이만 정리.
//   p1  모의고사        (Lv1, 42840)
//   p2  체육복          (Lv1, 42862)
//   p3  큰 수 만들기     (Lv2, 42883)
//   p4  카펫            (Lv2, 42842)  — 시간 부족으로 제외
// ============================================================

// ── p1) 모의고사 ──
// https://school.programmers.co.kr/learn/courses/30/lessons/42840
const firstGuy = [1, 2, 3, 4, 5];
const secondGuy = [2, 1, 2, 3, 2, 4, 2, 5];
const thirdGuy = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

function solution(answers) {
  const firstGuyAnswers = answers.filter(
    (item, idx) => item === firstGuy[idx % 5],
  ).length;
  const secondGuyAnswers = answers.filter(
    (item, idx) => item === secondGuy[idx % 8],
  ).length;
  const thirdGuyAnswers = answers.filter(
    (item, idx) => item === thirdGuy[idx % 10],
  ).length;

  const scores = [firstGuyAnswers, secondGuyAnswers, thirdGuyAnswers];
  const highest = Math.max(...scores);

  return scores
    .map((score, idx) => (score === highest ? idx + 1 : null))
    .filter((no) => no !== null);
}

// ── p2) 체육복 ──
// https://school.programmers.co.kr/learn/courses/30/lessons/42862
// 1. 이름 구림: taken, yebi -> 차라리 element 쓰자
// 2. const 상수 good
// 3. reduce 이유 없음. reduce 축약의 의미 -> for 쓰기
function p2(n, lost, reserve) {
  // const trainingBok = new Array(n).fill(1);
  const trainingBok = Array.from({ length: n }, () => 1);

  for (const taken of lost) {
    trainingBok[taken - 1] = 0;
  }

  for (const yebi of reserve) {
    trainingBok[yebi - 1] += 1;
  }

  return trainingBok
    .reduce((acc, cur, idx) => {
      const isHaveTrainingBok = trainingBok[idx] >= 1;
      const isFinalStudent = idx === trainingBok.length - 1;

      const isPreviousStudentHaveTrainingBok = trainingBok[idx - 1] > 1;

      const isNexStudentHaveTrainingBok = trainingBok[idx + 1] > 1;

      if (isHaveTrainingBok) return acc;

      if (isPreviousStudentHaveTrainingBok) {
        trainingBok[idx - 1] -= 1;
        trainingBok[idx] = 1;
        return acc;
      }

      if (isFinalStudent) return acc;

      if (isNexStudentHaveTrainingBok) {
        trainingBok[idx + 1] -= 1;
        trainingBok[idx] = 1;
        return acc;
      }

      return acc;
    }, trainingBok)
    .filter((item) => item >= 1).length;
}

// ── p2b) 체육복 — for 루프 버전 ──
// https://school.programmers.co.kr/learn/courses/30/lessons/42862
function p2b(n, lost, reserve) {
  const trainingBok = Array.from({ length: n }, () => 1);

  for (const taken of lost) {
    trainingBok[taken - 1] = 0;
  }

  for (const yebi of reserve) {
    trainingBok[yebi - 1] += 1;
  }

  for (let idx = 0; idx < trainingBok.length; idx += 1) {
    const isHaveTrainingBok = trainingBok[idx] >= 1;
    const isFinalStudent = idx === trainingBok.length - 1;

    const isPreviousStudentHaveTrainingBok = trainingBok[idx - 1] > 1;

    const isNexStudentHaveTrainingBok = trainingBok[idx + 1] > 1;

    if (isHaveTrainingBok) continue;

    if (isPreviousStudentHaveTrainingBok) {
      trainingBok[idx - 1] -= 1;
      trainingBok[idx] = 1;
      continue;
    }

    if (isFinalStudent) continue;

    if (isNexStudentHaveTrainingBok) {
      trainingBok[idx + 1] -= 1;
      trainingBok[idx] = 1;
      continue;
    }
  }

  return trainingBok.filter((item) => item >= 1).length;
}

// ── p3) 큰 수 만들기 ──
// https://school.programmers.co.kr/learn/courses/30/lessons/42883
function p3(number, k) {
  const targetDigit = number.length - k; // 정답.length = target.Digit

  const target = Math.max(...number.split(""));

  for (let i = target; i > 0; i--) {
    const slicedNumber = number.slice(number.indexOf(i));

    if (slicedNumber.length < targetDigit) {
      continue;
    }

    if (slicedNumber.length === targetDigit) {
      return slicedNumber;
    }

    while (true) {
      if (slicedNumber.length === targetDigit) {
        return slicedNumber;
      }
    }
  }
}
