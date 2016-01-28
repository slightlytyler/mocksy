import { expect } from 'chai';
import reducer from 'pods/screenshots/reducers';
import { setCurrentScreenshot } from 'pods/screenshots/actions';

const initialState = {
  condition: {},
  records: {}
};

const testPath = '/path/to/test';

const testState = {
  condition: {
    currentScreenshot: testPath
  },
  records: {}
};

export default describe('reducers', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle SET_CURRENT_SCREENSHOT', () => {
    expect(reducer(initialState, setCurrentScreenshot(testPath))).to.deep.equal(testState);
  });

  it('should handle unknown action type', () => {
    expect(reducer(initialState, { type: 'unknown' })).to.deep.equal(initialState);
    expect(reducer(testState, { type: 'unknown' })).to.deep.equal(testState);
  });
});
