'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  Text,
  Pattern
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

@Radium
export default class Prompt extends Component {
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    containerDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  defaultColor = 'white';

  renderIcon = () => {
    const {
      fontSize,
      icon,
      containerDimensions
    } = this.props;
    const {
      width,
      height
    } = containerDimensions;
    const containerMin = width >= height ? width : height;
    const iconSize = containerMin / 8;

    return (
      <Rectangle
        x={-(iconSize / 2)}
        y={-(iconSize / 2) - (fontSize * 1.3) - (iconSize / 4)}
        width={iconSize}
        height={iconSize}
        fill={
          new Pattern(
            icon,
            iconSize,
            iconSize,
            0,
            0
          )
        }
      />
    );
  }

  render() {
    const {
      text,
      fontSize,
      icon,
      color,
      containerDimensions,
      children
    } = this.props;

    const { defaultColor } = this;
    const {
      width,
      height
    } = containerDimensions;

    return (
      <Group
        x={0}
        y={0}
      >
        <Group
          x={containerDimensions.width / 2}
          y={containerDimensions.height / 2}
        >
          {
            icon
            && this.renderIcon()
          }
          <Text
            fill={color || defaultColor}
            font={`200 ${fontSize}px "Roboto"`}
            x={0}
            y={-fontSize * .5}
            alignment="center"
          >
            {text}
          </Text>
          {children}
        </Group>
        <Rectangle
          x={0}
          y={0}
          width={containerDimensions.width}
          height={containerDimensions.height}
          fill="rgba(0, 0, 0, 0)"
          cursor="pointer"
        />
      </Group>
    );
  }
}

const styles = {
};