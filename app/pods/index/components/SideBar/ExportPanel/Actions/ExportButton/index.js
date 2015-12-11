'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import path from 'path';

import { app, dialog } from 'remote';
import { forEach } from 'lodash';

import colors from 'constants/colors';
import compositeImages from 'api/composite-images';
import writeFile from 'api/write-file.js'


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

    const template = path.join(app.getAppPath(), `app/assets/base-templates/${currentTemplate.id.toLowerCase()}/template.png`);

    // Get destination
    dialog.showSaveDialog(fullDestination => {
      const parsedDestination = path.parse(fullDestination);
      const destination = path.join(parsedDestination.dir, parsedDestination.name);

      // Build composites for each size
      forEach(sizes, size => {
        let {
          id,
          multiplier,
          suffix,
          format
        } = size;

        // Remove 'x' from multiplier and convert to number
        let computedMultipler = multiplier.slice(-1).toLowerCase() === 'x' ?
            Number(multiplier.slice(0, -1)) :
            Number(multiplier);

        // We don't pass the multiplier if it's NaN
        // so it defaults to 1
        let composite = compositeImages(
          template,
          currentTemplate.dimensions,
          screenshot,
          foreground,
          format,
          !isNaN(computedMultipler) && computedMultipler
        )

        // Write file
        writeFile(
          composite,
          destination,
          suffix,
          format,
          id
        );
      });
    });
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