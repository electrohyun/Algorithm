# 프로그래머스 178870 연속된 부분 수열의 합

코드:

```js
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
```

오늘의 발견:

- 투포인터 문제 푸는 방법을 배웠다.

잘한 점:

- for문을 세 개 사용해 푸는 데에는 성공했는데, 시간 초과로 틀렸다.

불확실한 점:

- 처음 푼 문제는 좋은 알고리즘이 아니었다.
- 점점 갈수록 이런 알고리즘을 바로 못 떠올린다고? 하는 생각도 든다.
- 그렇지만 많은 알고리즘은 위대한 사람들이 시간을 들여 만들어낸 결과이다.
- 그렇기에 내가 한번에 못 떠올린다고 자책할 게 아니라고 생각한다.
- 내가 코테를 풀면서 할 일은 그 방법을 수용하고 받아들여 활용하면서 문제해결 능력을 기르는 것이라 생각한다.

내일부터:

- 포기하지 말고 투포인터 한번 더!!
