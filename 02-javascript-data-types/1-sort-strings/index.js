/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const _arr = [...arr];

  if (param === 'asc') {
    _arr.sort((a, b) => a.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"}));
  } else {
    _arr.sort((a, b) => b.localeCompare(a, ['ru', 'en'], {caseFirst: "upper"}));
  }

  return _arr;
}
