import React from 'react';
import { Route } from 'react-router';

import { clearNewTemplate } from 'pods/templates/actions';
import TemplatesNew from 'pods/templates/new/container';
import TemplateBuilderBackgroundContent from 'pods/template/components/Builder/Background/Content';
import TemplateBuilderBackgroundSidebar from 'pods/template/components/Builder/Background/Sidebar';
import TemplateBuilderForegroundContent from 'pods/template/components/Builder/Foreground/Content';
import TemplateBuilderForegroundSidebar from 'pods/template/components/Builder/Foreground/Sidebar';
import TemplateBuilderDetailsContent from 'pods/template/components/Builder/Details/Content';
import TemplateBuilderDetailsSidebar from 'pods/template/components/Builder/Details/Sidebar';

function onLeave(dispatch) {
  dispatch(clearNewTemplate());
}

export default (dispatch, getState) => (
  <Route path="new" component={TemplatesNew} onLeave={() => onLeave(dispatch)}>
    <Route path="background" components={{
      SidebarContent: TemplateBuilderBackgroundSidebar,
      PreviewContent: TemplateBuilderBackgroundContent
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