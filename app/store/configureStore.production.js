import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory as history } from 'react-router'
import { syncHistory, UPDATE_LOCATION } from 'react-router-redux'
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
    ['present', 'templates', 'entities']
  ])
];
const engine = compose(...engineComposers)(createEngine('mocksy'));
const storageMiddleware = storage.createMiddleware(engine, [
  UPDATE_LOCATION
]);
const load = storage.createLoader(engine);

const finalCreateStore = compose(
  applyMiddleware(storageMiddleware),
  applyMiddleware(thunk),
  applyMiddleware(undoRedoMenuState),
  applyMiddleware(reduxRouterMiddleware)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  reduxRouterMiddleware.listenForReplays(store, state => state.present.routing.location);
  bindStoreToMenu(store);
  load(store);

  return store;
}
