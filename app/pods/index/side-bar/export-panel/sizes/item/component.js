'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class IndexSideBarExportPanelSizesItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    multiplier: PropTypes.number,
    suffix: PropTypes.string,
    format: PropTypes.string.isRequired,
    isLastSize: PropTypes.bool.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  render() {
    const {
      id,
      multiplier,
      suffix,
      format,
      isLastSize,
      removeSize,
      updateSize
    } = this.props;

    return (
      <li style={styles.base}>
        <div style={[
          styles.input.container,
          styles.size
        ]}>
          <input
            value={multiplier}
            onChange={(e) => updateSize(id, {
              multiplier: e.target.value ? Number(e.target.value) : undefined
            })}
            style={styles.input.base}
          />

          <label style={styles.input.label}>
            Size
          </label>
        </div>

        <div style={[
          styles.input.container,
          styles.suffix
        ]}>
          <input
            value={suffix}
            onChange={(e) => updateSize(id, {
              suffix: e.target.value
            })}
            style={styles.input.base}
          />

          <label style={styles.input.label}>
            Suffix
          </label>
        </div>

        <div style={[
          styles.input.container,
          styles.format
        ]}>
          <input
            value={format}
            onChange={(e) => updateSize(id, {
              format: e.target.value
            })}
            style={styles.input.base}
          />

          <label style={styles.input.label}>
            Format
          </label>
        </div>

        <div
          style={[
            styles.remove.base,
            isLastSize && styles.remove.disabled
          ]}
        >
          <img
            src="assets/icons/remove-size.svg"
            onClick={() => !isLastSize && removeSize(id)}
            style={styles.remove.icon}
          />
        </div>
      </li>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

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
    base: {
      alignSelf: 'flex-start',
    },

    disabled: {
      opacity: '.45',
      pointerEvents: 'none'
    },

    icon: {
      width: '1.25em',
      cursor: 'pointer',
    }
  }
};