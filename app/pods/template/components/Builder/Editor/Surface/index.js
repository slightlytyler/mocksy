'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Surface } from 'react-art';
import { merge } from 'lodash';

import ZoomGroup from './ZoomGroup'
import Background from './Background';
import Foreground from './Foreground';
import Canvas from './Canvas';

@Radium
export default class TemplateBuilderEditorSurface extends Component {
  static propTypes = {
    dimensions: PropTypes.object.isRequired,
    backgroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const ratio = props.containerDimensions.width / props.backgroundDimensions.width;

    this.state = {
      mode: 'transform',
      currentTransform: false,
      ratio,
      foregroundDimensions: {
        width: props.dimensions.width * ratio,
        height: props.dimensions.height * ratio,
        x: props.dimensions.left * ratio,
        y: props.dimensions.top * ratio
      },
      mouseCoords: {
        start: {
          x: 0,
          y: 0
        },

        current: {
          x: 0,
          y: 0
        }
      },
      zoom: {
        scale: 1,
        offset: {
          x: 0,
          y: 0
        }
      }
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  updateState(props) {
    this.setState(
      merge({}, this.state, props)
    );
  }

  componentWillReceiveProps(newProps) {
    const { props } = this;
    const updatedDimensions = props.dimensions !== newProps.dimensions;
    const updatedBackground = props.backgroundDimensions !== newProps.backgroundDimensions;
    const updatedContainer = props.containerDimensions !== newProps.containerDimensions;

    if (updatedBackground || updatedContainer) {
      this.setState({
        ratio: newProps.containerDimensions.width / newProps.backgroundDimensions.width
      });
    }

    if (updatedDimensions) {
      let ratio = this.state.ratio;

      this.setState({
        foregroundDimensions: {
          width: newProps.dimensions.width * ratio,
          height: newProps.dimensions.height * ratio,
          x: newProps.dimensions.left * ratio,
          y: newProps.dimensions.top * ratio
        }
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  zoomTransformCoordinates(coords) {
    const {
      scale,
      offset
    } = this.state.zoom;

    return {
      x: (coords.x - offset.x) / scale,
      y: (coords.y - offset.y) / scale
    };
  }

  handleMouseMove(e) {
    const coords = this.zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    this.updateState({
      mouseCoords: {
        current: coords
      }
    });
  }

  finishTransform() {
    const {
      ratio,
      foregroundDimensions
    } = this.state;
    const width = Math.round(foregroundDimensions.width / ratio);
    const height = Math.round(foregroundDimensions.height / ratio);
    const x = Math.round(foregroundDimensions.x / ratio);
    const y = Math.round(foregroundDimensions.y / ratio);

    this.props.updateTemplateForeground({
      width,
      height,
      left: x,
      top: y
    });

    this.setState({
      currentTransform: false
    });
  }

  render() {
    const {
      backgroundPath,
      containerDimensions
    } = this.props;
    const {
      mode,
      currentTransform,
      foregroundDimensions,
      mouseCoords,
      zoom
    } = this.state;

    if (containerDimensions) {
      return (
        <Surface
          width={containerDimensions.width}
          height={containerDimensions.height}
          style={styles.surface}
        >
          <ZoomGroup
            scale={zoom.scale}
            offset={zoom.offset}
            dimensions={containerDimensions}
            updateZoom={(scale, offset) => this.setState(merge({}, this.state, {
              zoom: {
                scale,
                offset
              }
            }))}
          >
            <Background
              imagePath={backgroundPath}
              dimensions={containerDimensions}
            />
            <Canvas
              mode={mode}
              transform={currentTransform}
              dimensions={containerDimensions}
              zoomOffset={zoom.offset}
              zoomScale={zoom.scale}
              loggedMouseCoords={mouseCoords.current}
              mouseDownCoords={mouseCoords.start}
              zoomTransformCoordinates={this.zoomTransformCoordinates.bind(this)}
              updateState={(props) => this.setState(merge({}, this.state, props))}
              finishTransform={this.finishTransform.bind(this)}
            />
            <Foreground
              transform={currentTransform}
              dimensions={foregroundDimensions}
              loggedMouseCoords={mouseCoords.current}
              zoomTransformCoordinates={this.zoomTransformCoordinates.bind(this)}
              updateTransform={transform => this.updateState({
                currentTransform: transform
              })}
              updateDimensions={dimensions => this.updateState({
                foregroundDimensions: dimensions
              })}
              finishTransform={this.finishTransform.bind(this)}
            />
          </ZoomGroup>
        </Surface>
      );
    }
    else {
      return (<div>Loading</div>);
    }
  }
}

const styles = {
  surface: {
    position: 'absolute',
    left: 0,
    top: 0
  },
};