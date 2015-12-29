'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import exportAssets from 'api/export-assets';
import colors from 'constants/colors';


@Radium
export default class IndexSideBarExportPanelExportButton extends Component {
  static propTypes = {
    currentTemplate: PropTypes.object.isRequired,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired
  };

  render() {
    const {
      currentTemplate,
      screenshot,
      sizes
    } = this.props;

    return (
      <button
        ref="exportButton"
        onClick={() => exportAssets(currentTemplate, screenshot, sizes)}
        style={[
          styles.base,
          !screenshot && styles.disabled
        ]}
      >
        Export Screenshot
      </button>
    );
  }
}

const styles = {
  base: {
    flex: 1,
    color: colors.pink,
    border: `1px solid ${colors.pink}`,
    borderRadius: '4px',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    ':hover': {
      color: 'white',
      backgroundColor: colors.pink
    }
  },

  disabled: {
    opacity: '.3',
    pointerEvents: 'none'
  }
};