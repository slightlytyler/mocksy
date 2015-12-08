'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplateForegroundEmpty extends Component {
  static propTypes = {
  };

  render() {
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
    height: '100%'
  },

  icon: {
    width: '4em',
    marginBottom: '1em',
  },

  text: {
    fontSize: '2em',
    fontWeight: 100,
    color: '#EDF3F5',
    textAlign: 'center'
  }
};