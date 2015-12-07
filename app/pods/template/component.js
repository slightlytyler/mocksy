'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Foreground from 'pods/template/foreground/component';

@Radium
export default class Template extends Component {
  static propTypes = {
    dimensions: PropTypes.object.isRequired,
    setCurrentScreenshot: PropTypes.func.isRequired
  };

  render() {
    const {
      dimensions,
      screenshot,
      setCurrentScreenshot
    } = this.props;
    const {
      width,
      height,
      foreground
    } = dimensions;

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
          screenshot={screenshot}
          setCurrentScreenshot={setCurrentScreenshot}
          foregroundDimensions={foreground}
          containerDimensions={{
            width,
            height
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