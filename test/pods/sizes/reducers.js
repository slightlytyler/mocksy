import { expect } from 'chai';
import assignDeep from 'assign-deep';
import reducer from 'pods/sizes/reducers';
import { actionTypes } from 'pods/sizes/constants';
const {
  ADD_SIZE,
  REMOVE_SIZE,
  UPDATE_SIZE
} = actionTypes;

const initialState = {
  condition: {},
  entities: {}
};

const oneSizeState = Object.assign({}, initialState, {
  entities: {
    0: {
      format: 'png',
      id: 0,
      multiplier: '1x',
      suffix: ''
    }
  }
});

const twoSizeState = assignDeep({}, oneSizeState, {
  entities: {
    1: {
      format: 'png',
      id: 1,
      multiplier: '1x',
      suffix: ''
    }
  }
});

const threeSizeState =  assignDeep({}, twoSizeState, {
  entities: {
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
    expect(reducer(initialState, { type: ADD_SIZE })).to.deep.equal(oneSizeState);
    expect(reducer(oneSizeState, { type: ADD_SIZE })).to.deep.equal(twoSizeState);
    expect(reducer(twoSizeState, { type: ADD_SIZE })).to.deep.equal(threeSizeState);
  });

  it('should handle REMOVE_SIZE', () => {
    let id = 1;

    expect(reducer(twoSizeState, { type: REMOVE_SIZE, id })).to.deep.equal(oneSizeState);
  });

  it('should handle UPDATE_SIZE', () => {
    let id = 0;
    let props = { format: 'jpg' };

    expect(reducer(oneSizeState, { type: UPDATE_SIZE, id, props })).to.deep.equal(
      assignDeep({}, oneSizeState, {
        entities: {
          0: { ...props }
        }
      })
    );
  });

  it('should handle unknown action type', () => {
    expect(reducer(oneSizeState, { type: 'unknown' })).to.deep.equal(oneSizeState);
  });
});
