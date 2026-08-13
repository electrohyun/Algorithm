/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let first = 0;
  let end = numbers.length - 1;

  while (first < end) {
    const sum = numbers[first] + numbers[end];

    if (sum === target) {
      return [first + 1, end + 1];
    }

    if (sum < target) {
      first++;
    } else {
      end--;
    }
  }
};
