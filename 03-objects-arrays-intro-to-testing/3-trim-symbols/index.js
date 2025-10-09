/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  if (!size) {
    return string;
  }

  let result = '';
  let temp = '';

  for (const charIndex in string) {
    const char = string[charIndex];
    if (temp.includes(char)) {
      temp += char;
    } else {
      result += temp.slice(0, size);
      temp = '';
      temp += char;
    }
    if (Number(charIndex) === string.length - 1) {
      result += temp.slice(0, size);
    }
  }

  return result;
}
