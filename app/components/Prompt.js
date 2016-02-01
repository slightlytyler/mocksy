'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class Prompt extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string
  };

  render() {
    const {
      text,
      children
    } = this.props;
    const color = this.props.color || 'white';

    return (
     <div style={styles.base}>
        <img
          src={`assets/icons/add-${color}.svg`}
          style={styles.icon}
        />
        <span
          ref="prompt"
          style={[
            styles.text,
            {
              color: colors[color]
            }
          ]}
        >
          {text}
        </span>
        {children}
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    color: 'white',
    textAlign: 'center'
  },

  icon: {
    width: '4em',
    marginBottom: '1em',
  },

  text: {
    marginBottom: '.25em',
    fontSize: '1.6em',
    fontWeight: 200,
  }
};