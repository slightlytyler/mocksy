'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';

import {
  createTemplateWithBackground
} from 'pods/templates/actions';

import Component from './component';


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
  const { canvasDimensions } = ownProps;

  return Object.assign({}, stateProps, {
    canvasDimensions,

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
