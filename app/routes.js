import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Index from 'pods/index/container';
import TemplatesNew from 'pods/templates/new/container';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/templates/new" component={TemplatesNew} />
  </Route>
);
