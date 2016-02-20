import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import remote from 'remote';

import routes from './routes';
import configureStore from 'store/configureStore';
import { initialState } from 'config';
import './app.css';

const store = configureStore({
  present: initialState
});

render(
  <Provider store={store}>
    { routes(store) }
  </Provider>,
  document.getElementById('root')
);

// Remove all listeners on reload
window.onbeforeunload = function(e) {
  const win = remote.getCurrentWindow();

  win.removeAllListeners();
  e.returnValue = true;
};

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
