'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { setCurrentScreenshot } from 'pods/screenshots/actions';
import {
  addSize,
  removeSize,
  updateSize
} from 'pods/sizes/actions';
import IndexComponent from './component';

function mapStateToProps(state) {
  const {
    templates,
    screenshots,
    sizes
  } = state;

  return {
    templates: templates.entities,
    currentTemplate: templates.entities[templates.condition.currentTemplate],
    currentScreenshot: screenshots.condition.currentScreenshot,
    sizes: sizes.entities
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentScreenshot,
    addSize,
    removeSize,
    updateSize
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
