import { expect } from 'chai';
import assignDeep from 'assign-deep';
import reducer from 'pods/sizes/reducers';
import {
  addSize,
  removeSize,
  updateSize
} from 'pods/sizes/actions';

const initialState = {
  condition: {},
  records: {}
};

const oneSizeState = Object.assign({}, initialState, {
  records: {
    0: {
      format: 'png',
      id: 0,
      multiplier: '1x',
      suffix: ''
    }
  }
});

const twoSizeState = assignDeep({}, oneSizeState, {
  records: {
    1: {
      format: 'png',
      id: 1,
      multiplier: '1x',
      suffix: ''
    }
  }
});

const threeSizeState =  assignDeep({}, twoSizeState, {
  records: {
    2: {
      format: 'png',
      id: 2,
      multiplier: '1x',
      suffix: ''
    }
  }
});

export default describe('reducers', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle ADD_SIZE', () => {
    expect(reducer(initialState, addSize())).to.deep.equal(oneSizeState);
    expect(reducer(oneSizeState, addSize())).to.deep.equal(twoSizeState);
    expect(reducer(twoSizeState, addSize())).to.deep.equal(threeSizeState);
  });

  it('should handle REMOVE_SIZE', () => {
    let id = 1;

    expect(reducer(twoSizeState, removeSize(id))).to.deep.equal(oneSizeState);
  });

  it('should handle UPDATE_SIZE', () => {
    let id = 0;
    let props = { format: 'jpg' };

    expect(reducer(oneSizeState, updateSize(id, props))).to.deep.equal(
      assignDeep({}, oneSizeState, {
        records: {
          0: { ...props }
        }
      })
    );
  });

  it('should handle unknown action type', () => {
    expect(reducer(oneSizeState, { type: 'unknown' })).to.deep.equal(oneSizeState);
  });
});
