'use strict'

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Radium from 'radium';
import { Surface, Group } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

import ZoomGroup from './ZoomGroup';
import Background from './Background';
import Foreground from './Foreground';

@Radium
export default class TemplatePreviewCanvas extends Component {
  static propTypes = {
    backgroundPath: PropTypes.string.isRequired,
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
    containerDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    cursor: PropTypes.string,
    handleClick: PropTypes.func,
    overlay: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }

  state = {
    zoomScale: 1,
    zoomOffset: {
      x: 0,
      y: 0
    },
    surfaceDimensions: {}
  };

  componentDidMount() {
    this.setState({
      surfaceDimensions: findDOMNode(this.refs.surface).getBoundingClientRect()
    });
  }

  updateZoomScale = increment => {
    const scale = this.state.zoomScale;
    const offset = this.state.zoomOffset;
    const { dimensions } = this.props;
    const newScale = Number((scale + increment).toFixed(2)) > 4 ? 4 : Number((scale + increment).toFixed(2));

    this.setState({
      zoomScale: newScale,
      zoomOffset: {
        x: offset.x - ((dimensions.width * increment) / 2),
        y: offset.y - ((dimensions.height * increment) / 2),
      }
    });
  }

  updateZoomOffset = diff => {
    const { zoomScale, zoomOffset } = this.state;
    const { dimensions } = this.props;

    const zoomDifference = {
      x: (dimensions.width * zoomScale) - dimensions.width,
      y: (dimensions.height * zoomScale) - dimensions.height
    };

    const xDiff = zoomOffset.x + diff.x;
    const yDiff = zoomOffset.y + diff.y;
    const xMultiplier = xDiff / Math.abs(xDiff);
    const yMultiplier = yDiff / Math.abs(yDiff);

    const maxOffsetRatio = zoomScale - 1;
    const maxWidth = dimensions.width * maxOffsetRatio;
    const maxHeight = dimensions.height * maxOffsetRatio;

    const offsetXLimit = maxWidth - (xMultiplier * (zoomDifference.x / 2));
    const offsetYLimit = maxHeight - (yMultiplier * (zoomDifference.y / 2));

    if (zoomScale < 1) {
      this.setState({
        zoomOffset: {
          x: (dimensions.width / 2) * (1 - zoomScale),
          y: (dimensions.height / 2) * (1 - zoomScale)
        }
      });
    }
    else {
      this.setState({
        zoomOffset: {
          x: Math.abs(xDiff) > offsetXLimit
            ? xMultiplier * offsetXLimit
            : xDiff,
          y: Math.abs(yDiff) > offsetYLimit
            ? yMultiplier * offsetYLimit
            : yDiff
        }
      });
    }
  }

  realToScreenScale = () => {
    const {
      containerDimensions,
      dimensions
    } = this.props;

    return containerDimensions.width / dimensions.width;
  }

  renderOverlay = () => {
    const realToScreenScale = this.realToScreenScale();
    const {
      zoomScale,
      zoomOffset
    } = this.state;
    const { overlay } = this.props;

    if (overlay) {
      return React.cloneElement(overlay, {
        realToScreenScale,
        zoomScale,
        zoomOffset
      });
    }
    else {
      return undefined;
    }
  }

  renderChildren = () => {
    const realToScreenScale = this.realToScreenScale();
    const {
      zoomScale,
      zoomOffset
    } = this.state;
    const { children } = this.props;
    const manyChildren = Array.isArray(children);

    if (children) {
      if (manyChildren) {
        return children.map(child => React.cloneElement(child, {
          realToScreenScale,
          zoomScale,
          zoomOffset
        }));
      }
      else {
        return React.cloneElement(children, {
          realToScreenScale,
          zoomScale,
          zoomOffset
        });
      }
    }
    else {
      return undefined;
    }
  }

  render() {
    const realToScreenScale = this.realToScreenScale();
    const {
      updateZoomScale,
      updateZoomOffset
    } = this;
    const {
      zoomScale,
      zoomOffset,
      surfaceDimensions
    } = this.state;
    const {
      backgroundPath,
      dimensions,
      containerDimensions,
      cursor,
      handleClick,
      overlay,
      children
    } = this.props;
    const onScreenDimensions = containerDimensions;

    return (
      <Surface
        ref="surface"
        width={onScreenDimensions.width}
        height={onScreenDimensions.height}
      >
        <Group
          x={0}
          y={0}
          scaleX={realToScreenScale}
          scaleY={realToScreenScale}
          cursor={cursor || 'default'}
          onClick={handleClick}
        >
          <ZoomGroup
            scale={zoomScale}
            offset={zoomOffset}
            updateZoomScale={updateZoomScale}
            updateZoomOffset={updateZoomOffset}
            surfaceDimensions={surfaceDimensions}
          >
            <Background
              imagePath={backgroundPath}
              dimensions={dimensions}
            />
            {this.renderOverlay()}
            <Foreground dimensions={dimensions.foreground}>
              {this.renderChildren()}
            </Foreground>
          </ZoomGroup>
        </Group>
      </Surface>
    );
  }
}

const styles = {
};