/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const _path = path.split('.');

  return function (obj) {
    if (!Object.entries(obj).length) {
      return;
    }
    return _path.reduce(function (accumulator, item) {
      if (!accumulator) {
        return accumulator;
      }

      return accumulator[item];
    }, obj);
  };
}
