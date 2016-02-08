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
    transform: PropTypes.oneOfType([
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
    ratio: PropTypes.number.isRequired,
    loggedMouseCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    updateTransform: PropTypes.func.isRequired,
    updateDimensions: PropTypes.func.isRequired,
    finishTransform: PropTypes.func.isRequired,
    zoomTransformCoordinates: PropTypes.func.isRequired
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
    const transformType = this.props.transform.type;

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
      ratio,
      zoomTransformCoordinates,
      updateTransform
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
      dimensions,
      ratio
    );

    if (edgesClicked) {
      updateTransform({
        type: 'scaling',
        args: [edgesClicked]
      });
    }
    else {
      updateTransform({
        type: 'dragging'
      });
    }
  }

  handleScale(e) {
    e.preventDefault();

    const {
      transform,
      dimensions,
      ratio,
      loggedMouseCoords,
      zoomTransformCoordinates,
      updateDimensions
    } = this.props;
    const edges = transform.args[0];
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

    const xDiff = (currentMouseCoords.x - loggedMouseCoords.x) / ratio;
    const yDiff = (currentMouseCoords.y - loggedMouseCoords.y) / ratio;

    if (edges.indexOf('left') !== -1) {
      if (width - xDiff >= 0) {
        updateDimensions({
          width: width - xDiff,
          x: x + xDiff
        })
      }
      else {
        updateDimensions({
          width: xDiff - width,
          x: x + width
        });

        updateTransform({
          args: [edges.map(val => val === 'left' ? 'right' : val)]
        });
      }
    }
    else if (edges.indexOf('right') !== -1) {
      if (width + xDiff >= 0) {
        updateDimensions({
          width: width + xDiff
        });
      }
      else {
        updateDimensions({
          width: -(width + xDiff),
          x: x + (width + xDiff)
        });

        updateTransform({
          args: [edges.map(val => val === 'right' ? 'left' : val)]
        });
      }
    }

    if (edges.indexOf('top') !== -1) {
      if (height - yDiff >= 0) {
        updateDimensions({
          height: height - yDiff,
          y: y + yDiff
        });
      }
      else {
        updateDimensions({
          height: yDiff - height,
          y: y + height
        });

        updateTransform({
          args: [edges.map(val => val === 'top' ? 'bottom' : val)]
        });
      }
    }
    else if (edges.indexOf('bottom') !== -1) {
      if (height + yDiff >= 0) {
        updateDimensions({
          height: height + yDiff
        });
      }
      else {
        updateDimensions({
          height: -(height + yDiff),
          y: y + (height + yDiff)
        });

        updateTransform({
          args: [edges.map(val => val === 'bottom' ? 'top' : val)]
        });
      }
    }
  }

  handleDrag(e) {
    e.preventDefault();

    const {
      dimensions,
      ratio,
      loggedMouseCoords,
      zoomTransformCoordinates,
      updateDimensions
    } = this.props;
    const currentMouseCoords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const xDiff = (currentMouseCoords.x - loggedMouseCoords.x) / ratio;
    const yDiff = (currentMouseCoords.y - loggedMouseCoords.y) / ratio;

    updateDimensions({
      x: dimensions.x + xDiff,
      y: dimensions.y + yDiff
    });
  }

  checkEdge(mouseCoords, dimensions, ratio) {
    // Determines if a click on a the preview rectangle is
    // on the edge or within buffer
    const buffer = 5 / ratio;

    const edges = {
      left: (mouseCoords.x / ratio) - dimensions.x <= buffer,
      right: (mouseCoords.x / ratio) - dimensions.x >= dimensions.width - buffer,
      top: (mouseCoords.y / ratio) - dimensions.y <= buffer,
      bottom: (mouseCoords.y / ratio) - dimensions.y >= dimensions.height - buffer
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
      ratio,
      finishTransform
    } = this.props;

    return (
      <Group
        x={dimensions.x * ratio}
        y={dimensions.y * ratio}
        onMouseDown={(e) => this.startTransform(e)}
        onMouseUp={finishTransform}
      >
        <ClippingRectangle
          x={0}
          y={0}
          width={dimensions.width * ratio}
          height={dimensions.height * ratio}
        >
          <Rectangle
            x={0}
            y={0}
            width={dimensions.width * ratio}
            height={dimensions.height * ratio}
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