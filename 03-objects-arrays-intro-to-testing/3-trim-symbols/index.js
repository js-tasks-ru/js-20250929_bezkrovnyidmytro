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

  const split = string.split('');

  let result = '';
  let temp = '';

  for (let i = 0; i < split.length; i++) {
    const _char = split[i];
    if (temp.includes(_char)) {
      temp += _char;
    } else {
      result += temp.slice(0, size);
      temp = '';
      temp += _char;
    }
    if (i === (split.length - 1)) {
      result += temp.slice(0, size);
    }
  }

  return result;
}
