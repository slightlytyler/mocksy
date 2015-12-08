import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';

import baseTemplates from 'constants/base-templates';

const store = configureStore({
  templates: {
    condition: {
      currentTemplate: 'iPhone-6'
    },

    entities: {
      ...baseTemplates
    }
  },

  screenshots: {
    condition: {
      currentScreenshot: null
    },

    entities: {

    }
  },

  sizes: {
    condition: {

    },

    entities: {
      0: {
        id: 0,
        multiplier: 1,
        suffix: '',
        format: 'png'
      }
    }
  }
});

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
