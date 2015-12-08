'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Header from './header/component';
import SizeList from './sizes/list/component';
import Actions from './actions/component';

@Radium
export default class IndexSideBarExportPanel extends Component {
  static propTypes = {
    currentTemplate: PropTypes.object.isRequired,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired,
    addSize: PropTypes.func.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  render() {
    const {
      currentTemplate,
      screenshot,
      sizes,
      addSize,
      removeSize,
      updateSize
    } = this.props;

    return (
      <section
        className="export-panel"
        style={styles.base}
      >
        <Header
          addSize={addSize}
          sectionStyle={styles.section}
        />
        <SizeList
          sizes={sizes}
          removeSize={removeSize}
          updateSize={updateSize}
          sectionStyle={styles.section}
        />
        <Actions
          currentTemplate={currentTemplate}
          screenshot={screenshot}
          sizes={sizes}
          sectionStyle={styles.section}
        />
      </section>
    );
  }
}

const styles = {
  base: {
    dispay: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EDF3F5',
  },

  section: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '.75em',
    paddingRight: '.75em',
    borderBottom: '1px solid #CFD8DC',
  },
};