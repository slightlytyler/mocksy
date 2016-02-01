'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { dialog } from 'remote';

import gm from 'api/gm';
import acceptedImageFormats from 'constants/accepted-image-formats';
import colors from 'constants/colors';

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
         <div style={styles.prompt.base}>
            <img
              src="assets/icons/add-screenshot.svg"
              style={styles.prompt.icon}
            />
            <span
              ref="prompt"
              style={styles.prompt.text}
            >
              Add a screenshot
            </span>
            <span ref="screenshotDimensions">
              {`( ${expectedDimensions.width} x ${expectedDimensions.height} )`}
            </span>
          </div>
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
  },

  prompt: {
    base: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      height: '100%',
      color: 'white',
      textAlign: 'center'
    },

    icon: {
      width: '4em',
      marginBottom: '1em',
    },

    text: {
      marginBottom: '.25em',
      fontSize: '1.6em',
      fontWeight: 200,
    }
  }
};