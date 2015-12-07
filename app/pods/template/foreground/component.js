'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import EmptyState from 'pods/template/foreground/empty/component';

@Radium
export default class TemplateForeground extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div
        className="foreground"
        style={[
          styles.base,
          {
            width: '88%',
            height: '75.5%',
            left: '6%',
            top: '12%'
          }
        ]}
      >
        <EmptyState />
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#38B8E2'
  },
};