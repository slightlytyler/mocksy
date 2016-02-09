'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import AspectContainer from 'components/AspectContainer';
import Canvas from './Canvas';

@Radium
export default class TemplatePreview extends Component {
  static propTypes = {
    backgroundPath: PropTypes.string.isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      foreground: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
      })
    }),
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };
  render() {
    const {
      backgroundPath,
      dimensions,
      canvasDimensions,
      children
    } = this.props;

    return (
      <AspectContainer
        dimensions={dimensions}
        canvasDimensions={canvasDimensions}
      >
        <Canvas
          backgroundPath={backgroundPath}
          dimensions={dimensions}
        >
          {children}
        </Canvas>
      </AspectContainer>
    );
  }
}

const styles = {
  background: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%'
  }
};