'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import ExportButton from './ExportButton';

@Radium
export default class IndexSideBarExportPanelActions extends Component {
  static propTypes = {
    currentTemplate: PropTypes.object.isRequired,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired
  };

  render() {
    const {
      currentTemplate,
      screenshot,
      sizes,
      sectionStyle
    } = this.props;

    return (
      <div
        style={[
          sectionStyle,
          styles.base
        ]}
      >
        <ExportButton
          currentTemplate={currentTemplate}
          screenshot={screenshot}
          sizes={sizes}
        />
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    paddingTop: '.5em',
    paddingBottom: '.5em',
    borderBottom: 'none'
  },
};