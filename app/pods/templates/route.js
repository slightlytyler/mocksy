import React from 'react';
import { Route, Redirect } from 'react-router';

import TemplatesShowRoute from 'pods/templates/show/route'
import TemplatesNewRoute from 'pods/templates/new/route';
import TemplatesEditRoute from 'pods/templates/edit/route';

export default (dispatch, getState) => (
  <Route path="templates">
    { TemplatesShowRoute(dispatch, getState) }
    <Redirect from="new" to="new/background" />
    { TemplatesNewRoute(dispatch, getState) }
    { TemplatesEditRoute(dispatch, getState) }
  </Route>
);