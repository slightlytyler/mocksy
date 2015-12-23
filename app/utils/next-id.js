import { size, reduce } from 'lodash';

// Takes a set with sequential numerical ideas
// and returns the next in the sequence
export default function nextId(set) {
  const hasEntities = size(set) > 0;
  const hasMultipleEntities = size(set) > 1;

  if (hasEntities) {
    if (hasMultipleEntities) {
      return reduce(set, (a, b) =>
        a.id > b.id ? a : b
      ).id + 1
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}
