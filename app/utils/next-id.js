import { size, reduce } from 'lodash';

// Takes a set with sequential numerical ideas
// and returns the next in the sequence
export default function nextId(set) {
  const hasRecords = size(set) > 0;

  if (hasRecords) {
    return reduce(set, (a, b) =>
      a.id > b.id ? a : b
    ).id + 1
  } else {
    return 0;
  }
}
