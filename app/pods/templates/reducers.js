'use strict'

import { combineReducers } from 'redux';
import shortid from 'shortid';
import { merge } from 'lodash';
import { actionTypes } from './constants';

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  SET_CURRENT_TEMPLATE
} = actionTypes;

const templatesReducer = combineReducers({
  entities: entitiesReducer,
  condition: conditionReducer
});

function entitiesReducer(state={}, action) {
  switch (action.type) {
      case ADD_TEMPLATE:
        return addTemplate(state, action.entity);

      case UPDATE_TEMPLATE:
        return updateTemplate(state, action.id, action.props);

      case REMOVE_TEMPLATE:
        return removeTemplate(state, action.id);
  }

  return state;
}

function addTemplate(state, entity) {
  return Object.assign({}, state, {
    [entity.id]: entity
  });
}

function updateTemplate(state, id, props) {
  return merge({}, state, {
    [id]: props
  });
}

function removeTemplate(state, id) {

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
    currentTemplateId: id
  });
}

export default templatesReducer;