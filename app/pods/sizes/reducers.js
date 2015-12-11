'use strict'

import { combineReducers } from 'redux'
import nextId from 'utils/next-id';
import { actionTypes } from './constants'

import {
  mapValues,
  pick,
  reduce
} from 'lodash';

const {
  ADD_SIZE,
  REMOVE_SIZE,
  UPDATE_SIZE,
} = actionTypes;

const sizesReducer = combineReducers({
  entities: entitiesReducer,
  condition: conditionReducer
});

function entitiesReducer(state={}, action) {
  switch (action.type) {
    case ADD_SIZE:
      return addSize(state);

    case REMOVE_SIZE:
      return removeSize(state, action.id);

    case UPDATE_SIZE:
      return updateSize(state, action.id, action.props);
  }

  return state;
}

const addSize = (state) => {
  const id = nextId(state);

  return {
    ...state,
    [id]: {
      id,
      multiplier: '1x',
      suffix: '',
      format: 'png'
    }
  }
}

const removeSize = (state, id) =>
  pick(state, size =>
    size.id !== id
  );

const updateSize = (state, id, props) =>
  mapValues(state, size =>
    id === size.id ?
    Object.assign({}, size, props):
    size
  );

function conditionReducer(state={}, action) {
  switch (action.type) {
  }

  return state;
}

export default sizesReducer;