'use strict'

import React, { Component, PropTypes } from 'react';
import {
  Surface,
  ClippingRectangle,
  LinearGradient } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import Radium from 'radium';

import colors from 'constants/colors';
import AspectContainer from 'components/AspectContainer';

@Radium
export default class TemplateBuilderEditor extends Component {
  static propTypes = {
  };

  render() {
    const {
      backgroundPath,
      dimensions,
      foregroundDimensions,
      canvasDimensions,
    } = this.props;

    return (
      <AspectContainer
        dimensions={dimensions}
        canvasDimensions={canvasDimensions}
        style={styles.container}
      >
        <img
          src={backgroundPath}
          style={styles.background}
        />
        <Surface
          width={500}
          height={500}
          style={styles.surface}
        >
          <ClippingRectangle
            x={foregroundDimensions.left}
            y={foregroundDimensions.top}
            width={foregroundDimensions.width}
            height={foregroundDimensions.height}
          >
            <Rectangle
              x={foregroundDimensions.left}
              y={foregroundDimensions.top}
              width={foregroundDimensions.width}
              height={foregroundDimensions.height}
              fill={new LinearGradient([colors.pink, colors.orange])}
              stroke={colors.white}
              strokeWidth={4}
              strokeDash={[9, 10]}
              strokeCap="square"
            />
          </ClippingRectangle>
        </Surface>
      </AspectContainer>
    )
  }
}

const styles = {
  container: {
    border: `2px solid ${colors.gray}`
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