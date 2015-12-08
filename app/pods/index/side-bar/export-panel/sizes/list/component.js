'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { map } from 'lodash';

import SizeItem from '../item/component';

@Radium
export default class IndexSideBarExportPanelSizesList extends Component {
  static propTypes = {
    sizes: PropTypes.object.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  render() {
    const {
      sizes,
      removeSize,
      updateSize,
      sectionStyle
    } = this.props;

    return (
      <ul
        style={[
          sectionStyle,
          styles.base,
        ]}
      >
        {map(sizes, size =>
          <SizeItem
            key={`size:${size.id}`}
            { ...size }
            removeSize={removeSize}
            updateSize={updateSize}
          />
        )}
      </ul>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '.75em',
    paddingBottom: '.75em',
  }
};