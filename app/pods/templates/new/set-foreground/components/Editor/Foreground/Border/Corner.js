'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Rectangle from 'react-art/shapes/rectangle';

import colors from 'constants/colors';

@Radium
export default class TemplatesNewSetForegroundEditorForegroundBorderCorner extends Component {
  static propTypes = {
    edges: PropTypes.array.isRequired,
    edgeWidth: PropTypes.number.isRequired,
    dimensions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired
  }

  render() {
    const {
      edges,
      edgeWidth,
      dimensions,
      handleMouseDown,
      handleMouseUp
    } = this.props;
    const cornerWidth = edgeWidth * 2;
    let cornerDimensions;
    let cursor;

    if (((edges.indexOf('left') !== -1) && (edges.indexOf('top') !== -1)) || ((edges.indexOf('right') !== -1) && (edges.indexOf('bottom') !== -1))) {
      cursor = 'nwse-resize';
    }
    else {
      cursor = 'nesw-resize';
    }

    return (
      <Rectangle
        x={
          edges.indexOf('left') !== -1
          ? 0
          : dimensions.width - cornerWidth
        }
        y={
          edges.indexOf('top') !== -1
          ? 0
          : dimensions.height - cornerWidth
        }
        width={cornerWidth}
        height={cornerWidth}
        fill="rgba(0, 0, 0, 0)"
        cursor={cursor}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    );
  }
}

const styles = {
};