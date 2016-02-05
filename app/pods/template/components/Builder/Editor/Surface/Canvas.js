'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Rectangle from 'react-art/shapes/rectangle';

@Radium
export default class TemplateBuilderEditorSurfaceCanvas extends Component {
  static propTypes = {
    transform: PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        args: PropTypes.array
      }),
      PropTypes.bool
    ]).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
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
    const {
      mode,
      transform
    } = this.props;

    if (mode === 'navigate' && transform.type === 'navigating') {
      this.handleNavigation(e);
    }
    else if (mode === 'transform' && transform.type === 'marquee') {
      this.handleMarquee(e);
    }
  }

  startTransform(e) {
    const {
      mode,
      zoomTransformCoordinates,
      updateState
    } = this.props;
    const coords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    if (mode === 'transform') {
      updateState({
        currentTransform: {
          type: 'marquee'
        },
        foregroundDimensions: {
          width: 0,
          height: 0
        },
        mouseCoords: {
          start: coords
        }
      });
    }
    else if (mode === 'navigate') {
      updateState({
        currentTransform: {
          type: 'navigating'
        },
        mouseCoords: {
          start: coords
        }
      });
    }
  }

  handleMarquee(e) {
    e.preventDefault();

    const {
      loggedMouseCoords,
      mouseDownCoords,
      updateState
    } = this.props;
    const startX = mouseDownCoords.x;
    const startY = mouseDownCoords.y;
    const currentX = loggedMouseCoords.x;
    const currentY = loggedMouseCoords.y;

    // First we need to calculate the direction of the marquee
    const xDirectionPositive = currentX >= startX;
    const yDirectionPositive = currentY >= startY;

    // Handle x / width
    updateState({
      foregroundDimensions: {
        width: (
          xDirectionPositive
          ? currentX - startX
          : startX - currentX
        ),
        x: (
          xDirectionPositive
          ? startX
          : currentX
        )
      }
    });

    // Handle y / height
    updateState({
      foregroundDimensions: {
        height: (
          yDirectionPositive
          ? currentY - startY
          : startY - currentY
        ),
        y: (
          yDirectionPositive
          ? startY
          : currentY
        )
      }
    });
  }

  handleNavigation(e) {
    e.preventDefault();

    const {
      zoomOffset,
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
      zoom: {
        offset: {
          x: zoomOffset.x + xDiff,
          y: zoomOffset.y + yDiff
        }
      }
    });
  }

  render() {
    const {
      dimensions,
      finishTransform
    } = this.props;

    return (
      <Rectangle
        x={0}
        y={0}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={(e) => this.startTransform(e)}
        onMouseUp={finishTransform}
        fill="rgba(0,0,0,0)"
      />
    );
  }
}

const styles = {
};