import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
const remote = require('remote');
const app = remote.require('app');
const menu = remote.require('menu');
import { ActionCreators as undoRedoActions } from 'redux-undo';
import routes from './routes';
import configureStore from 'store/configureStore';
import './app.css';

import baseTemplates from 'constants/base-templates';

const store = configureStore({present: {
  templates: {
    condition: {
      currentTemplate: 'iPhone_6'
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
        multiplier: '1x',
        suffix: '',
        format: 'png'
      }
    }
  }
}});


function bindStoreToMenu() {
  let appMenu = menu.getApplicationMenu();
  let editSubMenu = appMenu.items[1].submenu;
  let undoRedoMenu = menu.buildFromTemplate([
    {
      label: 'Undo',
      accelerator: 'Command+Z',
      selector: 'undo:',
      click() {
        store.dispatch(undoRedoActions.undo());
      }
    },
    {
      label: 'Redo',
      accelerator: 'Shift+Command+Z',
      selector: 'redo:',
      click() {
        store.dispatch(undoRedoActions.redo());
      }
    }
  ]);

  editSubMenu.insert(0, undoRedoMenu.items[0]);
  editSubMenu.insert(1, undoRedoMenu.items[1]);
}

bindStoreToMenu();

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
