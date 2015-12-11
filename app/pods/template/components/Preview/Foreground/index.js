'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import { dialog } from 'remote';

import colors from 'constants/colors';
import EmptyState from './Empty';

@Radium
export default class TemplatePreviewForeground extends Component {
  static propTypes = {
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object.isRequired
  };

  openFile() {
    const { setCurrentScreenshot } = this.props;

    dialog.showOpenDialog({ multiSelections: false }, fileNames =>
      fileNames && setCurrentScreenshot(fileNames[0])
    )
  }

  render() {
    const { screenshot } = this.props;
    const { screenshotURL } = this.state;
    const {
      foregroundDimensions,
      containerDimensions
    } = this.props;

    const toPercent = (num) => `${num * 100}%`;

    const width = toPercent(foregroundDimensions.width / containerDimensions.width);
    const height = toPercent(foregroundDimensions.height / containerDimensions.height);
    const left = toPercent(foregroundDimensions.left / containerDimensions.width);
    const top = toPercent(foregroundDimensions.top / containerDimensions.height);

    return (
      <div
        className="foreground"
        onClick={() => this.openFile()}
        style={[
          styles.base,
          {
            width: width,
            height: height,
            left: left,
            top: top
          }
        ]}
      >
        {screenshot ?
          <img
            src={screenshot}
            style={styles.image}
          /> :
          <EmptyState
            screenshotWidth={foregroundDimensions.width}
            screenshotHeight={foregroundDimensions.height}
          />
        }
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    background: colors.featureGradient,
    cursor: 'pointer',
    overflow: 'hidden',
  },

  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    minHeight: '100%'
  }
};