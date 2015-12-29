'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class IndexSideBarExportPanelHeader extends Component {
  static propTypes = {
    addSize: PropTypes.func.isRequired
  };

  render() {
    const {
      addSize,
      sectionStyle
    } = this.props;

    return (
      <header
        style={[
          sectionStyle,
          styles.base
        ]}
      >
        <span style={styles.text}>
          Export
        </span>

        <img
          src="assets/icons/add-size.svg"
          onClick={() => addSize()}
          style={styles.addSizeIcon}
        />
      </header>
    );
  }
}

const styles = {
  base: {
    paddingTop: '.25em',
    paddingBottom: '.25em',
  },

  text: {
    fontSize: '1.25em',
    fontWeight: 400,
    color: colors.black
  },

  addSizeIcon: {
    width: '1.25em',
    cursor: 'pointer',
  }
};