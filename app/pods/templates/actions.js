'use strict'
// templates need to fix bluprint...

import shortId from 'shortid';

import createTemplate from 'api/create-template';
import indentifyImage from 'api/indentify-image';
import { actionTypes } from './constants'

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  SET_CURRENT_TEMPLATE,
  SET_CURRENT_TEMPLATE_SET,
} = actionTypes;

export function addTemplate(props) {
  return (dispatch, getState) => {
    const {
      name,
      backgroundPath,
      foregroundWidth,
      foregroundHeight,
      foregroundLeft,
      foregroundTop
    } = props;
    const id = shortId();
    const date = new Date().getTime();

    createTemplate(id, backgroundPath);

    indentifyImage(backgroundPath, data => {
      const { format, size } = data;
      const { width, height } = size;

      const entity = {
        id,
        name,
        set: 'user',
        createdAt: date,
        updatedAt: date,
        format,

        dimensions: {
          width,
          height,

          foreground: {
            width: Number(foregroundWidth),
            height: Number(foregroundHeight),
            left: Number(foregroundLeft),
            top: Number(foregroundTop)
          }
        }
      };

      dispatch({ type: ADD_TEMPLATE, entity });
    });
  };
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