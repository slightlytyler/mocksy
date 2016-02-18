'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Group } from 'react-art';

@Radium
export default class TemplatePreviewZoomGroup extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    updateZoomScale: PropTypes.func.isRequired,
    updateZoomOffset: PropTypes.func.isRequired,
    surfaceDimensions: PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
      bottom: PropTypes.number
    })
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleZoom, false);
    document.addEventListener('mousewheel', this.handleSwipe, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleZoom);
    document.removeEventListener('mousewheel', this.handleSwipe);
  }

  handleZoom = e => {
    if (document.activeElement === document.body) {
      const step = .15;
      const zoomIn = e.keyCode === 187
      const zoomOut = e.keyCode === 189

      if (zoomIn || zoomOut) {
        e.preventDefault();

        const increment = zoomIn ? step : -step;

        this.props.updateZoomScale(increment);
      }
    }
  }

  handleSwipe = e => {
    if (this.checkSurfaceSwipe(e)) {
      const offset = {
        x: e.wheelDeltaX,
        y: e.wheelDeltaY
      };

      this.props.updateZoomOffset(offset);
    }
  }

  checkSurfaceSwipe = e => {
    const mouseCoords = {
      x: e.clientX,
      y: e.clientY
    };
    const { surfaceDimensions } = this.props;

    if (surfaceDimensions) {
      const withinX = mouseCoords.x >= surfaceDimensions.left && mouseCoords.x <= surfaceDimensions.right;
      const withinY = mouseCoords.y >= surfaceDimensions.top && mouseCoords.y <= surfaceDimensions.bottom;

      return withinX && withinY;
    }
    else {
      return false;
    }
  }

  render() {
    const {
      scale,
      offset
    } = this.props;

    return (
      <Group
        x={offset.x}
        y={offset.y}
        scaleX={scale}
        scaleY={scale}
      >
        {this.props.children}
      </Group>
    );
  }
}

const styles = {
};