'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import AspectContainer from 'components/AspectContainer';
import Canvas from 'pods/template/components/Builder/Editor/Canvas';

@Radium
export default class TemplateBuilderEditor extends Component {
  static propTypes = {
    backgroundPath: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    canvasDimensions: PropTypes.object.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  render() {
    const {
      backgroundPath,
      dimensions,
      foregroundDimensions,
      canvasDimensions,
      updateTemplateForeground
    } = this.props;

    return (
      <AspectContainer
        ref="container"
        dimensions={dimensions}
        canvasDimensions={canvasDimensions}
        style={styles.container}
      >
        <div style={styles.border} />
        <img
          src={backgroundPath}
          style={styles.background}
        />
        <Canvas
          dimensions={foregroundDimensions}
          backgroundDimensions={dimensions}
          updateTemplateForeground={updateTemplateForeground}
        />
      </AspectContainer>
    )
  }
}

const styles = {
  container: {
  },

  border: {
    boxSizing: 'content-box',
    position: 'absolute',
    left: 'calc(0% - 2px)',
    top: 'calc(0% - 2px)',
    width: '100%',
    height: '100%',
    border: `2px solid ${colors.gray}`,
  },

  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },

  surface: {
    position: 'absolute',
    left: 0,
    top: 0
  }
};