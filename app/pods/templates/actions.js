'use strict'
// templates need to fix bluprint...

import { actionTypes } from './constants'

const {
  SET_CURRENT_TEMPLATE,
  SET_CURRENT_TEMPLATE_SET,
} = actionTypes;

export function setCurrentTemplate(id) {
  return { type: SET_CURRENT_TEMPLATE, id };
}

export function setCurrentTemplateSet(id) {
  return { type: SET_CURRENT_TEMPLATE_SET, id };
}