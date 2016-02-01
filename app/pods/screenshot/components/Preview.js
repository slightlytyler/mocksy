'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';
import AddPrompt from 'pods/screenshot/components/AddPrompt';

@Radium
export default class ScreenshotPreview extends Component {
  static propTypes = {
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired,
    expectedDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
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
    const {
      screenshot,
      expectedDimensions
    } = this.props;
    return (
      <div style={styles.base}>
        {
          screenshot
          ? (
            <img
              src={screenshot}
              onClick={() => this.openFile()}
              style={styles.screenshot}
            />
          )
          : (
            <AddPrompt
              handleClick={() => this.openFile()}
              expectedDimensions={expectedDimensions}
            />
          )
        }
      </div>
    );
  }
}

const styles = {
  base: {

  },

  screenshot: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    minHeight: '100%',
    cursor: 'pointer'
  }
};