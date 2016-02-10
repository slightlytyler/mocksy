'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import openFile from 'api/open-file';
import colors from 'constants/colors';
import TemplatePreview from 'pods/template/components/Preview';
import wireframe from './assets/wireframe.svg';
import Prompt from 'components/Prompt';
import Spinner from 'components/Spinner';

@Radium
export default class TemplateBuilderBackgroundContent extends Component {
  static propTypes = {
    setTemplateBackground: PropTypes.func,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
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
            width: 204,
            height: 372,
            left: 25,
            top: 70
          }
        }}
        canvasDimensions={canvasDimensions}
      >
      </TemplatePreview>
    );
  }
}

const styles = {
};
