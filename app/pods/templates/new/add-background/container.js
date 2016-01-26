'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addTemplate
} from 'pods/templates/actions';

import NewTemplateComponent from './component';


function mapStateToProps(state) {
  let { present } = state;

  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTemplate
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { navigator } = ownProps;

  return Object.assign({}, stateProps, {
    actions: {
      ...dispatchProps
    }
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NewTemplateComponent);
