/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let first = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let end = 0; end < nums.length; end++) {
    sum += nums[end];

    while (sum >= target) {
      minLength = Math.min(minLength, end - first + 1);
      sum -= nums[first];
      first++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
};
