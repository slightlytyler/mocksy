import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import templates from 'pods/templates/reducers';
import screenshots from 'pods/screenshots/reducers';
import sizes from 'pods/sizes/reducers'

const rootReducer = combineReducers({
  templates,
  screenshots,
  sizes
})
const undoableReducer = undoable(rootReducer, {
  limit: 10,
});

export default undoableReducer;
