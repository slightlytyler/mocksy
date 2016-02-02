'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class AspectContainer extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  width(dimensions, canvasDimensions) {
    const { width, height } = dimensions;
    const aspectRatio = width / height;

    if (aspectRatio > (canvasDimensions.width / canvasDimensions.height)) {
      return canvasDimensions.width;
    }
    else {
      return aspectRatio * canvasDimensions.height;
    }
  }

  height(dimensions, canvasDimensions) {
    const { width, height } = dimensions;
    const aspectRatio = height / width;

    if (aspectRatio > (canvasDimensions.height / canvasDimensions.width)) {
      return canvasDimensions.height;
    }
    else {
      return aspectRatio * canvasDimensions.width;
    }
  }

  render() {
    const {
      dimensions,
      canvasDimensions,
      children
    } = this.props;
    const containerDimensions = {
      width: this.width(dimensions, canvasDimensions),
      height: this.height(dimensions, canvasDimensions)
    };

    return(
      <div
        ref="node"
        style={[
          styles.base,
          this.props.style,
          containerDimensions
        ]}
      >
        {children.map(child => React.cloneElement(child, {
          containerDimensions,
          'test': 'test'
        }))}
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    boxSizing: 'content-box'
  }
};