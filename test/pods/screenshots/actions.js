import { expect } from 'chai';
import { setCurrentScreenshot } from 'pods/screenshots/actions';
import { actionTypes } from 'pods/screenshots/constants';
const { SET_CURRENT_SCREENSHOT } = actionTypes;

export default describe('actions', () => {
  it('setCurrentScreenshot should create a SET_CURRENT_SCREENSHOT action', () => {
    let path = '/path/to/test';

    expect(setCurrentScreenshot(path)).to.deep.equal({ type: SET_CURRENT_SCREENSHOT, path });
  });
});
