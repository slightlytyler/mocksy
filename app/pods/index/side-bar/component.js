'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import TemplateList from './template-list/component';
import ExportPanel from './export-panel/component';

@Radium
export default class IndexSideBar extends Component {
  static propTypes = {
  };

  render() {
    return (
      <section
        className="sidebar"
        style={styles.base}
      >
        <TemplateList />
        <ExportPanel />
      </section>
    );
  }
}

const styles = {
    base: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 4,
      height: '100vh',
      backgroundColor: '#CFD8DC',
      borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
      boxShadow: 'rgba(0, 0, 0, 0.25) 2px 0 4px'
    },
  };