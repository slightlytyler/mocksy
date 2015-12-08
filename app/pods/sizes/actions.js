'use strict'
// sizes need to fix bluprint...

import { actionTypes } from './constants'

const {
  ADD_SIZE,
  REMOVE_SIZE,
  UPDATE_SIZE,
} = actionTypes;

export function addSize() {
  return { type: ADD_SIZE };
}

export function removeSize(id) {
  return { type: REMOVE_SIZE, id };
}

export function updateSize(id, props) {
  return { type: UPDATE_SIZE, id, props };
}