'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';
import colors from 'constants/colors';
import Prompt from 'components/Prompt';

@Radium
export default class ScreenshotAddPrompt extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    expectedDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  render() {
    const {
      handleClick,
      expectedDimensions
    } = this.props;
    return (
      <div
        onClick={handleClick}
        style={styles.container}
      >
        <Prompt text="Add Screesnhot">
          <span ref="screenshotDimensions">
            {`( ${expectedDimensions.width} x ${expectedDimensions.height} )`}
          </span>
        </Prompt>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: colors.featureGradient,
    cursor: 'pointer',
    overflow: 'hidden',
  }
};