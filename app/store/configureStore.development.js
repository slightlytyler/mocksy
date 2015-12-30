import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import undoRedoMenuState from 'store/undoRedoMenuState';
import bindStoreToMenu from 'store/bindStoreToMenu'
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';

const finalCreateStore = compose(
  applyMiddleware(thunk, undoRedoMenuState),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  bindStoreToMenu(store);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
