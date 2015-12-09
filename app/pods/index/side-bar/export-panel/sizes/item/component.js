'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Dropdown from 'components/Dropdown';

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

  multiplierOptions = [
    { value: '1', label: '1x' },
    { value: '2', label: '2x' },
    { value: '3', label: '3x' },
  ];

  formatOptions = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'tiff', label: 'TIFF' },
  ];

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
    const {
      multiplierOptions,
      formatOptions
    } = this;

    return (
      <li style={styles.base}>
        <div style={[
          styles.input.container,
          styles.size
        ]}>
          <Dropdown
            name={`size:${id}-multiplier`}
            value={multiplier}
            options={multiplierOptions}
            editable={true}
            onChange={(val) => updateSize(id, {
              multiplier: val ? Number(val) : undefined
            })}
            baseStyle={styles.input.base}
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
            style={[
              styles.input.base,
              styles.input.paddingOverride
            ]}
          />

          <label style={styles.input.label}>
            Suffix
          </label>
        </div>

        <div style={[
          styles.input.container,
          styles.format
        ]}>
          <Dropdown
            name={`size:${id}-format`}
            value={format}
            options={formatOptions}
            onChange={(val) => updateSize(id, {
              format: val
            })}
            baseStyle={styles.input.base}
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
      fontSize: '.8em',
      border: '1px solid #CFD8DC',
    },

    paddingOverride: {
      padding: '1px 1px 1px .25em',
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