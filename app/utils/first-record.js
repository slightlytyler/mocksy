import { size, reduce } from 'lodash';

export default function(records, prop) {
  return size(records) !== 0
    ? reduce(records, (a, b) => a[prop] <= b[prop] ? a : b)
    : {};
};