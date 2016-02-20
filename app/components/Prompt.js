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

  iconSize = (containerDimensions) => {
    const {
      width,
      height
    } = containerDimensions;
    const containerMin = width >= height ? width : height;

    return containerMin / 8;
  }

  verticalSpacing = this.props.fontSize / 4;

  renderIcon = () => {
    const { verticalSpacing } = this;
    const {
      fontSize,
      icon,
      containerDimensions
    } = this.props;
    const iconSize = this.iconSize(containerDimensions);

    return (
      <Rectangle
        x={-(iconSize / 2)}
        y={-iconSize - (fontSize / 2) - verticalSpacing}
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

  renderNote = () => {
    const { defaultColor } = this;
    const {
      note,
      fontSize,
      color
    } = this.props;

    return (
      <Text
        fill={color || defaultColor}
        font={`200 ${fontSize / 2}px "Roboto"`}
        x={0}
        y={fontSize}
        alignment="center"
      >
        {note}
      </Text>
    );
  }

  render() {
    const {
      defaultColor,
      verticalSpacing
    } = this;
    const {
      text,
      note,
      fontSize,
      icon,
      color,
      containerDimensions,
    } = this.props;
    const {
      width,
      height
    } = containerDimensions;
    const iconSize = this.iconSize(containerDimensions);

    return (
      <Group
        x={0}
        y={0}
      >
        <Group
          x={containerDimensions.width / 2}
          y={(containerDimensions.height / 2) + (iconSize / 2) + (verticalSpacing / 2)}
        >
          {
            icon
            && this.renderIcon()
          }
          <Text
            fill={color || defaultColor}
            font={`200 ${fontSize}px "Roboto"`}
            x={0}
            y={-fontSize / 2}
            alignment="center"
          >
            {text}
          </Text>
          {
            note
            && this.renderNote()
          }
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