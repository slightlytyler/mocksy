import { combineReducers } from 'redux';
import counter from 'pods/counter/reducers';

const rootReducer = combineReducers({
  counter
});

export default rootReducer;
