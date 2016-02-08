'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { merge, mapValues } from 'lodash';

import colors from 'constants/colors';
import AspectContainer from 'components/AspectContainer';
import Canvas from './Canvas';

@Radium
export default class TemplateBuilderForegroundEditor extends Component {
  static propTypes = {
    foregroundDimensions: PropTypes.object.isRequired,
    backgroundDimensions: PropTypes.object.isRequired,
    canvasDimensions: PropTypes.object.isRequired,
    backgroundImagePath: PropTypes.string.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired
  }

  state = {
    mode: 'transform',
    currentTransform: false,
    zoom: {
      scale: 1,
      offset: {
        x: 0,
        y: 0
      }
    }
  }

  updateState = props => {
    this.setState(
      merge({}, this.state, props)
    );
  }

  updateTemplateForeground = props => {
    this.props.updateTemplateForeground(
      mapValues(props, prop => Math.round(prop))
    );
  }

  render() {
    const {
      state,
      updateState,
      updateTemplateForeground
    } = this;
    const {
      foregroundDimensions,
      backgroundDimensions,
      canvasDimensions,
      backgroundImagePath
    } = this.props;

    return (
      <AspectContainer
        dimensions={backgroundDimensions}
        canvasDimensions={canvasDimensions}
      >
        <div style={styles.border} />
        <Canvas
          editorState={state}
          updateEditorState={updateState}
          foregroundDimensions={foregroundDimensions}
          backgroundDimensions={backgroundDimensions}
          backgroundPath={backgroundImagePath}
          updateTemplateForeground={updateTemplateForeground}
        />
      </AspectContainer>
    )
  }
}

const styles = {
  border: {
    boxSizing: 'content-box',
    position: 'absolute',
    left: 'calc(0% - 2px)',
    top: 'calc(0% - 2px)',
    width: '100%',
    height: '100%',
    border: `2px solid ${colors.gray}`,
  }
};