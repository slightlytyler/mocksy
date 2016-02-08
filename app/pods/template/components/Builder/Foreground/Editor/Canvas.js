'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Surface } from 'react-art';
import { merge } from 'lodash';

import ZoomGroup from './ZoomGroup'
import Background from './Background';
import Foreground from './Foreground';
import ArtBoard from './ArtBoard';

@Radium
export default class TemplateBuilderEditorSurface extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    updateEditorState: PropTypes.func.isRequired,
    backgroundPath: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    backgroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const ratio = props.containerDimensions.width / props.backgroundDimensions.width;

    this.state = {
      ratio,
      mouseCoords: {
        start: {
          x: 0,
          y: 0
        },

        current: {
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

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
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

  zoomTransformCoordinates(coords) {
    const {
      scale,
      offset
    } = this.props.editorState.zoom;

    return {
      x: (coords.x - offset.x) / scale,
      y: (coords.y - offset.y) / scale
    };
  }

  finishTransform() {
    const { ratio } = this.state;
    const {
      width,
      height,
      x,
      y
    } = this.props.editorState.foregroundDimensions;

    this.props.updateTemplateForeground({
      width,
      height,
      left: x,
      top: y
    });

    this.props.updateEditorState({
      currentTransform: false
    });
  }

  render() {
    const {
      editorState,
      updateEditorState,
      backgroundPath,
      containerDimensions
    } = this.props;
    const {
      mode,
      currentTransform,
      foregroundDimensions,
      zoom
    } = editorState;
    const {
      ratio,
      mouseCoords
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
            <ArtBoard
              mode={mode}
              transform={currentTransform}
              dimensions={containerDimensions}
              loggedMouseCoords={mouseCoords.current}
              mouseDownCoords={mouseCoords.start}
              zoomOffset={zoom.offset}
              updateTransform={transform => this.updateState({
                currentTransform: transform
              })}
              updateDimensions={dimensions => this.updateState({
                foregroundDimensions: dimensions
              })}
              updateMouseDownCoords={coords => this.updateState({
                mouseCoords: {
                  start: coords
                }
              })}
              updateZoomOffset={offset => this.updateState({
                zoom: {
                  offset
                }
              })}
              finishTransform={this.finishTransform.bind(this)}
              zoomTransformCoordinates={this.zoomTransformCoordinates.bind(this)}
            />
            <Foreground
              transform={currentTransform}
              dimensions={foregroundDimensions}
              ratio={ratio}
              loggedMouseCoords={mouseCoords.current}
              updateTransform={transform => updateEditorState({
                currentTransform: transform
              })}
              updateDimensions={dimensions => updateEditorState({
                foregroundDimensions: dimensions
              })}
              finishTransform={this.finishTransform.bind(this)}
              zoomTransformCoordinates={this.zoomTransformCoordinates.bind(this)}
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