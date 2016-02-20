'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { Pattern } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

@Radium
export default class ScreenshotPreview extends Component {
  static propTypes = {
    screenshot: PropTypes.string,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  render() {
    const {
      screenshot,
      dimensions
    } = this.props;
    const {
      width,
      height
    } = dimensions;
    return (
      <Rectangle
        width={width}
        height={height}
        fill={
          screenshot
          ? new Pattern(
            screenshot,
            width,
            height,
            0,
            0
          )
          : 'white'
        }
        opacity={screenshot ? 1 : 0}
        cursor="pointer"
      />
    );
  }
}

const styles = {
};