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
    cursor: PropTypes.string,
    handleClick: PropTypes.func,
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
      cursor,
      handleClick,
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
          cursor={cursor}
          handleClick={handleClick}
        >
          {children}
        </Canvas>
      </AspectContainer>
    );
  }
}

const styles = {
};