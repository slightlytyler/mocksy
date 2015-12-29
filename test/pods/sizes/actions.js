import { expect } from 'chai';
import {
  addSize,
  removeSize,
  updateSize
} from 'pods/sizes/actions';
import { actionTypes } from 'pods/sizes/constants';
const {
  ADD_SIZE,
  REMOVE_SIZE,
  UPDATE_SIZE
} = actionTypes;


export default describe('actions', () => {
  it('addSize should create an ADD_SIZE action', () => {
    expect(addSize()).to.deep.equal({ type: ADD_SIZE });
  });

  it('removeSize should create an REMOVE_SIZE action', () => {
    let id = 1;

    expect(removeSize(id)).to.deep.equal({
      type: REMOVE_SIZE,
      id
    });
  });

  it('updateSize should create an UPDATE_SIZE action', () => {
    let id = 1;
    let props = { test: 'test' };

    expect(updateSize(id, props)).to.deep.equal({
      type: UPDATE_SIZE,
      id,
      props
    });
  });
});
