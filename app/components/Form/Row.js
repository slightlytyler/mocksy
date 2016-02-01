'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class FormRow extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    isLastRow: PropTypes.bool
  };

  render() {
    const {
      isLastRow,
      children
    } = this.props;
    const manyChildren = Array.isArray(children);

    return (
      <div style={[
        styles.base,
        isLastRow && styles.last
      ]}>
        {
          manyChildren
          ? children.map((child, index) =>
            index + 1 === children.length
            ? React.cloneElement(child, {
              isLastChild: true
            })
            : child
          )
          : React.cloneElement(children, {
            isLastChild: true
          })
        }
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '.75em'
  },

  last: {
    marginBottom: 0
  }
};