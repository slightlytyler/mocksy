'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  Path,
  Shape
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import colors from 'constants/colors';

@Radium
export default class TemplatesNewSetForegroundEditorForegroundBorderEdge extends Component {
  static propTypes = {
    edge: PropTypes.string.isRequired,
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
      edge,
      edgeWidth,
      dimensions,
      handleMouseDown,
      handleMouseUp
    } = this.props;
    const strokePath = new Path();
    const containerThickness = edgeWidth * 2;
    let containerDimensions;
    let cursor;

    switch (edge) {
      case 'left':
        strokePath
          .move(edgeWidth / 2, edgeWidth / 2)
          .line(0, dimensions.height - edgeWidth)
        ;
        containerDimensions = {
          x: 0,
          y: 0,
          width: containerThickness,
          height: dimensions.height
        };
        cursor = 'ew-resize';
        break;

      case 'right':
        strokePath
          .move(dimensions.width - (edgeWidth / 2), edgeWidth / 2)
          .line(0, dimensions.height - edgeWidth )
        ;
        containerDimensions = {
          x: dimensions.width - containerThickness,
          y: 0,
          width: containerThickness,
          height: dimensions.height
        };
        cursor = 'ew-resize';
        break;

      case 'top':
        strokePath
          .move(edgeWidth / 2, edgeWidth / 2)
          .line(dimensions.width - edgeWidth, 0)
        ;
        containerDimensions = {
          x: 0,
          y: 0,
          width: dimensions.width,
          height: containerThickness
        };
        cursor = 'ns-resize';
        break;

      case 'bottom':
        strokePath
          .move(edgeWidth / 2, dimensions.height - (edgeWidth / 2))
          .line(dimensions.width - edgeWidth, 0)
        ;
        containerDimensions = {
          x: 0,
          y: dimensions.height - containerThickness,
          width: dimensions.width,
          height: containerThickness
        };
        cursor = 'ns-resize';
        break;
    }

    return (
      <Group
        cursor={cursor}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Shape
          d={strokePath}
          stroke={colors.white}
          strokeWidth={edgeWidth}
          strokeDash={[edgeWidth, edgeWidth * 2.5]}
          strokeCap="square"
        />
        <Rectangle
          x={containerDimensions.x}
          y={containerDimensions.y}
          width={containerDimensions.width}
          height={containerDimensions.height}
          fill="rgba(0, 0, 0, 0)"
        />
      </Group>
    );
  }
}

const styles = {
};