'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { mapValues, capitalize } from 'lodash';
import { Group } from 'react-art';

import Foreground from './Foreground';

@Radium
export default class TemplatesNewSetForegroundEditor extends Component {
  static propTypes = {
    realToScreenScale: PropTypes.number,
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
    updateTemplateForeground: PropTypes.func.isRequired
  }

  state = {
    transform: {
      type: 'none'
    },
    transformXDiff: 0,
    transformYDiff: 0,
    transformWidthDiff: 0,
    transformHeightDiff: 0,
    mouseDownCoords: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.dimensions !== this.props.dimensions) {
      this.setState({
        transformXDiff: 0,
        transformYDiff: 0,
        transformWidthDiff: 0,
        transformHeightDiff: 0
      });
    }
  }

  scaleToReal = val => val / this.props.realToScreenScale;

  startTransform = (event, type, args) => {
    const mouseDownCoords = {
      x: event.offsetX,
      y: event.offsetY
    };

    this.setState({
      transform: {
        type,
        args
      },
      mouseDownCoords
    });
  }

  endTransform = () => {
    const {
      transformXDiff,
      transformYDiff,
      transformWidthDiff,
      transformHeightDiff
    } = this.state;

    if ((transformXDiff !== 0) || (transformYDiff !== 0) || (transformWidthDiff !== 0) || (transformHeightDiff !== 0)) {
      this.props.updateTemplateForeground({
        x: transformXDiff,
        y: transformYDiff,
        width: transformWidthDiff,
        height: transformHeightDiff
      });
    }

    this.setState({
      transform: {
        type: 'none'
      }
    });
  }

  updateTransformDiff = diff => {
    Object.keys(diff).forEach(key =>
      this.setState({
        [`transform${capitalize(key)}Diff`]: this.scaleToReal(diff[key])
      })
    );
  }

  render() {
    const {
      startTransform,
      endTransform,
      updateTransformDiff
    } = this;
    const {
      transform,
      transformXDiff,
      transformYDiff,
      transformWidthDiff,
      transformHeightDiff,
      mouseDownCoords
    } = this.state;
    const { dimensions } = this.props;

    return (
      <Group>
        <Foreground
          dimensions={dimensions.foreground}
          transform={transform}
          transformDiff={{
            x: transformXDiff,
            y: transformYDiff,
            width: transformWidthDiff,
            height: transformHeightDiff
          }}
          startTransform={startTransform}
          endTransform={endTransform}
          updateTransformDiff={updateTransformDiff}
          mouseDownCoords={mouseDownCoords}
        />
      </Group>
    );
  }
}

const styles = {
};