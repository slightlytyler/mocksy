'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createSelector } from 'reselect'
import { pick } from 'lodash';

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
    templates: currentTemplateSetSelector(present),
    currentTemplateSetId: currentTemplateSetIdSelector(present),
    currentTemplate: currentTemplateSelector(present),
    currentScreenshot: currentScreenshotSelector(present),
    sizes: sizesEntitiesSelector(present)
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
