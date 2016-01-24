'use strict'
// templates need to fix bluprint...

import shortId from 'shortid';

import createTemplate from 'api/create-template';
import { actionTypes } from './constants'

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  SET_CURRENT_TEMPLATE,
  SET_CURRENT_TEMPLATE_SET,
} = actionTypes;

export function addTemplate(props) {
  const {
    name,
    backgroundPath,
    foregroundWidth,
    foregroundHeight,
    foregroundLeft,
    foregroundTop
  } = props;
  const id = shortId();

  const entity = {
    id,
    name,
    foreground: {
      width: foregroundWidth,
      height: foregroundHeight,
      left: foregroundLeft,
      top: foregroundTop
    }
  };

  createTemplate(id, backgroundPath);
  return { type: ADD_TEMPLATE, entity };
}

export function updateTemplate(id, props) {
  return { type: UPDATE_TEMPLATE, id, props };
}

export function removeTemplate(id) {
  return { type: REMOVE_TEMPLATE, id };
}

export function setCurrentTemplate(id) {
  return { type: SET_CURRENT_TEMPLATE, id };
}

export function setCurrentTemplateSet(id) {
  return { type: SET_CURRENT_TEMPLATE_SET, id };
}