import { combineReducers } from 'redux';
import templates from 'pods/templates/reducers';
import screenshots from 'pods/screenshots/reducers';
import sizes from 'pods/sizes/reducers'

const rootReducer = combineReducers({
  templates,
  screenshots,
  sizes
});

export default rootReducer;
