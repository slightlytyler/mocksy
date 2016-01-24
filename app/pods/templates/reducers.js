'use strict'

import { combineReducers } from 'redux';
import shortid from 'shortid';
import { actionTypes } from './constants';

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  SET_CURRENT_TEMPLATE,
  SET_CURRENT_TEMPLATE_SET
} = actionTypes;

const templatesReducer = combineReducers({
  entities: entitiesReducer,
  condition: conditionReducer
});

function entitiesReducer(state={}, action) {
  switch (action.type) {
      case ADD_TEMPLATE:
        return addTemplate(state, action.props);

      case UPDATE_TEMPLATE:
        return updateTemplate(state, action.id, action.props);

      case REMOVE_TEMPLATE:
        return removeTemplate(state, action.id);
  }

  return state;
}

function addTemplate(state, props) {
  return Object.assign({
    id: shortid(),
  }, state, props)
}

function updateTemplate(state, id, props) {
  return Object.assign({}, state, {
    [id]: Object.assign({}, state[id], props)
  });
}

function removeTemplate(state, id) {

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