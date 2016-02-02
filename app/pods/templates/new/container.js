'use strict'

import pathModule from 'path';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import { mapValues } from 'lodash';

import {
  addTemplate,
  updateNewTemplate,
  updateNewTemplateBackground
} from 'pods/templates/actions';

import Component from 'pods/template/components/Builder';

function mapStateToProps(state) {
  return {
    record: state.present.templates.newRecord
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTemplate,
    updateNewTemplate,
    updateNewTemplateBackground,
    transition: routeActions.push,
    goBack: routeActions.goBack
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { currentStep } = stateProps;
  const {
    addTemplate,
    updateNewTemplate,
    updateNewTemplateBackground,
    transition,
    goBack,
  } = dispatchProps;
  const { content, sidebar } = ownProps;

  return Object.assign({}, stateProps, {
    content,
    sidebar,

    actions: {
      setTemplateBackground: (path, loadingCb) => {
        loadingCb();
        updateNewTemplateBackground(path, () => transition('templates/new/foreground'));
      },
      updateTemplateForeground: (props) =>{
        const propsToNumbers = mapValues(props, prop => prop ? Number(prop) : 0);

        updateNewTemplate({
          dimensions: {
            foreground: propsToNumbers
          }
        });
      },
      setTemplateForeground: () => {
        transition('templates/new/details')
      },
      updateTemplateDetails: (props) => {
        updateNewTemplate(props);
      },
      setTemplateDetails: (props) => {
        addTemplate(() => transition('templates/user'));
      },
      goBack
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
