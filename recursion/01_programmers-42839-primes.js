// 재귀·백트래킹 — 프로그래머스 소수 찾기 (42839)
// 커리큘럼 Phase 4 #9: 재귀/백트래킹. DFS의 뿌리 — 순열 나열.

// https://school.programmers.co.kr/learn/courses/30/lessons/42839
// 숫자 문자열 numbers의 조각들을 이어붙여 만들 수 있는 모든 수 중,
// 서로 다른 소수가 몇 개인지 반환. 예) "17" → 7, 17, 71 → 3개

function solution(numbers) {
  const found = new Set();          // 만든 수 다 모으는 통 (중복 자동 제거)
  const pieces = numbers.split(""); // ['1','7','2']

  // current = 지금까지 만든 수, rest = 아직 안 쓴 조각들
  function finder(current, rest) {
    found.add(Number(current));     // 들어오자마자 담기 → "1","17","172" 매번
    rest.forEach((piece, i) => {
      const nextRest = rest.filter((_, idx) => idx !== i); // i번째 뺀 나머지
      finder(current + piece, nextRest);                   // 붙여서 재귀
    });
    // rest 비면 forEach 0번 → 저절로 멈춤
  }

  finder("", pieces);

  let count = 0;
  for (const n of found) {
    if (isPrime(n)) count++;
  }
  return count;
}

function isPrime(n) {
  if (n < 2) return false;                    // 0, 1 은 소수 아님
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;            // 하나라도 나눠지면 탈락
  }
  return true;
}
