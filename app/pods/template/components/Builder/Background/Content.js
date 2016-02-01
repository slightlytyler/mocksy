'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import openFile from 'api/open-file';
import TemplatePreview from 'pods/template/components/Preview';
import wireframe from './assets/wireframe.svg';
import Prompt from 'components/Prompt'

@Radium
export default class TemplateBuilderBackgroundContent extends Component {
  static propTypes = {
    setTemplateBackground: PropTypes.func.isRequired,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  };

  render() {
    const {
      setTemplateBackground,
      canvasDimensions
    } = this.props;

    return (
      <TemplatePreview
        dimensions={{
          width: 255,
          height: 512,

          foreground: {
            width: 204,
            height: 372,
            left: 25,
            top: 70
          }
        }}
        canvasDimensions={{
          width: canvasDimensions.width,
          height: canvasDimensions.height
        }}
        backgroundPath={wireframe}
      >
        <div
          onClick={() => openFile(setTemplateBackground)}
          style={styles.container}
        >
          <Prompt
            text="Add a background"
            color="pink"
          />
        </div>
      </TemplatePreview>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  }
};