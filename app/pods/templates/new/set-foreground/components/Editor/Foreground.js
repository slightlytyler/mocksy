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
    updateDimensions: PropTypes.func.isRequired
  }

  state = {
    transform: 'none',
    mouseCoords: {
      down: {
      },
      logged: {
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDown = e => {
    const mouseDownCoords = {
      x: e.offsetX,
      y: e.offsetY
    };

    this.setState({
      transform: 'drag',
      mouseCoords: {
        down: mouseDownCoords,
        logged: mouseDownCoords
      }
    });
  }

  handleMouseUp = e => {
    this.setState({
      transform: 'none'
    });
  }

  handleMouseMove = e => {
    const { transform } = this.state;

    switch (transform) {
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
    const loggedMouseCoords = this.state.mouseCoords.logged;
    const xDiff = currentMouseCoords.x - loggedMouseCoords.x;
    const yDiff = currentMouseCoords.y - loggedMouseCoords.y;

    this.props.updateDimensions({
      x: xDiff,
      y: yDiff
    });

    this.updateLoggedMouseCoords(currentMouseCoords);
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
      dimensions
    } = this.props;
    const {
      x,
      y,
      width,
      height
    } = dimensions;
    return (
      <Group
        x={x}
        y={y}
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