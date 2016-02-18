'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { mapValues, capitalize, values } from 'lodash';
import { Group } from 'react-art';

import MarqueeArea from './MarqueeArea';
import Foreground from './Foreground';

@Radium
export default class TemplatesNewSetForegroundEditor extends Component {
  static propTypes = {
    realToScreenScale: PropTypes.number,
    zoomScale: PropTypes.number,
    zoomOffset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
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
    incrementTemplateForeground: PropTypes.func.isRequired,
    resetTemplateForeground: PropTypes.func.isRequired
  }

  state = {
    transform: {
      type: 'none'
    },
    transformXDiff: 0,
    transformYDiff: 0,
    transformWidthDiff: 0,
    transformHeightDiff: 0,
    mouseDownCoords: {}
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleMoveWithArrow, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleMoveWithArrow);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.dimensions !== this.props.dimensions) {
      this.setState({
        transformXDiff: 0,
        transformYDiff: 0,
        transformWidthDiff: 0,
        transformHeightDiff: 0
      });
    }
  }

  scaleToReal = val => val / this.props.realToScreenScale / this.props.zoomScale;

  startTransform = (event, type, args) => {
    const mouseDownCoords = {
      x: event.offsetX,
      y: event.offsetY
    };

    if (type === 'marquee') {
      this.props.resetTemplateForeground();
    }

    this.setState({
      transform: {
        type,
        args
      },
      mouseDownCoords
    });
  }

  endTransform = () => {
    const {
      transformXDiff,
      transformYDiff,
      transformWidthDiff,
      transformHeightDiff
    } = this.state;

    this.setState({
      transform: {
        type: 'none'
      }
    });

    if ((transformXDiff !== 0) || (transformYDiff !== 0) || (transformWidthDiff !== 0) || (transformHeightDiff !== 0)) {
      this.props.incrementTemplateForeground({
        x: transformXDiff,
        y: transformYDiff,
        width: transformWidthDiff,
        height: transformHeightDiff
      });
    }
  }

  updateTransformDiff = diff => {
    Object.keys(diff).forEach(key =>
      this.setState({
        [`transform${capitalize(key)}Diff`]: this.scaleToReal(diff[key])
      })
    );
  }

  handleMoveWithArrow = e => {
    if (document.activeElement === document.body) {
      const {
        keyCode,
        shiftKey
      } = e;
      const step = shiftKey ? 10 : 1;
      const arrows = {
        left: 37,
        right: 39,
        top: 38,
        bottom: 40
      };

      if (values(arrows).indexOf(keyCode) !== -1) {
        e.stopPropagation();

        const {
          transformXDiff,
          transformYDiff
        } = this.state;
        const update = (diff, dimension) => {
          this.props.incrementTemplateForeground({
            [dimension]: diff
          });
        };

        switch (keyCode) {
          case arrows.left:
            update(transformXDiff - step, 'x');
            break;

          case arrows.right:
            update(transformXDiff + step, 'x');
            break;

          case arrows.top:
            update(transformYDiff - step, 'y');
            break;

          case arrows.bottom:
            update(transformYDiff + step, 'y');
            break;
        }

        return false;
      }

      return true;
    }
  }

  render() {
    const {
      startTransform,
      endTransform,
      updateTransformDiff
    } = this;
    const {
      transform,
      transformXDiff,
      transformYDiff,
      transformWidthDiff,
      transformHeightDiff,
      mouseDownCoords
    } = this.state;
    const {
      dimensions,
      zoomScale,
      zoomOffset,
      realToScreenScale
    } = this.props;

    return (
      <Group>
        <MarqueeArea
          dimensions={dimensions}
          transform={transform}
          startTransform={startTransform}
          endTransform={endTransform}
          updateTransformDiff={updateTransformDiff}
          mouseDownCoords={mouseDownCoords}
          zoomScale={zoomScale}
          zoomOffset={zoomOffset}
          realToScreenScale={realToScreenScale}
        />
        <Foreground
          dimensions={dimensions.foreground}
          transform={transform}
          transformDiff={{
            x: transformXDiff,
            y: transformYDiff,
            width: transformWidthDiff,
            height: transformHeightDiff
          }}
          startTransform={startTransform}
          endTransform={endTransform}
          updateTransformDiff={updateTransformDiff}
          mouseDownCoords={mouseDownCoords}
        />
      </Group>
    );
  }
}

const styles = {
};