import clone from 'lodash/cloneDeep';

/**
 * Recursive function to get an attribute out of a object
 * TODO
 * @param value
 * @param searchAttr
 * @param cb
 * @param path
 */
export default function findStringAttribute(value, searchAttr, cb, path = []) {
  path = clone(path);
  if (Array.isArray(value)) {
    value.map((o, key) => {
      const _path = clone(path);
      _path.push(key);
      findStringAttribute(o, searchAttr, cb, _path);
    });
  } else
  if (typeof value === 'object') {
    Object.entries(value).map(([key, val]) => {
      const _path = clone(path);
      _path.push(key);
      findStringAttribute(val, searchAttr, cb, _path);
    });
    // It is an object
  } else {
    const lastPathKey = path.pop();
    if (lastPathKey === searchAttr) {
      cb({
        path,
        lastPathKey,
      });
    }
  }
}
