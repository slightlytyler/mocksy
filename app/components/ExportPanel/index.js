'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Header from './Header';
import SizeList from 'pods/size/components/List';
import ExportButton from './ExportButton';

@Radium
export default class ExportPanel extends Component {
  static propTypes = {
    template: PropTypes.object,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired,
    addSize: PropTypes.func.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  render() {
    const {
      template,
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
        <div style={styles.section}>
          <Header addSize={addSize} />
        </div>
        <div style={styles.section}>
          <SizeList
            sizes={sizes}
            removeSize={removeSize}
            updateSize={updateSize}
          />
        </div>
        <div
          style={[
            styles.section,
            styles.actions
          ]}
        >
          <ExportButton
            template={template}
            screenshot={screenshot}
            sizes={sizes}
          />
        </div>
      </section>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.overlay,
    zIndex: 10,
  },

  section: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '.75em',
    paddingRight: '.75em',
    borderBottom: `1px solid ${colors.pink}`,
  },

  actions: {
    paddingTop: '.5em',
    paddingBottom: '.5em',
    borderBottom: 'none'
  }
};