import React from 'react';
import { Route } from 'react-router';

import TemplateNewButton from 'pods/template/components/NewButton';

export default (dispatch, getState) => (
  <Route
    path="user"
    components={{
      SidebarContent: TemplateNewButton
    }}
  />
);