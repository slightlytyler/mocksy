import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory as history } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage';
import undoRedoMenuState from 'store/undoRedoMenuState';
import bindStoreToMenu from 'store/bindStoreToMenu'
import rootReducer from 'reducers';

// Redux router setup
const reduxRouterMiddleware = syncHistory(history)

// Redux storage setup
const reducer = storage.reducer(rootReducer);
const engineComposers = [
  (engine) => storage.decorators.filter(engine, [
    ['templates', 'entities']
  ])
];
const engine = compose(...engineComposers)(createEngine('mocksy'));
const storageMiddleware = storage.createMiddleware(engine);
const load = storage.createLoader(engine);

const finalCreateStore = compose(
  applyMiddleware(storageMiddleware, thunk, undoRedoMenuState, reduxRouterMiddleware)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  bindStoreToMenu(store);
  load(store);

  return store;
}
