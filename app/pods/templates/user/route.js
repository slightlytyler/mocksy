import React from 'react';
import { Route } from 'react-router';

import TemplatesDefaultContainer from 'pods/templates/default/container';

export default (dispatch, getState) => (
  <Route path="user" component={TemplatesDefaultContainer} />
);