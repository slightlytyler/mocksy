'use strict'

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import IndexComponent from './component'

function mapStateToProps(state) {
  return {
    templates: state.templates.entities
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

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
)(IndexComponent);
