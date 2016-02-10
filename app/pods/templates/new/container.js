'use strict'

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import pathModule from 'path';
import { assign, mapValues } from 'lodash';

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
    updateTemplateEditor: actions.updateTemplateEditor,
    transition: routeActions.push,
    goBack: routeActions.goBack
  }, dispatch);
  const {
    addTemplate,
    updateNewTemplate,
    updateNewTemplateBackground,
    updateTemplateEditor,
    transition,
    goBack
  } = boundActions;

  return {
    setTemplateBackground: (path, loadingCb) => {
      loadingCb();
      updateNewTemplateBackground(path, () =>
        transition('templates/new/foreground')
      );
    },
    updateTemplateForeground: (props) => {
      updateNewTemplate({
        dimensions: {
          foreground: props
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
