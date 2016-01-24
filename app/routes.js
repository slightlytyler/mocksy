import React from 'react';
import { Router, Route, IndexRoute, hashHistory as history } from 'react-router'

import App from 'containers/App';
import Index from 'pods/index/container';
import TemplatesNew from 'pods/templates/new/container';

export default (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} currentTemplateSetId="default" />

      <Route path="templates">
        <Route path="default" component={Index} currentTemplateSetId="default" />
        <Route path="user" component={Index} currentTemplateSetId="user" />
        <Route path="new" component={TemplatesNew} />
      </Route>

      <Route path="/templates/new" component={TemplatesNew} />
    </Route>
  </Router>
);
