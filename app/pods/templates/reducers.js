'use strict'

import { combineReducers } from 'redux';
import shortid from 'shortid';
import { assign, merge, omit } from 'lodash';
import { actionTypes } from './constants';

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  UPDATE_NEW_TEMPLATE,
  CLEAR_NEW_TEMPLATE,
  SET_CURRENT_TEMPLATE,
  UPDATE_TEMPLATE_EDITOR
} = actionTypes;

const templatesReducer = combineReducers({
  records: recordsReducer,
  newRecord: newRecordReducer,
  condition: conditionReducer,
  editor: editorReducer
});

function recordsReducer(state={}, action) {
  switch (action.type) {
      case ADD_TEMPLATE:
        return addTemplate(state, action.record);

      case UPDATE_TEMPLATE:
        return updateTemplate(state, action.id, action.props);

      case REMOVE_TEMPLATE:
        return removeTemplate(state, action.id);
  }

  return state;
}

function addTemplate(state, record) {
  return assign({}, state, {
    [record.id]: record
  });
}

function updateTemplate(state, id, props) {
  return merge({}, state, {
    [id]: props
  });
}

function removeTemplate(state, id) {
  return omit(state, id);
}

function newRecordReducer(state={}, action) {
  switch (action.type) {
      case UPDATE_NEW_TEMPLATE:
        return merge({}, state, action.props);

      case CLEAR_NEW_TEMPLATE:
        return {};
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
  return assign({}, state, {
    currentTemplateId: id
  });
}

function editorReducer(state={}, action) {
  switch (action.type) {
    case UPDATE_TEMPLATE_EDITOR:
      return merge({}, state, action.props);
  }

  return state;
}

export default templatesReducer;