// ============================================================
// Day 7 — 프로그래머스로 JS 손풀기 (백준 섭종 → 플랫폼 전환)
// ============================================================
// 규칙: 새 알고리즘 X. 아는 쉬운 문제를 JS로 반사적으로 푸는 워밍업.
//       채점은 프로그래머스 사이트에서. 여기엔 통과한 풀이만 정리.
//   p1  문자열 뒤집기        (Lv0, 120822)  split/reverse/join
//   p2  K번째수             (Lv1, 42748)   slice + 정렬 comparator + 1-based 보정
//   p3  문자열 내 마음대로 정렬 (Lv1, 12915)   다중 키 정렬 comparator (문자열 부등호 비교)
//   p4  완주하지 못한 선수    (Lv1, 42576)   — 너무 많이 풀어봐서 제외
// ============================================================

// ── p1) 문자열 뒤집기 ── "jaron" -> "noraj"
//   split('') 로 배열화 → reverse → join('')
function p1(my_string) {
  return my_string.split("").reverse().join("");
}

// ── p2) K번째수 ──
//   commands 의 [i, j, k] 마다: array 를 i~j 로 자르고 정렬 → k번째.
//   함정: 문제는 1-based, JS 는 0-based. slice 는 끝을 포함 안 함.
//        → 시작만 -1, 끝(j)은 그대로. k번째는 인덱스 k-1.
function p2(array, commands) {
  const answer = [];

  for (const [firstIndex, lastIndex, targetIndex] of commands) {
    answer.push(
      array.slice(firstIndex - 1, lastIndex).sort((a, b) => a - b)[
        targetIndex - 1
      ],
    );
  }

  return answer;
}

// ── p3) 문자열 내 마음대로 정렬하기 ──
//   n번째 글자 기준 오름차순, 같으면 문자열 전체 사전순.
//   함정1: comparator 는 불리언(<) 이 아니라 "숫자"(-1/0/1)를 리턴해야 한다.
//   함정2: 문자/문자열은 부등호로 바로 사전순 비교된다 (charCode 불필요).
function p3(strings, n) {
  return strings.sort((a, b) => {
    if (a[n] < b[n]) return -1;
    if (a[n] > b[n]) return 1;
    if (a < b) return -1; // n번째 글자 동점 → 전체 문자열로 판정
    if (a > b) return 1;
    return 0;
  });
}
