'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplateForegroundEmpty extends Component {
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
          style={styles.text}
        >
          Add a screenshot
        </span>
        <span>
        ( {screenshotWidth} x {screenshotHeight} )
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
    color: '#EDF3F5',
    textAlign: 'center'
  },

  icon: {
    width: '4em',
    marginBottom: '1em',
  },

  text: {
    marginBottom: '.25em',
    fontSize: '2em',
    fontWeight: 100,
  }
};