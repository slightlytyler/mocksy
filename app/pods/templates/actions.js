'use strict'
// templates need to fix bluprint...

import { actionTypes } from './constants'

const {
  SET_CURRENT_TEMPLATE
} = actionTypes;

export function setCurrentTemplate(id) {
  return { type: SET_CURRENT_TEMPLATE, id };
}