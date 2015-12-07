'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplateForegroundEmpty extends Component {
  static propTypes = {
    fileSelected: PropTypes.func.isRequired
  };

  handleFile(e) {
    this.props.fileSelected(e.target.files[0])
  }

  render() {
    return (
       <div
        onClick={() => this.refs.input.click()}
        style={styles.base}
      >
        <input
          ref="input"
          type="file"
          onChange={(e) => this.handleFile(e)}
          style={styles.input}
        />
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
    height: '100%',
    cursor: 'pointer'
  },

  input: {
    display: 'none'
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