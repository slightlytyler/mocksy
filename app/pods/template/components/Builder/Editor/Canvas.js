'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Surface,
  ClippingRectangle,
  LinearGradient } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import colors from 'constants/colors';

@Radium
export default class TemplateBuilderEditorCanvas extends Component {
  static propTypes = {
    dimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object
  };

  render() {
    const {
      dimensions,
      backgroundDimensions,
      containerDimensions
    } = this.props;
    const ratio = containerDimensions.width / backgroundDimensions.width;

    const left = dimensions.left * ratio;
    const top = dimensions.top * ratio;
    const width = dimensions.width * ratio;
    const height =dimensions.height * ratio;

    if (containerDimensions) {
      return (
        <Surface
          width={containerDimensions.width}
          height={containerDimensions.height}
          style={styles.surface}
        >
          <ClippingRectangle
            x={left}
            y={top}
            width={width}
            height={height}
          >
            <Rectangle
              x={left}
              y={top}
              width={width}
              height={height}
              fill={new LinearGradient([colors.pink, colors.orange])}
              stroke={colors.white}
              strokeWidth={4}
              strokeDash={[9, 10]}
              strokeCap="square"
            />
          </ClippingRectangle>
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
  }
};