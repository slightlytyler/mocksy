'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  Text,
  LinearGradient
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import openFile from 'api/open-file';
import addIcon from 'assets/icons/add-white.svg';
import colors from 'constants/colors';
import Prompt from 'components/Prompt';

@Radium
export default class ScreenshotAddPrompt extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
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
      <Prompt
        text="Add a screenshot"
        note={`(${dimensions.width} x ${dimensions.height})`}
        fontSize={80}
        icon={addIcon}
        containerDimensions={dimensions}
      />
    );
  }

  render() {
    const {
      dimensions,
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