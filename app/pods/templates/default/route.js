import React from 'react';
import { Route } from 'react-router';

import MockupBuilder from 'pods/mockup/builder/container';

export default (dispatch, getState) => (
  <Route path="default" component={MockupBuilder} />
);