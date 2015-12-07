'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { setCurrentScreenshot } from 'pods/screenshots/actions';
import IndexComponent from './component';

function mapStateToProps(state) {
  const { entities, condition } = state.templates;

  return {
    templates: entities,
    currentTemplate: entities[condition.currentTemplate],
    currentScreenshot: state.screenshots.condition.currentScreenshot
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentScreenshot
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
