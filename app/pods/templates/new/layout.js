'use strict'

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import Radium from 'radium';

import Sidebar from 'components/Sidebar';
import PreviewArea from 'components/PreviewArea';
import backIcon from 'assets/icons/back.svg';

@Radium
export default class TemplatesNew extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const { goBack } = this.context.router;
    return(
      <div style={styles.base}>
        <Sidebar>
          <header style={styles.sidebar.header}>
            <section onClick={() => goBack()}>
              <img
                src={backIcon}
                style={styles.sidebar.back}
              />
            </section>
            <section style={styles.sidebar.title}>
              New Template
            </section>
          </header>
        </Sidebar>

        <PreviewArea>
          {this.props.children}
        </PreviewArea>
      </div>
    );
  }
}

const styles = {
  sidebar: {
    header: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '.5em',
      fontSize: '1.5em',
      color: 'white',
      borderBottom: '1px solid white'
    },

    back: {
      width: '1.5em',
      cursor: 'pointer'
    },

    title: {
      margin: '0 auto'
    }
  },

  base: {
    display: 'flex',
  },
};