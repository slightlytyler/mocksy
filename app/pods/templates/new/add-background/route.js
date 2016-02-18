import React from 'react';
import { Route } from 'react-router';

import { clearNewTemplate } from 'pods/templates/actions';
import PreviewContent from './layouts/PreviewContent';
import SidebarContent from './layouts/SidebarContent';

function onEnter(dispatch) {
  dispatch(clearNewTemplate());
}

export default (dispatch, getState) => (
  <Route
    path="background"
    components={{
      PreviewContent,
      SidebarContent
    }}
    onEnter={() => onEnter(dispatch)}
  />
);