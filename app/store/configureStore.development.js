import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory as history } from 'react-router'
import { syncHistory, UPDATE_LOCATION, TRANSITION } from 'react-router-redux'
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage';

import undoRedoMenuState from 'store/undoRedoMenuState';
import bindStoreToMenu from 'store/bindStoreToMenu'
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';

// Redux router setup
const reduxRouterMiddleware = syncHistory(history)

// Redux storage setup
const reducer = storage.reducer(rootReducer);
const engineComposers = [
  (engine) => storage.decorators.filter(engine, [
    ['present', 'templates', 'records'],
    ['present', 'templates', 'newRecord']
  ])
];
const engine = compose(...engineComposers)(createEngine('mocksy'));
const storageMiddleware = storage.createMiddleware(engine, [
  UPDATE_LOCATION,
  TRANSITION,
  // 'UPDATE_NEW_TEMPLATE'
]);
const load = storage.createLoader(engine);

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(reduxRouterMiddleware),
  applyMiddleware(storageMiddleware),
  applyMiddleware(undoRedoMenuState),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  reduxRouterMiddleware.listenForReplays(store, state => state.present.routing.location);
  bindStoreToMenu(store);
  load(store);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
