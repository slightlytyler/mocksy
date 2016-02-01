import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Sidebar from 'components/Sidebar';
import TemplateList from 'pods/template/components/List';
import TemplateTabs from 'pods/template/components/Tabs';
import TemplateNewButton from 'pods/template/components/NewButton';
import ExportPanel from 'components/ExportPanel';

import PreviewArea from 'components/PreviewArea';
import TemplatePreview from 'pods/template/components/Preview';
import { computeTemplateImages } from 'pods/templates/helpers';
import ScreenshotPreview from 'pods/screenshot/components/Preview';

@Radium
export default class MockupBuilder extends Component {
  static propTypes = {
    templates: PropTypes.object,
    currentTemplate: PropTypes.object,
    currentTemplateSetId: PropTypes.string.isRequired,
    currentScreenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      setCurrentTemplate: PropTypes.func.isRequired,
      setCurrentScreenshot: PropTypes.func.isRequired,
      addSize: PropTypes.func.isRequired,
      removeSize: PropTypes.func.isRequired,
      updateSize: PropTypes.func.isRequired
    })
  };

  render() {
    const {
      templates,
      currentTemplate,
      currentTemplateSetId,
      currentScreenshot,
      sizes,
      actions
    } = this.props;
    const {
      setCurrentTemplate,
      setCurrentScreenshot,
      addSize,
      removeSize,
      updateSize
    } = actions;
    const isUserTemplateSet = currentTemplateSetId === 'user';

    return (
      <div
        className="index"
        style={styles.base}
      >
        <Sidebar>
          <TemplateTabs />

          {
            isUserTemplateSet
            && <TemplateNewButton />
          }

          <TemplateList
            templates={templates}
            currentTemplate={currentTemplate}
            setCurrentTemplate={setCurrentTemplate}
          />

          {
            currentTemplate
            && (
              <ExportPanel
                currentTemplate={currentTemplate}
                screenshot={currentScreenshot}
                sizes={sizes}
                addSize={addSize}
                removeSize={removeSize}
                updateSize={updateSize}
              />
            )
          }
        </Sidebar>

        <PreviewArea>
          {
            currentTemplate
            && (
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
          }
        </PreviewArea>
      </div>
    );
  }
}

const styles={
  base: {
    display: 'flex',
    overflow: 'hidden'
  },
}
