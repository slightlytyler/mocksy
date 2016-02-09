'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import Sidebar from 'components/Sidebar';
import PreviewArea from 'components/PreviewArea';
import backIcon from 'assets/icons/back.svg';

@Radium
export default class TemplateBuilder extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      setTemplateBackground: PropTypes.func.isRequired,
      updateTemplateForeground: PropTypes.func.isRequired,
      setTemplateForeground: PropTypes.func.isRequired,
      updateTemplateDetails: PropTypes.func.isRequired,
      setTemplateDetails: PropTypes.func.isRequired,
      updateTemplateEditor: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired
    })
  };

  render() {
    const {
      content,
      sidebar,
      record,
      editor,
      actions
    } = this.props;
    const {
      setTemplateBackground,
      updateTemplateForeground,
      setTemplateForeground,
      updateTemplateDetails,
      setTemplateDetails,
      updateTemplateEditor,
      goBack
    } = actions;

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
            {React.cloneElement(sidebar, {
              record,
              editor,
              setTemplateBackground,
              updateTemplateForeground,
              setTemplateForeground,
              updateTemplateDetails,
              setTemplateDetails,
              updateTemplateEditor
            })}
          </section>
        </Sidebar>

        <PreviewArea>
          {React.cloneElement(content, {
            record,
            editor,
            setTemplateBackground,
            updateTemplateForeground,
            setTemplateForeground,
            updateTemplateDetails,
            setTemplateDetails,
            updateTemplateEditor
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