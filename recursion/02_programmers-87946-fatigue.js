// 재귀·백트래킹 — 프로그래머스 피로도 (87946)
// 커리큘럼 Phase 4 #9: 재귀/백트래킹.

// https://school.programmers.co.kr/learn/courses/30/lessons/87946
// 유저 피로도 k, 각 던전 [최소 필요 피로도, 소모 피로도].
// 현재 피로도 >= 최소 필요 피로도 여야 입장 가능(입장하면 소모만큼 깎임).
// 던전 순서를 자유롭게 정해서 "최대 몇 개" 돌 수 있는지 반환.
// 예) k=80, [[80,20],[50,40],[30,10]] → 3

function solution(k, dungeons) {
  let answer = 0;

  function game(curK, curDungeons, clearCount) {
    answer = Math.max(answer, clearCount);

    for (const [i, [min, con]] of curDungeons.entries()) {
      if (curK < min) continue;
      const dungeon = curDungeons.filter((item, idx) => idx !== i);
      game(curK - con, dungeon, clearCount + 1);
    }
  }

  game(k, dungeons, 0);
  return answer;
}

// 자기검증용
// console.log(solution(80, [[80, 20], [50, 40], [30, 10]])); // 기대값 3
