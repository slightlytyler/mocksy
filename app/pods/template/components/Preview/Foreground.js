'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  ClippingRectangle
} from 'react-art';

@Radium
export default class TemplatePreviewForeground extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  render() {
    const {
      x,
      y,
      width,
      height
    } = this.props.dimensions;

    return (
      <Group
        x={x}
        y={y}
      >
        <ClippingRectangle
          x={0}
          y={0}
          width={width}
          height={height}
        >
          {this.props.children}
        </ClippingRectangle>
      </Group>
    );
  }
}

const styles = {
};