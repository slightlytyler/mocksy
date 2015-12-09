'use strict'

import { combineReducers } from 'redux';
import { actionTypes } from './constants';

const {

} = actionTypes;

const <% TEMPLATE_TOKEN camelCase %>Reducer = combineReducers({
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
  }

  return state;
}

export default <% TEMPLATE_TOKEN camelCase %>Reducer;