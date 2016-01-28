'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Foreground from './Foreground';
import { computeTemplateImages } from 'pods/templates/helpers';

@Radium
export default class TemplatePreview extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired
  };

  // To prevent sub pixel aliasing we attempt to
  // resize, while maintaining aspect ratio, and
  // preferring whole number dimensions

  getPixelValues(targetWidth, targetAspect) {
    const maxWidth = Math.floor(targetWidth);
    const maxHeight = Math.round(maxWidth / targetAspect);
    let width = maxWidth,
        height = maxHeight,
        i = maxWidth;

    while (i >= (maxWidth - 20)) {
      if (Number.isInteger(i / targetAspect)) {
        width = i;
        height = i / targetAspect;
        break;
      } else {
        i--;
      }
    }

    return {
      width,
      height
    };
  }

  render() {
    const {
      id,
      set,
      format,
      dimensions,
      canvasDimensions,
      screenshot,
      setCurrentScreenshot
    } = this.props;
    const { foreground } = dimensions;
    const backgroundAspect = dimensions.width / dimensions.height;
    const canvasWidth = Math.floor(canvasDimensions.width);
    const canvasHeight = Math.floor(canvasDimensions.height);
    const canvasAspect = canvasWidth / canvasHeight;
    const aspectDifference = backgroundAspect / canvasAspect;
    const isHigherAspect = backgroundAspect >= canvasAspect;
    const targetWidth = isHigherAspect ? canvasWidth : (canvasWidth * aspectDifference);

    const {
      width,
      height,
    } = this.getPixelValues(targetWidth, backgroundAspect);

    const backgroundImage =
        set !== 'user' ?
        `assets/base-templates/${id.toLowerCase()}/template.png` :
        computeTemplateImages(id, format).background;

    return (
      <div
        ref="background"
        className="template"
        style={[
          styles.base,
          { backgroundImage: `url("${backgroundImage}")` },
          {
            width,
            height
          }
        ]}
      >
        <Foreground
          ref="foreground"
          screenshot={screenshot}
          setCurrentScreenshot={setCurrentScreenshot}
          foregroundDimensions={foreground}
          containerDimensions={{
            width: dimensions.width,
            height: dimensions.height
          }}
        />
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
};