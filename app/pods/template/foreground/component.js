'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import EmptyState from 'pods/template/foreground/empty/component';

@Radium
export default class TemplateForeground extends Component {
  static propTypes = {
    screenshot: PropTypes.string,
    setCurrentScreenshot: PropTypes.func.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    containerDimensions: PropTypes.object.isRequired
  };

  handleFile(e) {
    this.props.setCurrentScreenshot(e.target.files[0].path);
    this.refs.input.value = "";
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
        onClick={() => this.refs.input.click()}
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
            fileSelected={(file) => this.fileSelected(file)}
          />
        }

        <input
          ref="input"
          type="file"
          onChange={(e) => this.handleFile(e)}
          style={styles.input}
        />
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
    backgroundColor: '#38B8E2',
    cursor: 'pointer'
  },

  image: {
    width: '100%',
    height: '100%'
  },

  input: {
    display: 'none'
  },
};