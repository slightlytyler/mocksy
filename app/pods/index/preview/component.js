'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Template from 'pods/template/component';

@Radium
export default class IndexPreview extends Component {
  static propTypes = {
  };

  render() {
    return (
      <section
        className="preview"
        style={styles.base}
      >
        <Template
          dimensions={{
            width: 768,
            height: 1596,

            foreground: {
              width: 678,
              height: 1204,
              left: 45,
              top: 193
            }
          }}
        />
      </section>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 10,
    height: '100vh',
    padding: '7.5em',
  },
};