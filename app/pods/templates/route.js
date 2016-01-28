import React from 'react';
import { Route, Redirect } from 'react-router';

import TemplatesDefaultRoute from 'pods/templates/default/route';
import TemplatesUserRoute from 'pods/templates/user/route';
import TemplatesNewRoute from 'pods/templates/new/route';
import TemplatesEditRoute from 'pods/templates/edit/route';

export default (dispatch, getState) => (
  <Route path="templates">
    { TemplatesDefaultRoute(dispatch, getState) }
    { TemplatesUserRoute(dispatch, getState) }
    <Redirect from="new" to="new/background" />
    { TemplatesNewRoute(dispatch, getState) }
    { TemplatesEditRoute(dispatch, getState) }
  </Route>
);