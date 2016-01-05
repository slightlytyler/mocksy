'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router'

import colors from 'constants/colors';

@Radium
export default class TemplateNewButton extends Component {
  static propTypes = {
  };

  render() {
    const {
    } = this.props;

    return (
      <div style={styles.base}>
        <Link
          to="/templates/new"
          style={styles.link}
        >
          + Add Template
        </Link>
      </div>
    );
  }
}

const styles = {
  base: {
    color: 'white',
    borderBottom: '2px solid white',
    cursor: 'pointer',

    ':hover': {
      color: colors.pink,
      backgroundColor: 'white'
    }
  },

  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '.5em 0'
  }
};