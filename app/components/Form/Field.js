'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class FormField extends Component {
  static propTypes = {
    children: PropTypes.object,
    label: PropTypes.string,
    flexRatio: PropTypes.number,
    isLastChild: PropTypes.bool
  };

  render() {
    const {
      children,
      label,
      flexRatio,
      isLastChild
    } = this.props;

    return (
      <div style={[
        styles.base,
        isLastChild && styles.last,
        {
          flex: flexRatio
        }
      ]}>
        {children}
        <label style={styles.label}>{label}</label>
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginRight: '1.5em'
  },

  last: {
    marginRight: 0,
  },

  label: {
    fontSize: '.8em',
    color: colors.black,
    fontWeight: 200
  }
}