import React from 'react';
import { Route } from 'react-router';

import PreviewContent from './layouts/PreviewContent';
import SidebarContent from './layouts/SidebarContent';

export default (dispatch, getState) => (
  <Route path="details" components={{
    PreviewContent,
    SidebarContent
  }} />
);