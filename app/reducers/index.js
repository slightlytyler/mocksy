import { combineReducers } from 'redux';
import templates from 'pods/templates/reducers';
import screenshots from 'pods/screenshots/reducers';

const rootReducer = combineReducers({
  templates,
  screenshots
});

export default rootReducer;
