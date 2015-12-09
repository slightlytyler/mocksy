'use strict'

import { combineReducers } from 'redux'
import { actionTypes } from './constants'

const {
  SET_CURRENT_SCREENSHOT
} = actionTypes;


const screenshotsReducer = combineReducers({
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
    case SET_CURRENT_SCREENSHOT:
      return setCurrentScreenshot(state, action.path)
  }

  return state;
}

function setCurrentScreenshot(state, path) {
  return Object.assign({}, state, {
    currentScreenshot: path
  });
}

export default screenshotsReducer;