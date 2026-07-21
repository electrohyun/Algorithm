# JS 손풀기 Day10 — 프로그래머스 (스택·큐)

- 오랜만에 돌아온 스택
- 80%정도 까지는 풀었지만 20%가 아쉬웠다.
- 손으로 쓰는 건 좋지만 완성까지 가는게 어렵고 아쉽다. 이번 주말에 더 공부해봐야 할 듯

## 오늘 푼 문제

| 문제     | Lv  | 번호  | 결과 | JS로 굳힌 것                                        |
| -------- | --- | ----- | ---- | --------------------------------------------------- |
| 기능개발 | 2   | 42586 | 통과 | 큐 시뮬레이션 — `shift` 배포 + `map` 재할당 하루 tick |

## 씨름했던 지점 (JS 손번역)

| 문제     | 함정                                            | 되짚을 포인트                                                    |
| -------- | ----------------------------------------------- | --------------------------------------------------------------- |
| 기능개발 | inner while에서 `shift`하며 `tempIdx+1`로 추적   | `shift`는 배열을 앞으로 당김 → 배포 후보는 **언제나 `[0]`**, 인덱스 변수 불필요 |
| 기능개발 | `map` 결과를 안 담아 진도가 안 올라 무한루프     | `map`은 **원본 불변** → `arr = arr.map(...)` 재할당해야 하루 tick 반영 |
| 기능개발 | 바깥 while이 "언제"를 뜻하는지 안 정함           | 한 바퀴 = **하루**: 전체 진도 `+= speed` → 앞에서부터 100 넘는 만큼 flush |
| 기능개발 | (더 예쁜 길) 매일 시뮬레이션                     | `Math.ceil((100-p)/s)`로 **완료일 환산** → 상태 없이 O(n) 그룹핑 |

## 문제

```js
// ── 기능개발 (42586) ── 큐 시뮬레이션
// 앞 작업이 끝나야 뒤 작업 배포. 매일 전체 진도 += speed, 앞에서부터 100 넘는 만큼 몰아서 배포.
function solution(progresses, speeds) {
  const answer = [];

  let progressesQueue = progresses;
  let speedsQueue = speeds;

  while (true) {
    if (progressesQueue.length === 0) break;

    if (progressesQueue[0] >= 100) {
      let deployCount = 1;
      progressesQueue.shift();
      speedsQueue.shift();

      // 근데 다음 것도 배포 가능하면...
      while (progressesQueue[0] >= 100) {
        // 끝에 다다르면 종료. 안전하게 먼저 체크
        if (progressesQueue.length <= 0) {
          break;
        }

        deployCount += 1;
        progressesQueue.shift();
        speedsQueue.shift();
      }

      // 순회 끝
      answer.push(deployCount);
      deployCount = 0;
    } else {
      // 계산방식 때문에 해당 speeds 엘리먼트도 날려야함
      progressesQueue = progressesQueue.map(
        (item, index) => item + speedsQueue[index],
      );
    }
  }

  return answer;
}
```


## 회고

오늘의 발견:

- 스택 할만하다
- map은 원본을 바꾸지 않으니 다른 상수에 저장하는 테크닉
- 문제를 작은 수로 축소시켜 다룬다는 생각
- 상태를 가져가지 않아도 된다는 점

잘한 점:

- 발상 자체는 맞았다.

불확실한 점:

- 완성이 아쉽다.

내일부터:

- 또 스택/큐 문제에 도전해보려 한다.
