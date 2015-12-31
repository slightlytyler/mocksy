'use strict'

import { combineReducers } from 'redux';
import { actionTypes } from './constants';

const {
  SET_CURRENT_TEMPLATE,
  SET_CURRENT_TEMPLATE_SET
} = actionTypes;

const templatesReducer = combineReducers({
  entities: entitiesReducer,
  condition: conditionReducer
});

function entitiesReducer(state={}, action) {
  switch (action.type) {
  }

  return state;
}

function conditionReducer(state={}, action) {
  switch (action.type) {
    case SET_CURRENT_TEMPLATE:
      return setCurrentTemplate(state, action.id);
    case SET_CURRENT_TEMPLATE_SET:
      return setCurrentTemplateSet(state, action.id);
  }

  return state;
}

function setCurrentTemplate(state, id) {
  return Object.assign({}, state, {
    currentTemplate: id
  });
}

function setCurrentTemplateSet(state, id) {
  return Object.assign({}, state, {
    currentTemplateSet: id
  });
}

export default templatesReducer;