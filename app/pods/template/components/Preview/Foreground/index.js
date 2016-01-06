'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { dialog } from 'remote';

import gm from 'api/gm';
import colors from 'constants/colors';
import acceptedImageFormats from 'constants/accepted-image-formats';
import EmptyState from './Empty';

@Radium
export default class TemplatePreviewForeground extends Component {
  static propTypes = {
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object.isRequired
  };

  openFile() {
    const { setCurrentScreenshot } = this.props;

    dialog.showOpenDialog({ multiSelections: false }, fileNames => {
      if (fileNames) {
        let path = fileNames[0];

        gm(path).identify((err, value) => {
          if (err) {
            alert('The file you selected is not recognized as an image.')
          } else {
            let selectedFileFormat = value.format.toLowerCase();
            let isAccepted = acceptedImageFormats.some(format =>
              selectedFileFormat === format.value || selectedFileFormat === format.alias
            );

            if (isAccepted) {
              setCurrentScreenshot(path);
            } else {
              alert(`Mocksy doesn't currently support that ):`);
            }
          }
        });
      }
    })
  }

  render() {
    const { screenshot } = this.props;
    const { screenshotURL } = this.state;
    const {
      foregroundDimensions,
      containerDimensions
    } = this.props;

    const toPercent = (num) => `${num * 100}%`;

    const width = toPercent(foregroundDimensions.width / containerDimensions.width);
    const height = toPercent(foregroundDimensions.height / containerDimensions.height);
    const left = toPercent(foregroundDimensions.left / containerDimensions.width);
    const top = toPercent(foregroundDimensions.top / containerDimensions.height);

    return (
      <div
        className="foreground"
        onClick={() => this.openFile()}
        style={[
          styles.base,
          {
            width: `calc(${width} + 2px)`,
            height: `calc(${height} + 2px)`,
            left: `calc(${left} - 1px)`,
            top: `calc(${top} - 1px)`
          }
        ]}
      >
        {screenshot ?
          <img
            ref="screenshot"
            src={screenshot}
            style={styles.image}
          /> :
          <EmptyState
            ref="empty"
            screenshotWidth={foregroundDimensions.width}
            screenshotHeight={foregroundDimensions.height}
          />
        }
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    background: colors.featureGradient,
    cursor: 'pointer',
    overflow: 'hidden',
  },

  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    minHeight: '100%'
  }
};