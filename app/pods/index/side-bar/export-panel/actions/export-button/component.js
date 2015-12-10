'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import path from 'path';
import { dialog } from 'remote';
import gm from 'gm';
import { forEach } from 'lodash';

import colors from 'constants/colors';

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

    const template = `./app/assets/base-templates/${currentTemplate.id.toLowerCase()}/template.png`;

    // Get destination
    dialog.showSaveDialog(fullDestination => {
      const parsedDestination = path.parse(fullDestination);
      const destination = path.join(parsedDestination.dir, parsedDestination.name);

      // Build composites
      gm(template).size((err, templateSize) => {
        const { width, height } = templateSize;

        forEach(sizes, size => {
          let {
            id,
            multiplier,
            suffix,
            format
          } = size;
          let computedMultipler = multiplier.slice(-1).toLowerCase() === 'x' ?
              Number(multiplier.slice(0, -1)) :
              Number(multiplier);

          let composite = this.buildComposite(
            template,
            templateSize,
            screenshot,
            foreground,
            format,
            !isNaN(computedMultipler) && computedMultipler
          )

          // Write file
          this.writeFile(
            composite,
            destination,
            suffix,
            format,
            id
          );
        });
      });
    });
  }

  buildComposite(template, templateSize, screenshot, screenshotDimensions, format, multiplier = 1) {
    const { width, height } = templateSize;

    return gm()
      .in('-geometry',`${width * multiplier}x${height * multiplier}`)
      .in('-page', '+0+0')
      .in(template)
      .in('-geometry',`${screenshotDimensions.width * multiplier}x${screenshotDimensions.height * multiplier}^`)
      .in('-crop', `${screenshotDimensions.width * multiplier}x${screenshotDimensions.height * multiplier}+0+0`)
      .in('-page', `+${screenshotDimensions.left * multiplier}+${screenshotDimensions.top * multiplier}`)
      .in(screenshot)
      .mosaic()
      .in('-background', format === 'png' ? 'transparent' : 'white');
  }

  writeFile(graphic, destination, suffix, format, id) {
    graphic.write(`${destination}${suffix}.${format}`, (err) => {
      if (!err) console.log(`Written composite image for size:${id} to ${destination}.`);
    })
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