# 스택·큐 — 프로그래머스 다리를 지나는 트럭 (42583)

## 오늘 푼 문제

| 문제               | Lv  | 번호  | 결과 | JS로 굳힌 것                                                      |
| ------------------ | --- | ----- | ---- | ----------------------------------------------------------------- |
| 다리를 지나는 트럭 | 2   | 42583 | 통과 | 큐 시뮬 — 축을 "트럭"이 아니라 "1초"로. 병렬 배열로 exitTime 추적 |

## 씨름했던 지점 (JS 손번역)

| 문제 | 함정                                          | 되짚을 포인트                                                                       |
| ---- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| 다리 | 트럭 단위로 처리 + `answer++`로 트럭 수를 셈  | 구하는 건 **초**. 루프 한 바퀴 = **1초**, `answer`는 흐른 시간                      |
| 다리 | `bridge_length`를 안 씀                       | 답(초)의 재료가 `bridge_length`. 트럭 1대 건너는 시간 = `bridge_length`초           |
| 다리 | 트럭을 태우기만 하고 안 내림 → 무게 안 돌아옴 | 나갈 때 `onBridge -= 나간무게` **복구** 필수 (`leftWeight`가 줄기만 하면 버그)      |
| 다리 | 무게 조건만 체크                              | 제약 **2개** — 무게(`onBridge+w<=weight`) + 길이(`passing.length < bridge_length`)  |
| 다리 | 못 태우는 초 / 마지막 건너는 초 누락          | "1대=1초" 아님. 기다리는 초·마지막 `bridge_length`초도 흐름 → 초 루프여야 자동 반영 |
| 다리 | 객체 `{weight, exitTime}` 안 쓰고 싶음        | 병렬 배열 `passing`/`exitAt`을 같은 인덱스로. **push/shift를 둘 다 짝으로**         |

## 문제

```js
// ── 다리를 지나는 트럭 (42583) ── 병렬 배열 (0-패딩·객체 없이 진짜 트럭만)
// passing = 다리 위 트럭 무게, exitAt = 그 트럭 내릴 시각. 같은 인덱스로 짝지어 굴린다.
// 루프 한 바퀴 = 1초. 매 초: 내릴 트럭 내리고 → 올릴 수 있으면 딱 한 대.
function solution(bridge_length, weight, truck_weights) {
  const waiting = truck_weights;
  const passing = [];
  const exitAt = [];
  let onBridge = 0;
  let time = 0;

  while (passing.length || waiting.length) {
    time++;

    // 내려가기: 맨 앞 트럭의 내릴 시각이 지금이면 내린다
    if (passing.length && exitAt[0] === time) {
      onBridge -= passing.shift();
      exitAt.shift();
    }

    // 올라가기: 무게 여유(①) + 설 자리(②) 되면 한 대만
    if (
      waiting.length &&
      onBridge + waiting[0] <= weight && // ① 무게
      passing.length < bridge_length // ② 길이
    ) {
      onBridge += waiting[0];
      passing.push(waiting[0]);
      exitAt.push(time + bridge_length);
      waiting.shift();
    }
  }

  return time;
}
```

## 회고

오늘의 발견:

- 시간 축을 기반으로 while 루프를 돌려 해결하는 풀이 방식

잘한 점:

- 어제 사용한 풀이를 떠올릴 수 있었다.

불확실한 점:

- 오늘도 해결하지 못했다. 그렇지만 포기하지 말고 도전해보자!

내일부터:

- 내일도 스택큐 마저 도전!!
