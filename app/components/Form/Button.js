'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class FormButton extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string
    ]).isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    fluid: PropTypes.bool
  };

  render() {
    const {
      children,
      onClick,
      active,
      disabled,
      color,
      fluid
    } = this.props;

    return (
      <button
        onClick={onClick}
        style={[
          styles.base,
          active && styles.active,
          disabled && styles.disabled,
          color && {
            color,
            borderColor: color,

            ':hover': {
              color: 'white',
              backgroundColor: color
            }
          },
          fluid && {
            width: '100%'
          }
        ]}
      >
        {children}
      </button>
    );
  }
}

const styles = {
  base: {
    flex: 1,
    color: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    cursor: 'pointer',

    ':hover': {
      color: colors.pink,
      backgroundColor: 'white'
    }
  },

  active: {
    color: colors.pink,
    backgroundColor: 'white',
    pointerEvents: 'none'
  },

  disabled: {
    opacity: '.3',
    pointerEvents: 'none'
  }
};