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
