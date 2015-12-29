import { expect } from 'chai';
import reducer from 'pods/templates/reducers';
import { setCurrentTemplate} from 'pods/templates/actions';

const initialState = {
  condition: {},
  entities: {}
};

const testId = 1;

const testState = {
  condition: {
    currentTemplate: testId
  },
  entities: {}
};

export default describe('reducers', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle SET_CURRENT_TEMPLATE', () => {
    expect(reducer(initialState, setCurrentTemplate(testId))).to.deep.equal(testState);
  });

  it('should handle unknown action type', () => {
    expect(reducer(initialState, { type: 'unknown' })).to.deep.equal(initialState);
    expect(reducer(testState, { type: 'unknown' })).to.deep.equal(testState);
  });
});
