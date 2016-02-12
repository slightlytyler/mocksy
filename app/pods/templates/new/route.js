import React from 'react';
import { Route } from 'react-router';

import { clearNewTemplate } from 'pods/templates/actions';
import Container from './container';

import addBackgroundRoute from './add-background/route';
import setForegroundRoute from './set-foreground/route';
import addDetailsRoute from './add-details/route';

function onLeave(dispatch) {
  dispatch(clearNewTemplate());
}

export default (dispatch, getState) => (
  <Route path="new" component={Container} onLeave={() => onLeave(dispatch)}>
    {addBackgroundRoute(dispatch, getState)}
    {setForegroundRoute(dispatch, getState)}
    {addDetailsRoute(dispatch, getState)}
  </Route>
);