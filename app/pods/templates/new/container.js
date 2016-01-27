'use strict'

import pathModule from 'path';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import {
  addTemplate,
  updateNewTemplate,
  addTemplateBackground
} from 'pods/templates/actions';

import Component from 'pods/template/components/Builder';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTemplate,
    updateNewTemplate,
    addTemplateBackground,
    transition: routeActions.push,
    goBack: routeActions.goBack
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { currentStep } = stateProps;
  const {
    addTemplate,
    updateNewTemplate,
    addTemplateBackground,
    transition,
    goBack,
  } = dispatchProps;
  const { content, sidebar } = ownProps;

  return Object.assign({}, stateProps, {
    content,
    sidebar,

    actions: {
      setTemplateBackground: path => addTemplateBackground(path, () => transition('templates/new/foreground')),
      setTemplateForeground: (width, height, left, top) => {
        updateNewTemplate({
          dimensions: {
            foreground: {
              width: Number(width),
              height: Number(height),
              left: Number(left),
              top: Number(top)
            }
          }
        });

        transition('templates/new/details')
      },
      setTemplateDetails: (props) => {
        updateNewTemplate(props);
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
