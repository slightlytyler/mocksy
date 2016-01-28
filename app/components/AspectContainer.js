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
    }),
    handleClick: PropTypes.func
  };

  width(dimensions, canvasDimensions) {
    const { width, height } = dimensions;
    const aspectRatio = width / height;
    if (aspectRatio > (canvasDimensions.width / canvasDimensions.height)) {
      return '100%';
    }
    else {
      return `${(aspectRatio * canvasDimensions.height) / canvasDimensions.width * 100}%`;
    }
  }

  height(dimensions, canvasDimensions) {
    const { width, height } = dimensions;
    const aspectRatio = height / width;

    if (aspectRatio / (canvasDimensions.height / canvasDimensions.width)) {
      return '100%';
    }
    else {
      return `${(aspectRatio * canvasDimensions.width) / canvasDimensions.height * 100}%`;
    }
  }

  render() {
    const {
      dimensions,
      canvasDimensions,
      handleClick
    } = this.props;

    return(
      <div
        onClick={handleClick}
        style={[
          styles.base,
          {
            width: this.width(dimensions, canvasDimensions),
            height: this.height(dimensions, canvasDimensions)
          }
        ]}
      >
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative'
  }
};