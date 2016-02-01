'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TemplatePreviewForeground extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    backgroundDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  render() {
    const {
      dimensions,
      backgroundDimensions,
      children
    } = this.props;

    const toPercent = (num) => `${num * 100}%`;

    const width = toPercent(dimensions.width / backgroundDimensions.width);
    const height = toPercent(dimensions.height / backgroundDimensions.height);
    const left = toPercent(dimensions.left / backgroundDimensions.width);
    const top = toPercent(dimensions.top / backgroundDimensions.height);

    return (
      <div
        className="foreground"
        style={[
          styles.base,
          {
            width,
            height,
            left,
            top
          }
        ]}
      >
        {children}
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'absolute',
    overflow: 'hidden'
  }
};