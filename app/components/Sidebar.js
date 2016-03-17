'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import colors from 'constants/colors';

@Radium
export default class Sidebar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }

  renderChildren = () => {
    const { children } = this.props;
    const manyChildren = Array.isArray(children);

    if (children) {
      return (
        manyChildren
        ? children
        : React.cloneElement(children, {
          style: styles.base
        })
      );
    }
  }

  render() {
    return (
      <section
        className="sidebar"
        style={styles.base}
      >
        {this.renderChildren()}
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