'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  Text,
  LinearGradient,
  Pattern
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import openFile from 'api/open-file';
import addIcon from 'assets/icons/add-white.svg';
import colors from 'constants/colors';

@Radium
export default class ScreenshotAddPrompt extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    expectedDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    transparent: PropTypes.bool.isRequired,
    setCurrentScreenshot: PropTypes.func.isRequired
  }

  handleClick = () => {
    openFile(this.props.setCurrentScreenshot)
  }

  renderPrompt = () => {
    const { dimensions } = this.props;

    return (
      <Group
        x={dimensions.width / 2}
        y={dimensions.height / 2}
      >
        <Rectangle
          x={-75}
          y={-200}
          width={150}
          height={150}
          fill={
            new Pattern(
              addIcon,
              150,
              150,
              0,
              0
            )
          }
        />
        <Text
          fill="white"
          font='200 80px "Roboto"'
          x={-310}
          y={-80}
        >
          Add a screenshot
        </Text>
      </Group>
    );
  }

  render() {
    const {
      dimensions,
      expectedDimensions,
      transparent
    } = this.props;
    return (
      <Group
        onClick={this.handleClick}
      >
        <Rectangle
          width={dimensions.width}
          height={dimensions.height}
          fill={
            transparent
            ? 'rgba(0, 0, 0, 0)'
            : new LinearGradient([colors.pink, colors.orange])
          }
        />
        {
          !transparent
          && this.renderPrompt()
        }
      </Group>
    );
  }
}

const styles = {
};