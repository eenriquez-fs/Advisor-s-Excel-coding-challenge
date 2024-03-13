'use client'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function updateSearchParam (searchParams, param, value) {
  const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
  currentSearchParams.set(param, value);
  console.log('CURRENT_SP', currentSearchParams.toString());
  return currentSearchParams;
  }

const camelizeKeys = (obj) =>
  Array.isArray(obj)
    ? obj.map(camelizeKeys)
    : typeof obj === 'object' && obj !== null
    ? Object.keys(obj).reduce((camelized, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelized[camelKey] = camelizeKeys(obj[key]);
        return camelized;
      }, {})
    : obj;

const decamelizeKeys = (obj) =>
  Array.isArray(obj)
    ? obj.map(decamelizeKeys)
    : typeof obj === 'object' && obj !== null
    ? Object.keys(obj).reduce((decamelized, key) => {
        const underscoreKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        decamelized[underscoreKey] = decamelizeKeys(obj[key]);
        return decamelized;
      }, {})
    : obj;


  const removeObjectKey = (obj, keyToRemove) => {
    if (obj.hasOwnProperty(keyToRemove)) {
      const { [keyToRemove]: _, ...rest } = obj;
      return rest;
    }
    return obj;
  };

module.exports = {
  classNames,
  updateSearchParam,
  camelizeKeys,
  decamelizeKeys,
  removeObjectKey
}