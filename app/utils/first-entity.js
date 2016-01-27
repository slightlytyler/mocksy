import { size, reduce } from 'lodash';

export default function(entities, prop) {
  return size(entities) !== 0
    ? reduce(entities, (a, b) => a[prop] <= b[prop] ? a : b)
    : {};
};