'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  ClippingRectangle,
  LinearGradient
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import { some, chain, pickBy, keys } from 'lodash';

import colors from 'constants/colors';

@Radium
export default class TemplateBuilderEditorSurfaceForeground extends Component {
  static propTypes = {
    transforming: PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        args: PropTypes.array
      }),
      PropTypes.bool
    ]).isRequired,
    dimensions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    loggedMouseCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    zoomTransformCoordinates: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,
    finishTransform: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseMove(e) {
    const transformType = this.props.transforming.type;

    switch (transformType) {
      case 'scaling':
        this.handleScale(e);
        break;
      case 'dragging':
        this.handleDrag(e)
    }
  }

  startTransform(e) {
    const {
      dimensions,
      zoomTransformCoordinates,
      updateState
    } = this.props;
    const coords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const edgesClicked = this.checkEdge(
      {
        x: coords.x,
        y: coords.y
      },
      dimensions
    );

    if (edgesClicked) {
      updateState({
        transforming: {
          type: 'scaling',
          args: [edgesClicked]
        }
      });
    }
    else {
      updateState({
        transforming: {
          type: 'dragging'
        }
      });
    }
  }

  handleScale(e) {
    e.preventDefault();

    const {
      transforming,
      dimensions,
      loggedMouseCoords,
      zoomTransformCoordinates,
      updateState
    } = this.props;
    const edges = transforming.args[0];
    const {
      width,
      height,
      x,
      y
    } = dimensions;
    const currentMouseCoords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    const xDiff = currentMouseCoords.x - loggedMouseCoords.x;
    const yDiff = currentMouseCoords.y - loggedMouseCoords.y;

    if (edges.indexOf('left') !== -1) {
      if (width - xDiff >= 0) {
        updateState({
          rectDimensions: {
            width: width - xDiff,
            x: x + xDiff
          }
        })
      }
      else {
        updateState({
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'left' ? 'right' : val)]
          },
          rectDimensions: {
            width: xDiff - width,
            x: x + width
          }
        })
      }
    }
    else if (edges.indexOf('right') !== -1) {
      if (width + xDiff >= 0) {
        updateState({
          rectDimensions: {
            width: width + xDiff
          }
        });
      }
      else {
        updateState({
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'right' ? 'left' : val)]
          },
          rectDimensions: {
            width: -(width + xDiff),
            x: x + (width + xDiff)
          }
        });
      }
    }

    if (edges.indexOf('top') !== -1) {
      if (height - yDiff >= 0) {
        updateState({
          rectDimensions: {
            height: height - yDiff,
            y: y + yDiff
          }
        });
      }
      else {
        updateState({
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'top' ? 'bottom' : val)]
          },
          rectDimensions: {
            height: yDiff - height,
            y: y + height
          }
        });
      }
    }
    else if (edges.indexOf('bottom') !== -1) {
      if (height + yDiff >= 0) {
        updateState({
          rectDimensions: {
            height: height + yDiff
          }
        });
      }
      else {
        updateState({
          transforming: {
            type: 'scaling',
            args: [edges.map(val => val === 'bottom' ? 'top' : val)]
          },
          rectDimensions: {
            height: -(height + yDiff),
            y: y + (height + yDiff)
          }
        });
      }
    }
  }

  handleDrag(e) {
    e.preventDefault();

    const {
      dimensions,
      loggedMouseCoords,
      zoomTransformCoordinates,
      updateState
    } = this.props;
    const currentMouseCoords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const xDiff = currentMouseCoords.x - loggedMouseCoords.x;
    const yDiff = currentMouseCoords.y - loggedMouseCoords.y;

    updateState({
      rectDimensions: {
        x: dimensions.x + xDiff,
        y: dimensions.y + yDiff
      }
    });
  }

  checkEdge(mouseCoords, dimensions) {
    // Determines if a click on a the preview rectangle is
    // on the edge or within buffer
    const buffer = 5;

    const edges = {
      left: mouseCoords.x - dimensions.x <= buffer,
      right: mouseCoords.x - dimensions.x >= dimensions.width - buffer,
      top: mouseCoords.y - dimensions.y <= buffer,
      bottom: mouseCoords.y - dimensions.y >= dimensions.height - buffer
    };

    if (some(edges, val => val)) {
      // Returns an array of edge keys that are true for
      // the above checks
      return chain(edges)
        .pickBy(val => val)
        .keys()
        .value()
      ;
    }
    else {
      return false;
    }
  }

  render() {
    const {
      dimensions,
      finishTransform
    } = this.props;

    return (
      <Group
        x={dimensions.x}
        y={dimensions.y}
        onMouseDown={(e) => this.startTransform(e)}
        onMouseUp={finishTransform}
      >
        <ClippingRectangle
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
        >
          <Rectangle
            x={0}
            y={0}
            width={dimensions.width}
            height={dimensions.height}
            fill={new LinearGradient([colors.pink, colors.orange])}
            stroke={colors.white}
            strokeWidth={4}
            strokeDash={[9, 10]}
            strokeCap="square"
          />
        </ClippingRectangle>
      </Group>
    );
  }
}

const styles = {
};