import { size } from 'lodash';

// Takes a set with sequential numerical ideas
// and returns the next in the sequence
export default (set) =>
  size(set) > 1 ?
  reduce(set, (a, b) =>
    a.id > b.id ? a : b
  ).id + 1 :
  set[Object.keys(set)[0]].id + 1;
