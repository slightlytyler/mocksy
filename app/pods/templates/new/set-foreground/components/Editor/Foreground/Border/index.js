'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Group } from 'react-art';

import colors from 'constants/colors';
import Edge from './Edge';

@Radium
export default class TemplatesNewSetForegroundEditorForegroundBorder extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired
  }

  edgeWidth = 10;

  edges = [
    'left',
    'right',
    'top',
    'bottom'
  ];

  render() {
    const {
      edges,
      edgeWidth
    } = this;
    const {
      dimensions,
      handleMouseDown,
      handleMouseUp
    } = this.props;

    return (
      <Group>
        {
          edges.map(edge =>
            <Edge
              key={edge}
              edge={edge}
              edgeWidth={edgeWidth}
              dimensions={dimensions}
              handleMouseDown={(e) => handleMouseDown(e, [edge])}
              handleMouseUp={handleMouseUp}
            />
          )
        }
      </Group>
    );
  }
}

const styles = {
};