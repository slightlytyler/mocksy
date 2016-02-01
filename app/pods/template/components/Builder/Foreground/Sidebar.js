'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Field from 'components/form/field';

@Radium
export default class TemplateBuilderForegroundSidebar extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div style={styles.base}>
        <ul
          ref="options"
          style={styles.options.base}
        >
          <li
            ref="mode"
            style={styles.options.item.base}
          >
            <label style={styles.options.item.label}>Mode</label>
            <button style={styles.options.item.button}>Marquee</button>
            <button style={styles.options.item.button}>Free</button>
          </li>

          <li
            ref="position"
            style={styles.options.item.base}
          >
            <label style={styles.options.item.label}>Position</label>
            <Field
              value={undefined}
              placeholder="0"
              label="X"
            />
            <Field
              value={undefined}
              placeholder="0"
              label="Y"
            />
          </li>

          <li
            ref="size"
            style={styles.options.item.base}
          >
            <label style={styles.options.item.label}>Size</label>
            <Field
              value={undefined}
              placeholder="0"
              label="Width"
            />
           <Field
              value={undefined}
              placeholder="0"
              label="Height"
            />
          </li>
        </ul>

        <button>Next Step</button>
      </div>
    );
  }
}

const styles = {
  base: {
    marginTop: '2em'
  },

  options: {
    base: {
      display: 'flex',
      flexDirection: 'column'
    },

    item: {
      base: {
        display: 'flex'
      },

      label: {
        flex: 1,
      },

      button: {
        flex: 1
      }
    }
  }
};