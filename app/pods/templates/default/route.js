import React from 'react';
import { Route } from 'react-router';

import Container from './container';

export default (dispatch, getState) => (
  <Route path="default" component={Container} />
);