'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Spinner from 'components/Spinner';

import Sidebar from 'components/Sidebar';
import TemplateList from 'pods/template/components/List';
import TemplateTabs from 'pods/template/components/Tabs';
import ExportPanel from 'components/ExportPanel';

import PreviewArea from 'components/PreviewArea';
import AspectContainer from 'components/AspectContainer';
import TemplatePreview from 'pods/template/components/Preview';
import { computeTemplateImages } from 'pods/templates/helpers';
import ScreenshotPreview from 'pods/screenshot/components/Preview';

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
  };

  render() {
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
      setCurrentScreenshot,
      addSize,
      removeSize,
      updateSize
    } = actions;
    const { SidebarContent } = components;

    return (
      <div style={styles.base}>
        <Sidebar>
          <TemplateTabs />
          { SidebarContent }
          <TemplateList
            templates={templates}
            currentTemplate={currentTemplate}
            setCurrentTemplate={setCurrentTemplate}
          />
          <ExportPanel
            currentTemplate={currentTemplate}
            screenshot={currentScreenshot}
            sizes={sizes}
            addSize={addSize}
            removeSize={removeSize}
            updateSize={updateSize}
          />
        </Sidebar>

        <PreviewArea>
          {
            currentTemplate
            ? (
              <TemplatePreview
                dimensions={currentTemplate.dimensions}
                backgroundPath={computeTemplateImages(
                  currentTemplate.id,
                  currentTemplate.set,
                  currentTemplate.format
                ).full}
                {...currentTemplate}
              >
                <ScreenshotPreview
                  screenshot={currentScreenshot}
                  setCurrentScreenshot={setCurrentScreenshot}
                  expectedDimensions={currentTemplate.dimensions}
                />
              </TemplatePreview>
            )
            : (
              <Spinner
                text="Loading Template..."
                color={colors.pink}
              />
            )
          }
        </PreviewArea>
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    overflow: 'hidden'
  }
};