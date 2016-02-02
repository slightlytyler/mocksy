'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Input from 'components/Form/Input';

@Radium
export default class FormInputNumber extends Component {
  static propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired
  };

  render() {
    const {
      value,
      placeholder,
      handleChange
    } = this.props;

    return (
      <Input
        value={value || ''}
        placeholder={placeholder}
        onChange={e =>
          e.target.value
          ? !isNaN(e.target.value)
          && e.target.value !== value
          && handleChange(Number(e.target.value))
          : handleChange(0)
        }
      />
    );
  }
}

const styles = {
};