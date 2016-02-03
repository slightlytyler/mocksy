'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Editor from 'pods/template/components/Builder/Editor';

@Radium
export default class TemplateBuilderForegroundContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    record: PropTypes.object,
    updateTemplateForeground: PropTypes.func,
    setTemplateForeground: PropTypes.func
  };


  render() {
    const {
      canvasDimensions,
      record,
      updateTemplateForeground
    } = this.props;
    const {
      backgroundPath,
      dimensions
    } = record;

    return (
      <Editor
        backgroundPath={backgroundPath}
        dimensions={dimensions}
        foregroundDimensions={dimensions.foreground}
        canvasDimensions={canvasDimensions}
        updateTemplateForeground={updateTemplateForeground}
      />
    );
  }
}

const styles = {
};