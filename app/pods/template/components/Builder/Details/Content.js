'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplateBuilderDetailsContent extends Component {
  static propTypes = {
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    setTemplateDetails: PropTypes.func.isRequired
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