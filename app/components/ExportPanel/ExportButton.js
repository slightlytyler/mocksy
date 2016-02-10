'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import exportAssets from 'api/export-assets';
import colors from 'constants/colors';
import Button from 'components/Form/Button';

@Radium
export default class ExportPanelExportButton extends Component {
  static propTypes = {
    template: PropTypes.object,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired
  };

  render() {
    const {
      template,
      screenshot,
      sizes
    } = this.props;

    return (
      <Button
        ref="exportButton"
        onClick={() => exportAssets(template, screenshot, sizes)}
        color={colors.pink}
        disabled={!screenshot}
      >
        Export Screenshot
      </Button>
    );
  }
}

const styles = {
};