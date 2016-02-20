'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Sidebar from 'components/Sidebar';
import PreviewArea from 'components/PreviewArea';

@Radium
export default class BuilderLayout extends Component {
  static propTypes = {
    SidebarContent: PropTypes.object,
    PreviewContent: PropTypes.object
  };

  render() {
    const {
      SidebarContent,
      PreviewContent
    } = this.props;

    return (
      <div style={styles.base}>
        <Sidebar>
          {SidebarContent}
        </Sidebar>

        <PreviewArea>
         {PreviewContent}
        </PreviewArea>
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
    overflow: 'hidden'
  }
};