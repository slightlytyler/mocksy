'use strict'

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import pathModule from 'path';
import { assign, mapValues } from 'lodash';

import openFile from 'api/open-file';
import * as actions from 'pods/templates/actions';
import Layout from './layout';

function mapStateToProps(state) {
  const {
    newRecord,
    editor
  } = state.present.templates;

  return {
    record: newRecord,
    editor
  };
}

function mapDispatchToProps(dispatch) {
  const boundActions = bindActionCreators({
    addTemplate: actions.addTemplate,
    updateNewTemplate: actions.updateNewTemplate,
    updateNewTemplateBackground: actions.updateNewTemplateBackground,
    updateNewTemplateForeground: actions.updateNewTemplateForeground,
    updateTemplateEditor: actions.updateTemplateEditor,
    transition: routeActions.push,
    goBack: routeActions.goBack
  }, dispatch);
  const {
    addTemplate,
    updateNewTemplate,
    updateNewTemplateBackground,
    updateNewTemplateForeground,
    updateTemplateEditor,
    transition,
    goBack
  } = boundActions;

  return {
    addTemplateBackground: () => {
      openFile(path =>
        updateNewTemplateBackground(path, () =>
          transition('templates/new/foreground')
        )
      );
    },
    updateTemplateForeground: (diff) => {
      updateNewTemplateForeground(diff);
    },
    resetTemplateForeground: () => {
      updateNewTemplate({
        dimensions: {
          foreground: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
        }
      });
    },
    setTemplateForeground: () => {
      transition('templates/new/details')
    },
    updateTemplateDetails: (props) => {
      updateNewTemplate(props)
    },
    setTemplateDetails: (props) => {
      addTemplate(() =>
        transition('templates/show/user')
      );
    },
    updateTemplateEditor,
    goBack
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {
    SidebarContent,
    PreviewContent
  } = ownProps;

  return assign({}, stateProps, {
    actions: dispatchProps,
    components: {
      SidebarContent,
      PreviewContent
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Layout);
