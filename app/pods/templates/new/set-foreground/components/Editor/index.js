'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { mapValues } from 'lodash';
import { Group } from 'react-art';

import Foreground from './Foreground';

@Radium
export default class TemplatesNewSetForegroundEditor extends Component {
  static propTypes = {
    realToScreenScale: PropTypes.number,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

      foreground: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
      })
    }),
    updateTemplateForeground: PropTypes.func.isRequired
  }

  scaleToReal = val => {
    const { realToScreenScale } = this.props;

    return val / realToScreenScale;
  }

  updateForegroundDimensions = diff => {
    const { foreground } = this.props.dimensions;

    this.props.updateTemplateForeground(mapValues(diff, (val, key) =>
      (foreground[key] || 0) + this.scaleToReal(val)
    ));
  }

  render() {
    const { updateForegroundDimensions } = this;
    const { dimensions } = this.props;

    return (
      <Group>
        <Foreground
          dimensions={dimensions.foreground}
          updateDimensions={updateForegroundDimensions}
        />
      </Group>
    );
  }
}

const styles = {
};