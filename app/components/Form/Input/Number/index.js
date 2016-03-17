'use strict'

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Radium from 'radium';

import Input from 'components/Form/Input';

@Radium
export default class FormInputNumber extends Component {
  static propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown, false);
  }

  handleChange = e => {
    const { value } = this.props;
    if (e.target.value || e.target.value === '') {
      if (!isNaN(e.target.value) && e.target.value !== value) {
        this.props.handleChange(Number(e.target.value))
      }
      else {
        this.props.handleChange(0)
      }
    }
  }

  handleKeydown = e => {
    if (document.activeElement === findDOMNode(this.refs.input)) {
      const { keyCode, shiftKey } = e;
      const upArrow = 38;
      const downArrow = 40;

      if (keyCode === upArrow || keyCode === downArrow) {
        e.preventDefault();

        const increment = shiftKey ? 10 : 1;
        const { value, handleChange } = this.props;

        switch (keyCode) {
          case upArrow:
            handleChange(value + increment);
            break;

          case downArrow:
            if (value !== 0) {
              value - increment < 0
                ? handleChange(0)
                : handleChange(value - increment)
              ;
            }
            break;
        }
      }
    }
  }

  render() {
    const {
      value,
      placeholder
    } = this.props;

    return (
      <Input
        ref="input"
        value={value || ''}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

const styles = {
};