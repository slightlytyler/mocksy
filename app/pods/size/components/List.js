'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { map, last, size as _size } from 'lodash';

import SizeItem from './Item';

@Radium
export default class SizeList extends Component {
  static propTypes = {
    sizes: PropTypes.object.isRequired,
    removeSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired
  };

  scrollBottom() {
    const el = this.refs.list;
    el.scrollTop = el.scrollHeight;
  }

  render() {
    const {
      sizes,
      removeSize,
      updateSize,
      sectionStyle
    } = this.props;
    const sizesLength = _size(sizes);
    const singleSize = sizesLength === 1;
    const lastSizeId = sizes[last(Object.keys(sizes))].id;

    return (
      <ul
        ref="list"
        className="list"
        style={[
          sectionStyle,
          styles.base,
        ]}
      >
        {map(sizes, (size, i) =>
          <SizeItem
            key={`size:${size.id}`}
            { ...size }
            isOnlySize={singleSize}
            isLastSize={size.id === lastSizeId}
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