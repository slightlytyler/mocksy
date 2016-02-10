'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Spinner from 'components/Spinner';

import BuilderLayout from 'layouts/Builder';

import TemplateList from 'pods/template/components/List';
import TemplateTabs from 'pods/template/components/Tabs';
import ExportPanel from 'components/ExportPanel';

import { computeTemplateImages } from 'pods/templates/helpers';
import TemplatePreview from 'pods/template/components/Preview';
import ScreenshotPreview from 'pods/screenshot/components/Preview';
import ScreenshotAddPrompt from 'pods/screenshot/components/AddPrompt';

@Radium
export default class TemplatesShowLayout extends Component {
  static propTypes = {
    templates: PropTypes.object,
    currentTemplate: PropTypes.object,
    currentScreenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      setCurrentTemplate: PropTypes.func.isRequired,
      setCurrentScreenshot: PropTypes.func.isRequired,
      addSize: PropTypes.func.isRequired,
      removeSize: PropTypes.func.isRequired,
      updateSize: PropTypes.func.isRequired
    }),
    components: PropTypes.shape({
      SidebarContent: PropTypes.object
    })
  }

  renderSidebar = () => {
    const {
      templates,
      currentTemplate,
      currentScreenshot,
      sizes,
      actions,
      components
    } = this.props;
    const {
      setCurrentTemplate,
      addSize,
      removeSize,
      updateSize
    } = actions;
    const { SidebarContent } = components;

    return (
      <div>
        <TemplateTabs />
        { SidebarContent }
        <TemplateList
          templates={templates}
          currentTemplate={currentTemplate}
          setCurrentTemplate={setCurrentTemplate}
        />
        <ExportPanel
          template={currentTemplate}
          screenshot={currentScreenshot}
          sizes={sizes}
          addSize={addSize}
          removeSize={removeSize}
          updateSize={updateSize}
        />
      </div>
    );
  }

  renderPreview = () => {
    const {
      currentTemplate,
      currentScreenshot,
      actions,
    } = this.props;
    const {
      setCurrentScreenshot,
    } = actions;

    if (currentTemplate) {
      return (
        <TemplatePreview
          backgroundPath={computeTemplateImages(
            currentTemplate.id,
            currentTemplate.set,
            currentTemplate.format
          ).full}
          dimensions={currentTemplate.dimensions}
        >
          <ScreenshotPreview
            screenshot={currentScreenshot}
            dimensions={currentTemplate.dimensions.foreground}
          />
          <ScreenshotAddPrompt
            dimensions={currentTemplate.dimensions.foreground}
            transparent={!!currentScreenshot}
            setCurrentScreenshot={setCurrentScreenshot}
          />
        </TemplatePreview>
      );
    }
    else {
      return (
        <Spinner
          text="Loading Template..."
          color={colors.pink}
        />
      );
    }
  }

  render() {
    return (
      <BuilderLayout
        SidebarContent={this.renderSidebar()}
        PreviewContent={this.renderPreview()}
      />
    );
  }
}

const styles = {
};