'use strict'

import pathModule from 'path';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import {
  createTemplate,
  updateTemplate,
  removeTemplate
} from 'pods/templates/actions';

import Component from 'pods/template/components/Builder';

function mapStateToProps(state) {
  const { present } = state;

  return {
    currentStep: pathModule.basename(present.routing.location.pathname)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createTemplate,
    updateTemplate,
    removeTemplate,
    transition: routeActions.push,
    goBack: routeActions.goBack
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { content, sidebar } = ownProps;

  return Object.assign({}, stateProps, {
    content,
    sidebar,

    actions: {
      ...dispatchProps,
      transition: () => dispatchProps.transitionTo(
        nextStep(stateProps.currentStep)
      ),
    }
  });
}

function nextStep(currentStep, ) {
  const steps = [
    'background',
    'foreground',
    'details'
  ];
  const currentStepIndex = steps.indexOf(currentStep);
  const nextStepIndex = currentStepIndex + 1;

  const nextStep = currentStepIndex < steps.length
    ? steps[nextStepIndex]
    : 'exit'
  ;

  if (nextStep === 'exit') {
    return '/templates/user';
  }
  else {
    return `/templates/new/${nextStep}`;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
