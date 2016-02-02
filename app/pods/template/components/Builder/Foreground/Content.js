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
    setTemplateForeground: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        foregroundWidth: '',
        foregroundHeight: '',
        foregroundLeft: '',
        foregroundTop: ''
      }
    };
  }

  render() {
    const { record } = this.props;
    const {
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = this.state.form;

    return (
      <Editor
        backgroundPath={record.backgroundPath}
        foregroundDimensions={{
          left: 100,
          top: 100,
          width: 100,
          height: 100
        }}
      />
    );
  }
}

const styles = {
};