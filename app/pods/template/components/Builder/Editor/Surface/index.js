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
      transforming: false,
      ratio,
      rectDimensions: {
        width: props.dimensions.width * ratio,
        height: props.dimensions.height * ratio,
        x: props.dimensions.left * ratio,
        y: props.dimensions.top * ratio
      },
      mouseCoords: {
        x: 0,
        y: 0
      },
      mouseDownCoords: {
        x: 0,
        y: 0
      },
      zoomScale: 1,
      zoomOffset: {
        x: 0,
        y: 0
      }
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
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
        rectDimensions: {
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
      zoomScale,
      zoomOffset
    } = this.state;

    return {
      x: (coords.x - zoomOffset.x) / zoomScale,
      y: (coords.y - zoomOffset.y) / zoomScale
    };
  }

  handleMouseMove(e) {
    const coords = this.zoomTransformCoordinates({
      x: e.offsetX,
      y: e.offsetY
    });

    this.setState({
      mouseCoords: coords
    });
  }

  finishTransform() {
    const {
      ratio,
      rectDimensions
    } = this.state;
    const width = Math.round(rectDimensions.width / ratio);
    const height = Math.round(rectDimensions.height / ratio);
    const x = Math.round(rectDimensions.x / ratio);
    const y = Math.round(rectDimensions.y / ratio);

    this.props.updateTemplateForeground({
      width,
      height,
      left: x,
      top: y
    });

    this.setState({
      transforming: false
    });
  }

  render() {
    const {
      backgroundPath,
      containerDimensions
    } = this.props;
    const {
      mode,
      transforming,
      rectDimensions,
      mouseCoords,
      mouseDownCoords,
      zoomScale,
      zoomOffset
    } = this.state;

    if (containerDimensions) {
      return (
        <Surface
          width={containerDimensions.width}
          height={containerDimensions.height}
          style={styles.surface}
        >
          <ZoomGroup
            scale={zoomScale}
            offset={zoomOffset}
            dimensions={containerDimensions}
            updateState={(props) => this.setState(merge({}, this.state, props))}
          >
            <Background
              imagePath={backgroundPath}
              dimensions={containerDimensions}
            />
            <Canvas
              mode={mode}
              transforming={transforming}
              dimensions={containerDimensions}
              zoomOffset={zoomOffset}
              zoomScale={zoomScale}
              loggedMouseCoords={mouseCoords}
              mouseDownCoords={mouseDownCoords}
              zoomTransformCoordinates={this.zoomTransformCoordinates.bind(this)}
              updateState={(props) => this.setState(merge({}, this.state, props))}
              finishTransform={this.finishTransform.bind(this)}
            />
            <Foreground
              transforming={transforming}
              dimensions={rectDimensions}
              loggedMouseCoords={mouseCoords}
              zoomTransformCoordinates={this.zoomTransformCoordinates.bind(this)}
              updateState={(props) => this.setState(merge({}, this.state, props))}
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