'use strict'

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import pathModule from 'path';
import { assign, mapValues } from 'lodash';

import * as actions from 'pods/templates/actions';
import Component from 'pods/template/components/Builder';

function mapStateToProps(state) {
  return {
    record: state.present.templates.newRecord
  };
}

function mapDispatchToProps(dispatch) {
  const boundActions = bindActionCreators({
    addTemplate: actions.addTemplate,
    updateNewTemplate: actions.updateNewTemplate,
    updateNewTemplateBackground: actions.updateNewTemplateBackground,
    transition: routeActions.push,
    goBack: routeActions.goBack
  }, dispatch);
  const {
    addTemplate,
    updateNewTemplate,
    updateNewTemplateBackground,
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
        transition('templates/user')
      );
    },
    goBack: goBack
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { content, sidebar } = ownProps;

  return assign({}, stateProps, {
    content,
    sidebar,
    actions: dispatchProps
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
