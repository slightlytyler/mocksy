import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './pods/index/component';
import Counter from './pods/counter/container';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/counter" component={Counter} />
  </Route>
);
