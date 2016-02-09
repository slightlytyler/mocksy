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
    })
  };

  render() {
    const {
      backgroundPath,
      dimensions,
      containerDimensions,
      children
    } = this.props;
    const fullDimensions = containerDimensions;

    return (
      <Surface
        width={fullDimensions.width}
        height={fullDimensions.height}
      >
        <Group
          x={0}
          y={0}
          scaleX={fullDimensions.width / dimensions.width}
          scaleY={fullDimensions.height / dimensions.height}
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