'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { Surface, Group } from 'react-art';
import Rectangle from 'react-art/shapes/rectangle';

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

  realToScreenScale = () => {
    const {
      containerDimensions,
      dimensions
    } = this.props;

    return containerDimensions.width / dimensions.width;
  }

  renderOverlay = () => {
    const realToScreenScale = this.realToScreenScale();
    const { overlay } = this.props;

    if (overlay) {
      return React.cloneElement(overlay, {
        realToScreenScale
      });
    }
    else {
      return undefined;
    }
  }

  renderChildren = () => {
    const realToScreenScale = this.realToScreenScale();
    const { children } = this.props;
    const manyChildren = Array.isArray(children);

    if (children) {
      if (manyChildren) {
        return children.map(child => React.cloneElement(child, {
          realToScreenScale
        }));
      }
      else {
        return React.cloneElement(children, {
          realToScreenScale
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
          <Background
            imagePath={backgroundPath}
            dimensions={dimensions}
          />
          {this.renderOverlay()}
          <Foreground dimensions={dimensions.foreground}>
            {this.renderChildren()}
          </Foreground>
        </Group>
      </Surface>
    );
  }
}

const styles = {
};