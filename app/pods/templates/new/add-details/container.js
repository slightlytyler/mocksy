'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import {
  updateTemplate
} from 'pods/templates/actions';

import Component from './component';


function mapStateToProps(state) {
  let { present } = state;

  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTemplate,
    transitionTo: routeActions.push
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, stateProps, {
    id: ownProps.params.templateId,

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
