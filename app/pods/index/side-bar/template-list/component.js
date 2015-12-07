'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class IndexSideBarTemplateList extends Component {
  static propTypes = {
  };

  render() {
    return (
      <ul
        className="template-list"
        style={styles.list}
      >
        <li style={styles.item.base}>
          <div style={styles.item.preview.container}>
            <img
              src="assets/base-templates/iphone-6/thumbnail.png"
              style={styles.item.preview.image}
            />
          </div>

          <div style={styles.item.name.container}>
            <span style={styles.item.name.text}>
              iPhone 6
            </span>
          </div>
        </li>
      </ul>
    );
  }
}

const styles = {
  list: {

  },

  item: {
    base: {
      display: 'flex',
      borderBottom: '1px solid #EDF3F5',
      cursor: 'pointer',
    },

    preview: {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: '1em'
      },

      image: {
        maxWidth: '100%',
        maxHeight: '7.5em'
      }
    },

    name: {
      container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2
      },

      text: {
        fontSize: '2em',
        fontWeight: 100,
        color: '#607D8B'
      }
    }
  },
};