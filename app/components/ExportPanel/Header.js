'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import addIcon from 'assets/icons/add-size.svg';

@Radium
export default class ExportPanelHeader extends Component {
  static propTypes = {
    addSize: PropTypes.func.isRequired
  };

  render() {
    const { addSize } = this.props;

    return (
      <header style={styles.base}>
        <span style={styles.text}>
          Export
        </span>

        <img
          src={addIcon}
          onClick={addSize}
          style={styles.icon}
        />
      </header>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: '.25em',
    paddingBottom: '.25em',
  },

  text: {
    fontSize: '1.25em',
    fontWeight: 400,
    color: colors.black
  },

  icon: {
    width: '1.25em',
    cursor: 'pointer',
  }
};