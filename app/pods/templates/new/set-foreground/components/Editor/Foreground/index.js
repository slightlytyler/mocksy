'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {
  Group,
  ClippingRectangle,
  LinearGradient
} from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import immutable from 'object-path-immutable';
import { mapValues } from 'lodash';

import colors from 'constants/colors';
import Border from './Border';

@Radium
export default class TemplatesNewSetForegroundEditorForeground extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    transform: PropTypes.shape({
      type: PropTypes.string.isRequired,
      args: PropTypes.array
    }),
    transformDiff: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    startTransform: PropTypes.func.isRequired,
    endTransform: PropTypes.func.isRequired,
    updateTransformDiff: PropTypes.func.isRequired,
    mouseDownCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  }


  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  startDrag = e => {
    this.props.startTransform(e, 'drag');
  }

  startScale = (e, args) => {
    this.props.startTransform(e, 'scale', args);
  }

  endTransform = e => {
    this.props.endTransform();
  }

  handleMouseMove = e => {
    const { transform } = this.props;

    switch (transform.type) {
      case 'drag':
        return this.handleDrag(e);

      case 'scale':
        return this.handleScale(e);
    }
  }

  handleDrag = e => {
    const currentMouseCoords = {
      x: e.offsetX,
      y: e.offsetY
    };
    const { mouseDownCoords } = this.props;
    const xDiff = currentMouseCoords.x - mouseDownCoords.x;
    const yDiff = currentMouseCoords.y - mouseDownCoords.y;

    this.props.updateTransformDiff({
      x: xDiff,
      y: yDiff
    });
  }

  handleScale = e => {
    const currentMouseCoords = {
      x: e.offsetX,
      y: e.offsetY
    };
    const {
      dimensions,
      transform,
      mouseDownCoords
    } = this.props;
    const edges = transform.args;
    const xDiff = currentMouseCoords.x - mouseDownCoords.x;
    const yDiff = currentMouseCoords.y - mouseDownCoords.y;

    if (edges.indexOf('left') !== -1) {
      this.props.updateTransformDiff({
        x: xDiff,
        width: -xDiff
      });
    }

    if (edges.indexOf('right') !== -1) {
      this.props.updateTransformDiff({
        width: xDiff
      });
    }

    if (edges.indexOf('top') !== -1) {
      this.props.updateTransformDiff({
        y: yDiff,
        height: -yDiff
      });
    }

    if (edges.indexOf('bottom') !== -1) {
      this.props.updateTransformDiff({
        height: yDiff
      });
    }
  }

  render() {
    const {
      startDrag,
      startScale,
      finishTransform,
      endTransform
    } = this;
    const {
      dimensions,
      transformDiff
    } = this.props;
    const adjustedDimensions = mapValues(dimensions, (val, key) =>
      val + transformDiff[key]
    );

    return (
      <Group
        x={adjustedDimensions.x}
        y={adjustedDimensions.y}
      >
        {
          (adjustedDimensions.x && adjustedDimensions.y && adjustedDimensions.width && adjustedDimensions.height)
          ? (
            <ClippingRectangle
              x={0}
              y={0}
              width={adjustedDimensions.width}
              height={adjustedDimensions.height}
              strokeCap="square"
            >
              <Rectangle
                ref="foreground"
                x={0}
                y={0}
                width={adjustedDimensions.width}
                height={adjustedDimensions.height}
                fill={new LinearGradient([colors.pink, colors.orange])}
                cursor="move"
                onMouseDown={startDrag}
                onMouseUp={endTransform}
              />
              <Border
                dimensions={adjustedDimensions}
                handleMouseDown={startScale}
                handleMouseUp={endTransform}
              />
            </ClippingRectangle>
          )
          : (
            <Group />
          )
        }
      </Group>
    );
  }
}

const styles = {
};