'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { Pattern } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

@Radium
export default class TemplatePreviewBackground extends Component {
  static propTypes = {
    imagePath: PropTypes.string.isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  render() {
    const {
      imagePath,
      dimensions
    } = this.props;

    return (
      <Rectangle
        width={dimensions.width}
        height={dimensions.height}
        fill={new Pattern(imagePath, dimensions.width , dimensions.height, 0, 0)}
      />
    );
  }
}

const styles = {
};