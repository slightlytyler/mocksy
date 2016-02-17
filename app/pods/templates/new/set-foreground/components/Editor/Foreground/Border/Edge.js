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
    const containerThickness = edgeWidth * 2;

    const negativeWidth = dimensions.width < 0;
    const negativeHeight = dimensions.height < 0;
    const strokeXOffset = (negativeWidth ? -1 : 1) * edgeWidth / 2;
    const strokeYOffset = (negativeHeight ? -1 : 1) * edgeWidth / 2;
    const containerXOffset = negativeWidth ? -containerThickness : 0;
    const containerYOffset = negativeHeight ? -containerThickness : 0;

    const strokePath = new Path();
    let containerDimensions;
    let cursor;

    switch (edge) {
      case 'left':
        strokePath
          .move(strokeXOffset, strokeYOffset)
          .line(0, dimensions.height - (2 * strokeYOffset))
        ;
        containerDimensions = {
          x: containerXOffset,
          y: 0,
          width: containerThickness,
          height: dimensions.height
        };
        cursor = 'ew-resize';
        break;

      case 'right':
        strokePath
          .move(dimensions.width - strokeXOffset, strokeYOffset)
          .line(0, dimensions.height - (2 * strokeYOffset))
        ;
        containerDimensions = {
          x: dimensions.width - (containerThickness + containerXOffset),
          y: 0,
          width: containerThickness,
          height: dimensions.height
        };
        cursor = 'ew-resize';
        break;

      case 'top':
        strokePath
          .move(strokeXOffset, strokeYOffset)
          .line(dimensions.width - (2 * strokeXOffset), 0)
        ;
        containerDimensions = {
          x: 0,
          y: containerYOffset,
          width: dimensions.width,
          height: containerThickness
        };
        cursor = 'ns-resize';
        break;

      case 'bottom':
        strokePath
          .move(strokeXOffset, dimensions.height - strokeYOffset)
          .line(dimensions.width - (2 * strokeXOffset), 0)
        ;
        containerDimensions = {
          x: 0,
          y: dimensions.height - (containerThickness + containerYOffset),
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