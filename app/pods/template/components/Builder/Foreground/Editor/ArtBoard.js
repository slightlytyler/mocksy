'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Rectangle from 'react-art/shapes/rectangle';

@Radium
export default class TemplateBuilderForegroundEditorArtBoard extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
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
    mouseDownCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    zoomOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    updateTransform: PropTypes.func.isRequired,
    updateDimensions: PropTypes.func.isRequired,
    updateMouseDownCoords: PropTypes.func.isRequired,
    updateZoomOffset: PropTypes.func.isRequired,
    finishTransform: PropTypes.func.isRequired,
    zoomTransformCoordinates: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseMove = e => {
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

  startTransform = e => {
    const {
      mode,
      zoomTransformCoordinates,
      updateTransform,
      updateDimensions,
      updateMouseDownCoords
    } = this.props;
    const coords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    updateMouseDownCoords(coords);

    if (mode === 'transform') {
      updateTransform({
        type: 'marquee'
      });

      updateDimensions({
        width: 0,
        height: 0
      });
    }
    else if (mode === 'navigate') {
      updateTransform({
        type: 'navigating'
      });
    }
  }

  handleMarquee(e) {
    e.preventDefault();

    const {
      ratio,
      loggedMouseCoords,
      mouseDownCoords,
      updateDimensions
    } = this.props;
    const startX = mouseDownCoords.x;
    const startY = mouseDownCoords.y;
    const currentX = loggedMouseCoords.x;
    const currentY = loggedMouseCoords.y;

    // First we need to calculate the direction of the marquee
    const xDirectionPositive = currentX >= startX;
    const yDirectionPositive = currentY >= startY;

    // Handle x / width
    updateDimensions({
      width: (
        xDirectionPositive
        ? (currentX - startX) / ratio
        : (startX - currentX) / ratio
      ),
      x: (
        xDirectionPositive
        ? startX / ratio
        : currentX / ratio
      )
    });

    // Handle y / height
    updateDimensions({
      height: (
        yDirectionPositive
        ? (currentY - startY) / ratio
        : (startY - currentY) / ratio
      ),
      y: (
        yDirectionPositive
        ? startY / ratio
        : currentY / ratio
      )
    });
  }

  handleNavigation(e) {
    e.preventDefault();

    const {
      zoomOffset,
      loggedMouseCoords,
      zoomTransformCoordinates,
      updateZoomOffset
    } = this.props;
    const currentMouseCoords = zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });
    const xDiff = currentMouseCoords.x - loggedMouseCoords.x;
    const yDiff = currentMouseCoords.y - loggedMouseCoords.y;

    updateZoomOffset({
      x: zoomOffset.x + xDiff,
      y: zoomOffset.y + yDiff
    });
  }

  render() {
    const { startTransform } = this;
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
        onMouseDown={startTransform}
        onMouseUp={finishTransform}
        fill="rgba(0,0,0,0)"
      />
    );
  }
}

const styles = {
};