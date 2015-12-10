'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import TemplateList from './template-list/component';
import ExportPanel from './export-panel/component';

@Radium
export default class IndexSideBar extends Component {
  static propTypes = {
    templates: PropTypes.object.isRequired,
    currentTemplate: PropTypes.object.isRequired,
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
      screenshot,
      sizes,
      setCurrentTemplate,
      addSize,
      removeSize,
      updateSize
    } = this.props;

    return (
      <section
        className="sidebar"
        style={styles.base}
      >
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