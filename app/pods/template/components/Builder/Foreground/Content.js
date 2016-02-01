'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplateBuilderForegroundContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
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
    const {
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = this.state.form;

    return (
      <div>Editor Here</div>
    );
  }
}

const styles = {
};