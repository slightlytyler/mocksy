'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import openFile from 'api/open-file';
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

  render() {
    const {
      screenshot,
      setCurrentScreenshot,
      expectedDimensions
    } = this.props;
    return (
      <div style={styles.base}>
        {
          screenshot
          ? (
            <img
              src={screenshot}
              onClick={() => openFile(setCurrentScreenshot)}
              style={styles.screenshot}
            />
          )
          : (
            <AddPrompt
              handleClick={() => openFile(setCurrentScreenshot)}
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