'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCurrentTemplate } from 'pods/templates/actions';
import {
  currentTemplateSelector,
  currentTemplateSetSelector
} from 'pods/templates/selectors';
import { setCurrentScreenshot } from 'pods/screenshots/actions';
import { currentScreenshotSelector } from 'pods/screenshots/selectors';
import {
  addSize,
  removeSize,
  updateSize
} from 'pods/sizes/actions';
import { sizesRecordsSelector } from 'pods/sizes/selectors';
import Layout from './layout';

function mapStateToProps(state) {
  const { present } = state;

  return {
    templates: currentTemplateSetSelector(present),
    currentTemplate: currentTemplateSelector(present),
    currentScreenshot: currentScreenshotSelector(present),
    sizes: sizesRecordsSelector(present)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentTemplate,
    setCurrentScreenshot,
    addSize,
    removeSize,
    updateSize
  }, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, stateProps, {
    actions: {
      ...dispatchProps
    },
    components: {
      SidebarContent: ownProps.SidebarContent
    }
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Layout);
