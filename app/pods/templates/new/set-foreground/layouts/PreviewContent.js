'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import colors from 'constants/colors';
import TemplatePreview from 'pods/template/components/Preview';
import Editor from '../components/Editor';

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

    if (backgroundPath && dimensions) {
      return (
        <div style={styles.container}>
          <div style={styles.border} />
          <TemplatePreview
            backgroundPath={backgroundPath}
            dimensions={dimensions}
            canvasDimensions={canvasDimensions}
            cursor="crosshair"
            overlay={(
              <Editor
                dimensions={dimensions}
                updateTemplateForeground={updateTemplateForeground}
              />
            )}
          />
        </div>
      );
    }
    else {
      return (
        <div>Loading</div>
      );
    }

  }
}

const styles = {
  container: {
    position: 'relative'
  },

  border: {
    boxSizing: 'content-box',
    position: 'absolute',
    left: '-2px',
    top: '-2px',
    width: '100%',
    height: '100%',
    border: `2px solid ${colors.gray}`,
  }
};