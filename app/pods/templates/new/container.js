'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import {
  createTemplateWithBackground
} from 'pods/templates/actions';

import Component from 'pods/template/components/Builder';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createTemplateWithBackground,
    transitionTo: routeActions.push
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { content, sidebar } = ownProps;

  return Object.assign({}, stateProps, {
    content,
    sidebar,

    actions: {
      ...dispatchProps
    }
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
