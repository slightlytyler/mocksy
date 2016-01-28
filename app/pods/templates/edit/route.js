import React from 'react';
import { Route } from 'react-router';

import TemplatesEdit from 'pods/templates/edit/container';
import TemplateBuilderBackgroundContent from 'pods/template/components/Builder/Background/Content';
import TemplateBuilderBackgroundSidebar from 'pods/template/components/Builder/Background/Sidebar';
import TemplateBuilderForegroundContent from 'pods/template/components/Builder/Foreground/Content';
import TemplateBuilderForegroundSidebar from 'pods/template/components/Builder/Foreground/Sidebar';
import TemplateBuilderDetailsContent from 'pods/template/components/Builder/Details/Content';
import TemplateBuilderDetailsSidebar from 'pods/template/components/Builder/Details/Sidebar';

export default (dispatch, getState) => (
  <Route path="edit/:templateId" component={TemplatesEdit}>
    <Route path="background" components={{
      content: TemplateBuilderBackgroundContent,
      sidebar: TemplateBuilderBackgroundSidebar
    }} />
    <Route path="foreground" components={{
      content: TemplateBuilderForegroundContent,
      sidebar: TemplateBuilderForegroundSidebar
    }} />
    <Route path="details" components={{
      content: TemplateBuilderDetailsContent,
      sidebar: TemplateBuilderDetailsSidebar
    }} />
  </Route>
);