'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Header from './Header';
import SizeList from 'pods/size/components/List';
import Actions from './Actions';

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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.overlay,
  },

  section: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '.75em',
    paddingRight: '.75em',
    borderBottom: `1px solid ${colors.pink}`,
  },
};