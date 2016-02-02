'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class Spinner extends Component {
  static propTypes = {
  };

  render() {
    const { color } = this.props;

    return (
      <div style={styles.container}>
        <span style={[
          styles.loader,
          color && {
            borderColor: color
          }
        ]}>
          <span style={[
            styles.loaderInner,
            color && {
              backgroundColor: color
            }
          ]} />
        </span>
      </div>
    );
  }
}

const loaderKeyframes = Radium.keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },

  '25%': {
    transform: 'rotate(180deg)'
  },

  '50%': {
    transform: 'rotate(180deg)'
  },

  '75%': {
    transform: 'rotate(360deg)'
  },

  '100%': {
    transform: 'rotate(360deg)'
  }
}, 'loader');

const loaderInnerKeyframes = Radium.keyframes({
  '0%': {
    height: '0%'
  },

  '25%': {
    height: '0%'
  },

  '50%': {
    height: '100%'
  },

  '75%': {
    height: '100%'
  },

  '100%': {
    height: '0%'
  }
}, 'loader-inner');

const styles = {
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  loader: {
    width: '30px',
    height: '30px',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: 'white',
    display: 'inline-block',
    animation: `${loaderKeyframes} 2s infinite ease`
  },

  loaderInner: {
    verticalAlign: 'top',
    display: 'inline-block',
    width: '100%',
    backgroundColor: 'white',
    animation: `${loaderInnerKeyframes} 2s infinite ease-in`
  }
};