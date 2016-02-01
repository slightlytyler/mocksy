'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import colors from 'constants/colors';

@Radium
export default class Sidebar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ])
  };

  render() {
    return (
      <section
        className="sidebar"
        style={styles.base}
      >
        {this.props.children}
      </section>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 4,
    position: 'relative',
    height: '100vh',
    background: colors.featureGradient,
    boxShadow: 'rgba(0, 0, 0, 0.25) 2px 0 4px'
  }
};