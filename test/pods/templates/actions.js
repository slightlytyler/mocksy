import { expect } from 'chai';
import { setCurrentTemplate } from 'pods/templates/actions';
import { actionTypes } from 'pods/templates/constants';
const { SET_CURRENT_TEMPLATE } = actionTypes;

export default describe('actions', () => {
  it('setCurrentTemplate should create a SET_CURRENT_TEMPLATE action', () => {
    let id = 1;

    expect(setCurrentTemplate(id)).to.deep.equal({ type: SET_CURRENT_TEMPLATE, id });
  });
});
