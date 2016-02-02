'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Editor from 'pods/template/components/Builder/Editor';

@Radium
export default class TemplateBuilderForegroundContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    record: PropTypes.object.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired,
    setTemplateForeground: PropTypes.func.isRequired
  };


  render() {
    const {
      canvasDimensions,
      record
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
      />
    );
  }
}

const styles = {
};