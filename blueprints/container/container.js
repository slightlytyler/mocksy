'use strict'

import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import <% TEMPLATE_TOKEN pascalCase %>Component from './component'

function mapStateToProps(state) {
  return {
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
)(<% TEMPLATE_TOKEN pascalCase %>Component);
