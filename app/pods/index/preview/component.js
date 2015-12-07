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
        <Template />
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