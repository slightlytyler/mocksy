'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class FormInput extends Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <input
        {...this.props}
        style={styles.base}
      />
    );
  }
}

const styles = {
  base: {
    width: '100%',
    padding: '1px 1px 1px .25em',
    marginBottom: '.3em',
    fontSize: '.9em',
    color: colors.black,
    border: `1px solid ${colors.pink}`
  },
};