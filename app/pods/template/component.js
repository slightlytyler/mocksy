'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Foreground from 'pods/template/foreground/component';

@Radium
export default class Template extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired
  };

  render() {
    const {
      id,
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
          src={`assets/base-templates/${id.toLowerCase()}/template.png`}
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