/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');

  return function (obj) {
    if (!Object.entries(obj).length) {
      return;
    }

    let currentValue = obj;

    for (let key of keys) {
      if (currentValue && currentValue[key] !== undefined) {
        currentValue = currentValue[key];
      } else {
        return undefined;
      }
    }

    return currentValue;
  };
}
