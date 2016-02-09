'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { merge, mapValues } from 'lodash';

import colors from 'constants/colors';
import AspectContainer from 'components/AspectContainer';
import Canvas from './Canvas';

@Radium
export default class TemplateBuilderForegroundEditor extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    foregroundDimensions: PropTypes.object.isRequired,
    backgroundDimensions: PropTypes.object.isRequired,
    canvasDimensions: PropTypes.object.isRequired,
    backgroundImagePath: PropTypes.string.isRequired,
    updateTemplateForeground: PropTypes.func.isRequired,
    updateTemplateEditor: PropTypes.func.isRequired
  }

  updateTemplateForeground = props => {
    this.props.updateTemplateForeground(
      mapValues(props, prop => Math.round(prop))
    );
  }

  render() {
    const { updateTemplateForeground } = this;
    const {
      editorState,
      foregroundDimensions,
      backgroundDimensions,
      canvasDimensions,
      backgroundImagePath,
      updateTemplateEditor
    } = this.props;

    return (
      <AspectContainer
        dimensions={backgroundDimensions}
        canvasDimensions={canvasDimensions}
      >
        <div style={styles.border} />
        <Canvas
          editorState={editorState}
          updateEditorState={updateTemplateEditor}
          foregroundDimensions={foregroundDimensions}
          backgroundDimensions={backgroundDimensions}
          backgroundPath={backgroundImagePath}
          updateTemplateForeground={updateTemplateForeground}
        />
      </AspectContainer>
    )
  }
}

const styles = {
  border: {
    boxSizing: 'content-box',
    position: 'absolute',
    left: 'calc(0% - 2px)',
    top: 'calc(0% - 2px)',
    width: '100%',
    height: '100%',
    border: `2px solid ${colors.gray}`,
  }
};