'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import TemplateList from 'pods/template/components/List';
import TemplateTabs from 'pods/template/components/Tabs';
import TemplateNewButton from 'pods/template/components/NewButton';
import ExportPanel from 'components/ExportPanel';

@Radium
export default class MockupBuilderSidebar extends Component {
  static propTypes = {
    templates: PropTypes.object.isRequired,
    currentTemplate: PropTypes.object.isRequired,
    currentTemplateSetId: PropTypes.string.isRequired,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired,
    setCurrentTemplate: PropTypes.func.isRequired,
    addSize: PropTypes.func.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  render() {
    const {
      templates,
      currentTemplate,
      currentTemplateSetId,
      screenshot,
      sizes,
      setCurrentTemplate,
      setCurrentTemplateSet,
      addSize,
      removeSize,
      updateSize
    } = this.props;
    const isUserTemplateSet = currentTemplateSetId === 'user';

    return (
      <section
        className="sidebar"
        style={styles.base}
      >
        <TemplateTabs />

        {
          isUserTemplateSet &&
          <TemplateNewButton />
        }

        <TemplateList
          templates={templates}
          currentTemplate={currentTemplate}
          setCurrentTemplate={setCurrentTemplate}
        />

        <ExportPanel
          currentTemplate={currentTemplate}
          screenshot={screenshot}
          sizes={sizes}
          addSize={addSize}
          removeSize={removeSize}
          updateSize={updateSize}
        />
      </section>
    );
  }
}

const styles = {
    base: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 4,
      position: 'relative',
      height: '100vh',
      background: colors.featureGradient,
      boxShadow: 'rgba(0, 0, 0, 0.25) 2px 0 4px'
    }
  };