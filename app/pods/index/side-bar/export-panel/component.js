'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class IndexSideBarExportPanel extends Component {
  static propTypes = {
  };

  render() {
    return (
      <section
        className="export-panel"
        style={styles.base}
      >
        <header
          style={[
            styles.section,
            styles.header.base
          ]}
        >
          <span style={styles.header.text}>
            Export
          </span>

          <img
            src="assets/icons/add-size.svg"
            style={styles.header.addSizeIcon}
          />
        </header>

        <ul
          style={[
            styles.section,
            styles.sizeList.base,
          ]}
        >
          <li style={styles.sizeList.item}>
            <div style={[
              styles.sizeList.item.input.container,
              styles.sizeList.item.size
            ]}>
              <input
                style={styles.sizeList.item.input.base}
              />

              <label style={styles.sizeList.item.input.label}>
                Size
              </label>
            </div>

            <div style={[
              styles.sizeList.item.input.container,
              styles.sizeList.item.suffix
            ]}>
              <input
                style={styles.sizeList.item.input.base}
              />

              <label style={styles.sizeList.item.input.label}>
                Suffix
              </label>
            </div>

            <div style={[
              styles.sizeList.item.input.container,
              styles.sizeList.item.format
            ]}>
              <input
                style={styles.sizeList.item.input.base}
              />

              <label style={styles.sizeList.item.input.label}>
                Format
              </label>
            </div>

            <div
              style={styles.sizeList.item.remove}
            >
              <img
                style={styles.sizeList.item.remove.icon}
                src="assets/icons/remove-size.svg"
              />
            </div>
          </li>
        </ul>

        <div
          style={[
            styles.section,
            styles.actions.base
          ]}
        >
          <button style={styles.actions.export}>
            Export Screenshot
          </button>
        </div>
      </section>
    );
  }
}

const styles = {
  base: {
    dispay: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EDF3F5',
  },

  section: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '.75em',
    paddingRight: '.75em',
    borderBottom: '1px solid #CFD8DC',
  },

  header: {
    base: {
      paddingTop: '.25em',
      paddingBottom: '.25em',
    },

    text: {
      fontSize: '1.25em',
      fontWeight: 400,
      color: '#263238'
    },

    addSizeIcon: {
      width: '1.25em'
    }
  },

  sizeList: {
    base: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '.75em',
      paddingBottom: '.75em',
    },

    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      input: {
        base: {
          width: '100%',
          marginBottom: '.3em',
          border: '1px solid #CFD8DC'
        },

        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '2em'
        },

        label: {
          fontSize: '.8em',
          color: '#607D8B',
          fontWeight: 200
        }
      },

      size: {
        flex: 5,
      },

      suffix: {
        flex: 3,
      },

      format: {
        flex: 3,
      },

      remove: {
        alignSelf: 'flex-start',
        marginTop: '.25em',

        icon: {
          width: '1.25em'
        }
      }
    }
  },

  actions: {
    base: {
      display: 'flex',
      paddingTop: '.5em',
      paddingBottom: '.5em',
    },

    export: {
      flex: 1,
      color: '#607D8B',
      border: '1px solid #607D8B',
      borderRadius: '4px',
      backgroundColor: 'transparent'
    }
  }
};