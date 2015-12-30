import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import undoRedoMenuState from 'store/undoRedoMenuState';
import bindStoreToMenu from 'store/bindStoreToMenu'
import rootReducer from 'reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, undoRedoMenuState)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  bindStoreToMenu(store);

  return store;
}
