import React from 'react';
import {
  Router,
  Route,
  Redirect,
  IndexRedirect,
  hashHistory as history
} from 'react-router'

import App from 'containers/App';

import MockupBuilder from 'pods/mockup/builder/container';

import TemplatesNew from 'pods/templates/new/container';
import TemplatesEdit from 'pods/templates/edit/container';

import TemplateBuilderBackgroundContent from 'pods/template/components/Builder/Background/Content';
import TemplateBuilderBackgroundSidebar from 'pods/template/components/Builder/Background/Sidebar';

export default (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRedirect to="templates/default" />

      <Route path="templates">
        <Route path="default" component={MockupBuilder} />
        <Route path="user" component={MockupBuilder} />

        <Redirect from="new" to="new/background" />
        <Route path="new" component={TemplatesNew}>
          <Route path="background" components={{
            content: TemplateBuilderBackgroundContent,
            sidebar: TemplateBuilderBackgroundSidebar
          }} />
          <Route path="foreground" components={{
            content: TemplateBuilderBackgroundContent,
            sidebar: TemplateBuilderBackgroundSidebar
          }} />
          <Route path="details" components={{
            content: TemplateBuilderBackgroundContent,
            sidebar: TemplateBuilderBackgroundSidebar
          }} />
        </Route>

        <Route path="edit/:templateId" component={TemplatesEdit}>
          <Route path="background" />
          <Route path="foreground" />
          <Route path="details" />
        </Route>
      </Route>
    </Route>
  </Router>
);
