import React from 'react';
import {
  Router,
  Route,
  Redirect,
  IndexRedirect,
  hashHistory as history
} from 'react-router'

import App from 'containers/App';
import TemplatesRoute from 'pods/templates/route';

export default (store) => {
  const { dispatch, getState } = store;

  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="templates/show/default" />
        { TemplatesRoute(dispatch, getState) }
      </Route>
    </Router>
  );
}
