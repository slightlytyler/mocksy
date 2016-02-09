'use strict'

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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
          className="item"
          style={[
            styles.item.base,
            currentTemplateSetId === 'default' && styles.item.active
          ]}
        >
          <Link
            to="/templates/show/default"
            style={styles.item.link}
            activeStyle={styles.item.link.active}
          >
            Default Templates
          </Link>
        </li>
        <li
          className="item"
          style={[
            styles.item.base,
            currentTemplateSetId === 'user' && styles.item.active
          ]}
        >
          <Link
            to="/templates/show/user"
            style={styles.item.link}
            activeStyle={styles.item.link.active}
          >
            User Templates
          </Link>
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
      flex: 1,
      color: 'white',
      borderBottom: '2px solid white',
    },

    link: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em 0',
      cursor: 'pointer',

      active: {
        backgroundColor: 'white',
        color: colors.pink,
        cursor: 'default'
      }
    }
  }
};