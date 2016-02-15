'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  ClippingRectangle,
  LinearGradient
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import immutable from 'object-path-immutable';

import colors from 'constants/colors';

@Radium
export default class TemplatesNewSetForegroundEditorForeground extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    transformType: PropTypes.string.isRequired,
    transformDiff: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    updateTransformDiff: PropTypes.func.isRequired,
    mouseDownCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  }


  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDown = e => {
    this.props.startTransform('drag', e);
  }

  handleMouseUp = e => {
    this.props.endTransform();
  }

  handleMouseMove = e => {
    const { transformType } = this.props;

    switch (transformType) {
      case 'drag':
        return this.handleDrag(e);

      case 'scale':
        return this.handleScale(e);
    }
  }

  handleDrag = e => {
    const currentMouseCoords = {
      x: e.offsetX,
      y: e.offsetY
    };
    const { mouseDownCoords } = this.props;
    const xDiff = currentMouseCoords.x - mouseDownCoords.x;
    const yDiff = currentMouseCoords.y - mouseDownCoords.y;

    this.props.updateTransformDiff({
      x: xDiff,
      y: yDiff
    });
  }

  handleScale = e => {
    console.log('scaling');
  }

  updateLoggedMouseCoords = coords => {
    this.setState({
      mouseCoords: immutable.set(this.state.mouseCoords, 'logged', coords)
    });
  }

  render() {
    const {
      handleMouseDown,
      handleMouseUp
    } = this;
    const {
      dimensions,
      transformDiff
    } = this.props;
    const {
      x,
      y,
      width,
      height
    } = dimensions;
    return (
      <Group
        x={x + transformDiff.x}
        y={y + transformDiff.y}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        cursor="move"
      >
        <ClippingRectangle
          x={0}
          y={0}
          width={width}
          height={width}
        >
          <Rectangle
            x={0}
            y={0}
            width={width}
            height={height}
            fill={new LinearGradient([colors.pink, colors.orange])}
            stroke={colors.white}
            strokeWidth={4}
            strokeDash={[9, 10]}
            strokeCap="square"
          />
        </ClippingRectangle>
      </Group>
    );
  }
}

const styles = {
};