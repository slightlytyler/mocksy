'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Editor from 'pods/template/components/Builder/Foreground/Editor';

@Radium
export default class TemplatesNewSetForegroundPreviewContent extends Component {
  static propTypes = {
    record: PropTypes.object,
    editor: PropTypes.object,
    updateTemplateForeground: PropTypes.func,
    updateTemplateEditor: PropTypes.func,
    canvasDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };


  render() {
    const {
      record,
      editor,
      updateTemplateForeground,
      updateTemplateEditor,
      canvasDimensions
    } = this.props;
    const {
      backgroundPath,
      dimensions
    } = record;

    return (
      <Editor
        editorState={editor}
        foregroundDimensions={dimensions.foreground}
        backgroundDimensions={dimensions}
        canvasDimensions={canvasDimensions}
        backgroundImagePath={backgroundPath}
        updateTemplateForeground={updateTemplateForeground}
        updateTemplateEditor={updateTemplateEditor}
      />
    );
  }
}

const styles = {
};