# LeetCode 125 Valid Palindrome

코드:

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const text = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let first = 0;
  let end = text.length - 1;

  while (first < end) {
    if (text[first] !== text[end]) return false;
    first++;
    end--;
  }

  return true;
};
```

오늘의 발견:

- 대회 준비가 바빠 가벼운 문제를 들고왔다. 요즘 공부하는 투포인터 문제인건 같다.
- 해외 사이트에서 풀어보는 경험은 처음인데, 나름 할만한 것 같다(쉬운 문제라서 그럴 지도 모르지만).

잘한 점:

- 투포인터 문제인걸 알고 바로 해결했다.

불확실한 점:

- 처음에 위치 잡는게 헷갈렸다. end를 +해줬었는데 이 경우 변환한 문자열의 길이가 2일때 오류가 발생할 수 있었다.

내일부터:

- 내일도 마찬가지로 가벼운 문제를 도전해보려고 한다.
