'use strict'

import { combineReducers } from 'redux';
import { actionTypes } from './constants';

const {
  SET_CURRENT_TEMPLATE
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
  }

  return state;
}

function setCurrentTemplate(state, id) {
  return Object.assign({}, state, {
    currentTemplate: id
  });
}

export default templatesReducer;