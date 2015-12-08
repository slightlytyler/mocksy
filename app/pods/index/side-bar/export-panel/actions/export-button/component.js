'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import gm from 'gm';
import { forEach } from 'lodash';

@Radium
export default class IndexSideBarExportPanelExportButton extends Component {
  static propTypes = {
    currentTemplate: PropTypes.object.isRequired,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired
  };

  export() {
    const {
      currentTemplate,
      screenshot,
      sizes
    } = this.props;
    const { foreground } = currentTemplate.dimensions;
    const {
      width,
      height,
      left,
      top
    } = foreground;

    const composite =
      gm()
        .in('-page', '+0+0')
        .in(`./app/assets/base-templates/${currentTemplate.id.toLowerCase()}/template.png`)
        .in('-geometry',`${width}x${height}`)
        .in('-page', `+${left}+${top}`)
        .in(screenshot)
        .mosaic();

    forEach(sizes, size =>
      composite.write(`/Users/Tmart/Desktop/test${size.suffix}.${size.format}`, (err) => {
        if (!err) console.log(`Written composite image for size:${size.id}.`);
      })
    );
  }

  render() {
    const { screenshot } = this.props;

    return (
      <button
        ref="exportButton"
        onClick={() => this.export()}
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
    color: '#607D8B',
    border: '1px solid #607D8B',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    ':hover': {
      color: '#EDF3F5',
      backgroundColor: '#607D8B'
    }
  },

  disabled: {
    opacity: '.3',
    pointerEvents: 'none'
  }
};