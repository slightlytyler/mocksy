'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Surface, Group } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import Background from './Background';
import Foreground from './Foreground';

@Radium
export default class TemplatePreviewCanvas extends Component {
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
    containerDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    cursor: PropTypes.string,
    handleClick: PropTypes.func
  };

  render() {
    const {
      backgroundPath,
      dimensions,
      containerDimensions,
      cursor,
      handleClick,
      children
    } = this.props;
    const onScreenDimensions = containerDimensions;

    return (
      <Surface
        width={onScreenDimensions.width}
        height={onScreenDimensions.height}
      >
        <Group
          x={0}
          y={0}
          scaleX={onScreenDimensions.width / dimensions.width}
          scaleY={onScreenDimensions.height / dimensions.height}
          cursor={cursor || 'default'}
          onClick={handleClick}
        >
          <Background
            imagePath={backgroundPath}
            dimensions={dimensions}
          />
          <Foreground dimensions={dimensions.foreground}>
            {children}
          </Foreground>
        </Group>
      </Surface>
    );
  }
}

const styles = {
};