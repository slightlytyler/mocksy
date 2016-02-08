'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Editor from 'pods/template/components/Builder/Foreground/Editor';

@Radium
export default class TemplateBuilderForegroundContent extends Component {
  static propTypes = {
    record: PropTypes.object,
    updateTemplateForeground: PropTypes.func,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };


  render() {
    const {
      record,
      updateTemplateForeground,
      canvasDimensions
    } = this.props;
    const {
      backgroundPath,
      dimensions
    } = record;

    return (
      <Editor
        foregroundDimensions={dimensions.foreground}
        backgroundDimensions={dimensions}
        canvasDimensions={canvasDimensions}
        backgroundImagePath={backgroundPath}
        updateTemplateForeground={updateTemplateForeground}
      />
    );
  }
}

const styles = {
};