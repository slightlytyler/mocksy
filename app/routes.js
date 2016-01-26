import React from 'react';
import {
  Router,
  Route,
  Redirect,
  IndexRedirect,
  hashHistory as history
} from 'react-router'

import App from 'containers/App';

import MockupBuilder from 'pods/mockup/builder/container';

import TemplatesNew from 'pods/templates/new/container';
import TemplatesNewAddBackground from 'pods/templates/new/add-background/container';
import TemplatesNewSetForeground from 'pods/templates/new/set-foreground/container';
import TemplatesNewAddDetails from 'pods/templates/new/set-foreground/container';

export default (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRedirect to="templates/default" />

      <Route path="templates">
        <Route path="default" component={MockupBuilder} />
        <Route path="user" component={MockupBuilder} />

        <Redirect from="new" to="new/add-background" />
        <Route path="new">
          <Route path="add-background" component={TemplatesNewAddBackground} />
          <Route path="set-foreground" component={TemplatesNewSetForeground} />
          <Route path="add-details" component={TemplatesNewAddDetails} />
        </Route>
      </Route>
    </Route>
  </Router>
);
