'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { merge, mapValues } from 'lodash';

import colors from 'constants/colors';
import AspectContainer from 'components/AspectContainer';
import Surface from 'pods/template/components/Builder/Editor/Surface';

@Radium
export default class TemplateBuilderEditor extends Component {
  static propTypes = {
    backgroundPath: PropTypes.string.isRequired,
    dimensions: PropTypes.object.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    canvasDimensions: PropTypes.object.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired
  };

  state = {
    mode: 'transform',
    currentTransform: false,
    foregroundDimensions: {
      width: this.props.foregroundDimensions.width,
      height: this.props.foregroundDimensions.height,
      x: this.props.foregroundDimensions.left,
      y: this.props.foregroundDimensions.top
    },
    zoom: {
      scale: 1,
      offset: {
        x: 0,
        y: 0
      }
    }
  };

  updateState(props) {
    this.setState(
      merge({}, this.state, props)
    );
  }

  updateTemplateForeground(props) {
    this.props.updateTemplateForeground(
      mapValues(props, prop => Math.round(prop))
    );
  }

  render() {
    const {
      backgroundPath,
      dimensions,
      foregroundDimensions,
      canvasDimensions
    } = this.props;

    return (
      <AspectContainer
        dimensions={dimensions}
        canvasDimensions={canvasDimensions}
        style={styles.container}
      >
        <div style={styles.border} />
        <Surface
          editorState={this.state}
          updateEditorState={this.updateState.bind(this)}
          backgroundPath={backgroundPath}
          dimensions={foregroundDimensions}
          backgroundDimensions={dimensions}
          updateTemplateForeground={this.updateTemplateForeground.bind(this)}
        />
      </AspectContainer>
    )
  }
}

const styles = {
  container: {
  },

  border: {
    boxSizing: 'content-box',
    position: 'absolute',
    left: 'calc(0% - 2px)',
    top: 'calc(0% - 2px)',
    width: '100%',
    height: '100%',
    border: `2px solid ${colors.gray}`,
  },

  surface: {
    position: 'absolute',
    left: 0,
    top: 0
  }
};