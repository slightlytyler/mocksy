'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Sidebar from 'components/Sidebar';
import PreviewArea from 'components/PreviewArea';
import backIcon from 'assets/icons/back.svg';

@Radium
export default class TemplateBuilder extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      setTemplateBackground: PropTypes.func.isRequired,
      setTemplateForeground: PropTypes.func.isRequired,
      setTemplateDetails: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired
    })
  };

  render() {
    const {
      setTemplateBackground,
      setTemplateForeground,
      setTemplateDetails,
      goBack
    } = this.props.actions;

    return (
      <div style={styles.base}>
        <Sidebar>
          <header style={styles.sidebar.header}>
            <section  onClick={() => goBack()}>
              <img
                src={backIcon}
                style={styles.sidebar.back}
              />
            </section>
            <section style={styles.sidebar.title}>
              New Template
            </section>
          </header>

          <section style={styles.sidebar.content}>
            {this.props.sidebar}
          </section>
        </Sidebar>

        <PreviewArea>
          {React.cloneElement(this.props.content, {
            setTemplateBackground,
            setTemplateForeground,
            setTemplateDetails
          })}
        </PreviewArea>
      </div>
    );
  }
}

const styles = {
  base: {
    display: 'flex',
  },

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
    },

    content: {

    }
  }
};