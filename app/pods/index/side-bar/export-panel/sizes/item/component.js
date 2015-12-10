'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import Dropdown from 'components/Dropdown';

@Radium
export default class IndexSideBarExportPanelSizesItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    multiplier: PropTypes.string,
    suffix: PropTypes.string,
    format: PropTypes.string.isRequired,
    isOnlySize: PropTypes.bool.isRequired,
    isLastSize: PropTypes.bool.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  multiplierOptions = [
    { value: '1x', label: '1x' },
    { value: '2x', label: '2x' },
    { value: '3x', label: '3x' },
  ];

  formatOptions = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'pdf', label: 'PDF' },
  ];

  render() {
    const {
      id,
      multiplier,
      suffix,
      format,
      isOnlySize,
      isLastSize,
      removeSize,
      updateSize
    } = this.props;
    const {
      multiplierOptions,
      formatOptions
    } = this;

    return (
      <li
        style={[
          styles.base,
          isLastSize && styles.last
        ]}
      >
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
              multiplier: val
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
            isOnlySize && styles.remove.disabled
          ]}
        >
          <img
            src="assets/icons/remove-size.svg"
            onClick={() => !isOnlySize && removeSize(id)}
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
    marginBottom: '.75em'
  },

  last: {
    marginBottom: 0,
  },

  input: {
    base: {
      width: '100%',
      marginBottom: '.3em',
      fontSize: '.9em',
      color: colors.black,
      border: `1px solid ${colors.pink}`,
    },

    paddingOverride: {
      padding: '1px 1px 1px .25em',
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: '1.5em'
    },

    label: {
      fontSize: '.8em',
      color: colors.black,
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
      marginTop: '.1em'
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