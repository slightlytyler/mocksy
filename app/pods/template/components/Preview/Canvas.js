'use strict'

import React, { Component, PropTypes } from 'react';
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
    }
  };

  updateZoomScale = increment => {
    const offset = this.state.zoomOffset;
    const { dimensions } = this.props;

    this.setState({
      zoomScale: this.state.zoomScale + increment,
      zoomOffset: {
        x: offset.x - ((dimensions.width * increment) / 2),
        y: offset.y - ((dimensions.height * increment) / 2),
      }
    });
  }

  updateZoomOffset = diff => {
    const { x, y } = this.state.zoomOffset;

    this.setState({
      x: x + diff.x,
      y: y + diff.y
    });
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
    const { zoomScale } = this.state;
    const { overlay } = this.props;

    if (overlay) {
      return React.cloneElement(overlay, {
        realToScreenScale,
        zoomScale
      });
    }
    else {
      return undefined;
    }
  }

  renderChildren = () => {
    const realToScreenScale = this.realToScreenScale();
    const { zoomScale } = this.state;
    const { children } = this.props;
    const manyChildren = Array.isArray(children);

    if (children) {
      if (manyChildren) {
        return children.map(child => React.cloneElement(child, {
          realToScreenScale,
          zoomScale
        }));
      }
      else {
        return React.cloneElement(children, {
          realToScreenScale,
          zoomScale
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
      zoomOffset
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
            updateZoomScale={updateZoomScale}
            offset={zoomOffset}
            updateZoomOffset={updateZoomOffset}
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