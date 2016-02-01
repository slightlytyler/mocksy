'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import exportAssets from 'api/export-assets';
import colors from 'constants/colors';
import Button from 'components/Form/Button';

@Radium
export default class IndexSideBarExportPanelExportButton extends Component {
  static propTypes = {
    currentTemplate: PropTypes.object.isRequired,
    screenshot: PropTypes.string,
    sizes: PropTypes.object.isRequired
  };

  render() {
    const {
      currentTemplate,
      screenshot,
      sizes
    } = this.props;

    return (
      <Button
        ref="exportButton"
        onClick={() => exportAssets(currentTemplate, screenshot, sizes)}
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