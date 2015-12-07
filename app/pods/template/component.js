'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Foreground from 'pods/template/foreground/component';

@Radium
export default class Template extends Component {
  static propTypes = {
  };

  render() {
    const { dimensions } = this.props;

    return (
      <div
        className="template"
        style={styles.base}
      >
        <img
          src="assets/base-templates/iphone-6/template.png"
          style={styles.background}
        />

        <Foreground
          foregroundDimensions={dimensions.foreground}
          containerDimensions={{
            width: dimensions.width,
            height: dimensions.height
          }}
        />
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },

  background: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
};