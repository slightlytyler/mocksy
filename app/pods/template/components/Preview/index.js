'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Foreground from './Foreground';

@Radium
export default class TemplatePreview extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired
  };

  isHigherAspect(dimensionsA, dimensionsB) {
    return (dimensionsA.width / dimensionsA.height)  >= (dimensionsB.width / dimensionsB.height);
  }

  render() {
    const {
      id,
      dimensions,
      canvasDimensions,
      screenshot,
      setCurrentScreenshot
    } = this.props;
    const {
      width,
      height,
      foreground
    } = dimensions;
    const isHigherAspect = this.isHigherAspect(dimensions, canvasDimensions);

    return (
      <div
        className="template"
        style={[
          styles.base,
          isHigherAspect ?
          { width: '100%' } :
          { height: '100%' }
        ]}
      >
        <img
          ref="background"
          src={`assets/base-templates/${id.toLowerCase()}/template.png`}
          style={styles.background}
        />

        <Foreground
          ref="foreground"
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
    position: 'relative'
  },

  background: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
};