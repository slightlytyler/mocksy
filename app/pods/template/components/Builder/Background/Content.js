'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import addIcon from 'assets/icons/add-pink.svg';
import colors from 'constants/colors';
import TemplatePreview from 'pods/template/components/Preview';
import wireframe from './assets/wireframe.svg';
import Prompt from 'components/Prompt';
import Spinner from 'components/Spinner';

@Radium
export default class TemplateBuilderBackgroundContent extends Component {
  static propTypes = {
    addTemplateBackground: PropTypes.func,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  render() {
    const {
      setTemplateBackground,
      canvasDimensions
    } = this.props;

    return (
      <TemplatePreview
        backgroundPath={wireframe}
        dimensions={{
          width: 255,
          height: 512,

          foreground: {
            x: 25,
            y: 70,
            width: 203,
            height: 371
          }
        }}
        canvasDimensions={canvasDimensions}
        cursor="pointer"
        handleClick={setTemplateBackground}
      >
        <Prompt
          text="Add a background"
          fontSize={20}
          icon={addIcon}
          color={colors.pink}
          containerDimensions={{
            width: 203,
            height: 371
          }}
        />
      </TemplatePreview>
    );
  }
}

const styles = {
};
