'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Group } from 'react-art';

@Radium
export default class TemplateBuilderEditorSurfaceZoomGroup extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    updateState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleZoom = this.handleZoom.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleZoom, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleZoom, false);
  }

  handleZoom(e) {
    const step = .15;
    const zoomIn = e.keyCode === 187
    const zoomOut = e.keyCode === 189

    if (zoomIn || zoomOut) {
      e.preventDefault();

      const increment = zoomIn ? step : -step;
      const {
        scale,
        offset,
        dimensions,
        updateState
      } = this.props;

      updateState({
        zoomScale: scale + increment,
        zoomOffset: {
          x: offset.x - ((dimensions.width * increment) / 2),
          y: offset.y - ((dimensions.height * increment) / 2),
        }
      });
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