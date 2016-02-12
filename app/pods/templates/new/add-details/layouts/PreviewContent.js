'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplatesNewAddDetailsPreviewContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    setTemplateDetails: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: ''
      }
    };
  }

  render() {
    const { name } = this.state.form;

    return (
      <div>Editor Here</div>
    );
  }
}

const styles = {
};