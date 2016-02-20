import React from 'react';
import { Route } from 'react-router';

import PreviewContent from './layouts/PreviewContent';
import SidebarContent from './layouts/SidebarContent';

export default (dispatch, getState) => (
  <Route path="foreground" components={{
    PreviewContent,
    SidebarContent
  }} />
);