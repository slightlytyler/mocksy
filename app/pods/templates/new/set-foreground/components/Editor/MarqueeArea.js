'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Group } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';
import { mapValues } from 'lodash';

@Radium
export default class TemplateBuilderForegroundEditorMarqueeArea extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    transform: PropTypes.shape({
      type: PropTypes.string.isRequired,
      args: PropTypes.array
    }),
    startTransform: PropTypes.func.isRequired,
    endTransform: PropTypes.func.isRequired,
    updateTransformDiff: PropTypes.func.isRequired,
    mouseDownCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    zoomOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    realToScreenScale: PropTypes.number.isRequired
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  startMarquee = (e) => {
    const currentMouseCoords = {
      x: e.offsetX,
      y: e.offsetY
    };
    const {
      zoomOffset,
      realToScreenScale
    } = this.props;

    this.props.startTransform(e, 'marquee');
    this.props.updateTransformDiff(mapValues(currentMouseCoords, (coord, key) =>
      coord - (zoomOffset[key] * realToScreenScale)
    ));
  }

  endMarquee = () => {
    this.props.endTransform();
  }

  handleMouseMove = (e) => {
    if (this.props.transform.type === 'marquee') {
      const currentMouseCoords = {
        x: e.offsetX,
        y: e.offsetY
      };
      const { mouseDownCoords } = this.props;
      const xDiff = currentMouseCoords.x - mouseDownCoords.x;
      const yDiff = currentMouseCoords.y - mouseDownCoords.y;

      this.props.updateTransformDiff({
        width: xDiff,
        height: yDiff
      });
    }
  }

  render() {
    const {
      startMarquee,
      endMarquee
    } = this;
    const {
      dimensions
    } = this.props;

    return (
      <Rectangle
        width={dimensions.width}
        height={dimensions.height}
        fill="rgba(0, 0, 0, 0)"
        cursor="crosshair"
        onMouseDown={startMarquee}
        onMouseUp={endMarquee}
      />
    );
  }
}

const styles = {
};