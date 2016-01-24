'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setCurrentTemplate,
  setCurrentTemplateSet,
} from 'pods/templates/actions';
import {
  currentTemplateSelector,
  currentTemplateSetIdSelector,
  currentTemplateSetSelector
} from 'pods/templates/selectors';

import { setCurrentScreenshot } from 'pods/screenshots/actions';
import { currentScreenshotSelector } from 'pods/screenshots/selectors';

import {
  addSize,
  removeSize,
  updateSize
} from 'pods/sizes/actions';
import { sizesEntitiesSelector } from 'pods/sizes/selectors';

import IndexComponent from './component';


function mapStateToProps(state) {
  let { present } = state;

  return {
    templates: currentTemplateSetSelector(state),
    currentTemplate: currentTemplateSelector(state),
    currentScreenshot: currentScreenshotSelector(state),
    sizes: sizesEntitiesSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentTemplate,
    setCurrentTemplateSet,
    setCurrentScreenshot,
    addSize,
    removeSize,
    updateSize
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { currentTemplateSetId  } = ownProps.route;

  const routeProps = {
    currentTemplateSetId
  };

  return Object.assign({}, stateProps, routeProps, {
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
