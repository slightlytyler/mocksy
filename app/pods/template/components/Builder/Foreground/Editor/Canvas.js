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
export default class TemplateBuilderForegroundEditorCanvas extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    updateEditorState: PropTypes.func.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    backgroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object,
    backgroundPath: PropTypes.string.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  state = {
    ratio: this.props.containerDimensions.width / this.props.backgroundDimensions.width,
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
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseMove = e => {
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

  updateState = props => {
    this.setState(
      merge({}, this.state, props)
    );
  }

  zoomTransformCoordinates = coords => {
    const {
      scale,
      offset
    } = this.props.editorState.zoom;

    return {
      x: (coords.x - offset.x) / scale,
      y: (coords.y - offset.y) / scale
    };
  }

  finishTransform = () => {
    this.props.updateEditorState({
      currentTransform: false
    });
  }

  render() {
    const {
      state,
      updateState,
      zoomTransformCoordinates,
      finishTransform
    } = this;
    const {
      editorState,
      updateEditorState,
      foregroundDimensions,
      containerDimensions,
      backgroundPath,
      updateTemplateForeground
    } = this.props;
    const {
      mode,
      currentTransform,
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
            updateZoom={(scale, offset) => updateEditorState(merge({}, state, {
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
              ratio={ratio}
              loggedMouseCoords={mouseCoords.current}
              mouseDownCoords={mouseCoords.start}
              zoomOffset={zoom.offset}
              updateTransform={transform => updateEditorState({
                currentTransform: transform
              })}
              updateDimensions={updateTemplateForeground}
              updateMouseDownCoords={coords => updateState({
                mouseCoords: {
                  start: coords
                }
              })}
              updateZoomOffset={offset => updateEditorState({
                zoom: {
                  offset
                }
              })}
              finishTransform={finishTransform}
              zoomTransformCoordinates={zoomTransformCoordinates}
            />
            <Foreground
              transform={currentTransform}
              dimensions={foregroundDimensions}
              ratio={ratio}
              loggedMouseCoords={mouseCoords.current}
              updateTransform={transform => updateEditorState({
                currentTransform: transform
              })}
              updateDimensions={updateTemplateForeground}
              finishTransform={finishTransform}
              zoomTransformCoordinates={zoomTransformCoordinates}
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