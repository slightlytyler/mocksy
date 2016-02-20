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

  static defaultProps = {
    color: 'white',
    style: {}
  };

  render() {
    const {
      children,
      onClick,
      active,
      disabled,
      color,
      altColor,
      fluid
    } = this.props;

    return (
      <button
        onClick={onClick}
        style={[
          styles.base,
          {
            color,
            borderColor: color,

            ':hover': {
              color: altColor || color,
              backgroundColor: color
            }
          },
          active && styles.active,
          active && {
            color: altColor || color,
            backgroundColor: color
          },
          disabled && styles.disabled,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    pointerEvents: 'none'
  },

  disabled: {
    opacity: '.3',
    pointerEvents: 'none'
  }
};