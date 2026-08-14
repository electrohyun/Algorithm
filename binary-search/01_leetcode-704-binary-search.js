/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let first = 0;
  let end = nums.length - 1;

  while (first <= end) {
    const middle = Math.floor((first + end) / 2);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[middle] < target) {
      first = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return -1;
};
