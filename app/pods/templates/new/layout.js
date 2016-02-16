'use strict'

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import backIcon from 'assets/icons/back.svg';
import BuilderLayout from 'layouts/Builder';

@Radium
export default class TemplatesNewLayout extends Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      addTemplateBackground: PropTypes.func.isRequired,
      updateTemplateForeground: PropTypes.func.isRequired,
      setTemplateForeground: PropTypes.func.isRequired,
      updateTemplateDetails: PropTypes.func.isRequired,
      setTemplateDetails: PropTypes.func.isRequired,
      updateTemplateEditor: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired
    }),
    components: PropTypes.shape({
      SidebarContent: PropTypes.object.isRequired,
      PreviewContent: PropTypes.object.isRequired
    })
  }

  renderSidebar = () => {
    const {
      record,
      editor,
      actions,
      components
    } = this.props;
    const {
      addTemplateBackground,
      updateTemplateForeground,
      setTemplateForeground,
      updateTemplateDetails,
      setTemplateDetails,
      updateTemplateEditor,
      goBack
    } = actions;
    const {
      SidebarContent
    } = components;

    return (
      <div>
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

        <section>
          {React.cloneElement(SidebarContent, {
            record,
            editor,
            addTemplateBackground,
            updateTemplateForeground,
            setTemplateForeground,
            updateTemplateDetails,
            setTemplateDetails,
            updateTemplateEditor
          })}
        </section>
      </div>
    );
  }

  renderPreview = () => {
    const {
      record,
      editor,
      actions,
      components
    } = this.props;
    const {
      addTemplateBackground,
      updateTemplateForeground,
      setTemplateForeground,
      updateTemplateDetails,
      setTemplateDetails,
      updateTemplateEditor,
      goBack
    } = actions;
    const {
      PreviewContent
    } = components;

    return React.cloneElement(PreviewContent, {
      record,
      editor,
      addTemplateBackground,
      updateTemplateForeground,
      setTemplateForeground,
      updateTemplateDetails,
      setTemplateDetails,
      updateTemplateEditor
    });
  }

  render() {
    const {
      components
    } = this.props;
    const {
      SidebarContent,
      PreviewContent
    } = components;

    return (
      <BuilderLayout
        SidebarContent={this.renderSidebar()}
        PreviewContent={this.renderPreview()}
      />
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
  }
};