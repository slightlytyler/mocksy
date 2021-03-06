'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class TemplatePreviewForegroundEmpty extends Component {
  static propTypes = {
    screenshotWidth: PropTypes.number.isRequired,
    screenshotHeight: PropTypes.number.isRequired
  };

  render() {
    const {
      screenshotWidth,
      screenshotHeight
    } = this.props;

    return (
       <div
        style={styles.base}
      >
        <img
          src="assets/icons/add-screenshot.svg"
          style={styles.icon}
        />
        <span
          ref="prompt"
          style={styles.text}
        >
          Add a screenshot
        </span>
        <span ref="screenshotDimensions">
          {`( ${screenshotWidth} x ${screenshotHeight} )`}
        </span>
      </div>
    );
  }
}

const styles = {
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
};