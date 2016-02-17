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
    updateZoomScale: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleZoom, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleZoom);
  }

  handleZoom = e => {
    const step = .15;
    const zoomIn = e.keyCode === 187
    const zoomOut = e.keyCode === 189

    if (zoomIn || zoomOut) {
      e.preventDefault();

      const increment = zoomIn ? step : -step;

      this.props.updateZoomScale(increment);
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