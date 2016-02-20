import React from 'react';
import { Route } from 'react-router';

import TemplatesDefaultRoute from './default/route';
import TemplatesUserRoute from './user/route';

import TemplatesShowContainer from './container';

export default (dispatch, getState) => (
  <Route path="show" component={TemplatesShowContainer}>
    { TemplatesDefaultRoute(dispatch, getState) }
    { TemplatesUserRoute(dispatch, getState) }
  </Route>
);