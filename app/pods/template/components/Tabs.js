'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';

@Radium
export default class TemplateList extends Component {
  static propTypes = {
  };

  render() {
    const {
      currentTemplateSetId,
      setCurrentTemplateSet
    } = this.props;

    return (
      <ul
        className="template-tabs"
        style={styles.base}
      >
        <li
          onClick={() => setCurrentTemplateSet('default')}
          className="item"
          style={[
            styles.item.base,
            currentTemplateSetId === 'default' && styles.item.active
          ]}
        >
          Default Templates
        </li>
        <li
          onClick={() => setCurrentTemplateSet('custom')}
          className="item"
          style={[
            styles.item.base,
            currentTemplateSetId === 'custom' && styles.item.active
          ]}
        >
          Custom Templates
        </li>
      </ul>
    );
  }
}

const styles = {
  base: {
    display: 'flex'
  },

  item: {
    base: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em 0',
      color: 'white',
      borderBottom: '2px solid white',
      cursor: 'pointer',
    },

    active: {
      backgroundColor: 'white',
      color: colors.pink,
      cursor: 'default'
    }
  }
};