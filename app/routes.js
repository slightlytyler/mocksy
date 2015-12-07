import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Index from './pods/index/container';
import Counter from './pods/counter/container';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/counter" component={Counter} />
  </Route>
);
