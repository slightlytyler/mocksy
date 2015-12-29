import { expect } from 'chai';
import nextId from 'utils/next-id';

describe('nextId', () => {
  const emptySet = {

  }
  const baseSet = {
    0: {
      id: 0,
      attr: 'test'
    }
  };

  const twoSet = Object.assign({}, baseSet, {
    1: {
      id: 1,
      attr: 'test'
    }
  });

  const threeSet = Object.assign({}, twoSet, {
    2: {
      id: 2,
      attr: 'test'
    }
  });

  const setFromOne = {
    1: {
      id: 1,
      attr: 'test'
    }
  };

  const setFromTwo = {
    2: {
      id: 2,
      attr: 'test'
    }
  };

  it('should increment baseSet correctly', () => {
    let id = nextId(baseSet);

    expect(id).to.equal(1);
  });

  it('should increment emptySet correctly', () => {
    let id = nextId(emptySet);

    expect(id).to.equal(0);
  });

  it('should increment twoSet correctly', () => {
    let id = nextId(twoSet);

    expect(id).to.equal(2);
  });

  it('should increment threeSet correctly', () => {
    let id = nextId(threeSet);

    expect(id).to.equal(3);
  });

  it('should increment setFromOne correctly', () => {
    let id = nextId(setFromOne);

    expect(id).to.equal(2);
  });

  it('should increment setFromTwo correctly', () => {
    let id = nextId(setFromTwo);

    expect(id).to.equal(3);
  });
});