'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import acceptedFormats from 'constants/accepted-image-formats';
import colors from 'constants/colors';
import Row from 'components/Form/Row';
import Field from 'components/Form/Field';
import Input from 'components/Form/Input';
import Dropdown from 'components/Form/Dropdown';

@Radium
export default class SizeItem extends Component {
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

  formatOptions = acceptedFormats;

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
      <Row isLastRow={isLastSize}>
        <Field
          ref="sizeDropdownContainer"
          label="Size"
          flexRatio={5}
        >
          <Dropdown
            ref="sizeDropdown"
            key={`size:${id}-multiplier`}
            name="multiplier"
            value={multiplier}
            options={multiplierOptions}
            editable={true}
            onChange={(val) => updateSize(id, {
              multiplier: val
            })}
          />
        </Field>

        <Field
          ref="suffixInputContainer"
          label="Suffix"
          flexRatio={3}
        >
          <Input
            ref="suffixInput"
            value={suffix}
            placeholder="None"
            onChange={(e) => updateSize(id, {
              suffix: e.target.value
            })}
          />
        </Field>

        <Field
          ref="sizeDropdownContainer"
          label="Format"
          flexRatio={3}
        >
          <Dropdown
            ref="formatDropdown"
            key={`size:${id}-format`}
            name="format"
            value={format}
            options={formatOptions}
            onChange={(val) => updateSize(id, {
              format: val
            })}
          />
        </Field>

        <div
          ref="removeButton"
          onClick={() => !isOnlySize && removeSize(id)}
          className="remove button"
          style={[
            styles.remove.base,
            isOnlySize && styles.remove.disabled
          ]}
        >
          <img
            src="assets/icons/remove-size.svg"
            style={styles.remove.icon}
          />
        </div>
      </Row>
    );
  }
}

const styles = {
  remove: {
    base: {
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