import React from 'react';
import { Route } from 'react-router';

import Layout from './layout';

export default (dispatch, getState) => (
  <Route path="foreground" component={Layout} />
);