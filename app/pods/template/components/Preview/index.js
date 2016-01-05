'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Foreground from './Foreground';

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

  render() {
    const {
      id,
      dimensions,
      canvasDimensions,
      screenshot,
      setCurrentScreenshot
    } = this.props;
    const { foreground } = dimensions;
    const backgroundAspect = dimensions.width / dimensions.height;
    const canvasAspect = canvasDimensions.width / canvasDimensions.height;
    const aspectDifference = backgroundAspect / canvasAspect;
    const isHigherAspect = backgroundAspect >= canvasAspect;
    const width = isHigherAspect ? '100%' : (canvasDimensions.width * aspectDifference);
    const height = isHigherAspect ? (canvasDimensions.height / aspectDifference) : '100%';

    return (
      <div
        className="template"
        style={[
          styles.base,
          { backgroundImage: `url('assets/base-templates/${id.toLowerCase()}/template.png')` },
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
};