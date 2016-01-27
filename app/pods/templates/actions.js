'use strict'
// templates need to fix bluprint...

import { routeActions } from 'react-router-redux';
import shortId from 'shortid';

import createTemplateFiles from 'api/create-template';
import indentifyImage from 'api/indentify-image';
import { actionTypes } from './constants';

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  SET_CURRENT_TEMPLATE,
} = actionTypes;

export function addTemplate(id, backgroundPath) {
  return (dispatch, getState) => {
    const date = new Date().getTime();

    indentifyImage(backgroundPath, data => {
      const { format, size } = data;
      const { width, height } = size;

      const entity = {
        id,
        name: '',
        set: 'user',
        createdAt: date,
        updatedAt: date,
        format,

        dimensions: {
          width,
          height,

          foreground: {
            width: 0,
            height: 0,
            left: 0,
            top: 0
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

export function createTemplate(path, callback) {
  return (dispatch, getState) => {
    const id = shortId();

    createTemplateFiles(id, path);

    dispatch(addTemplate(
      id,
      path
    ));

    callback(id);
  };
}

export function setTemplateForeground(id, width, height, left, top) {
  return updateTemplate(id, {
    dimensions: {
      foreground: {
        width: Number(width),
        height: Number(height),
        left: Number(left),
        top: Number(top)
      }
    }
  });
}

export function setCurrentTemplate(id) {
  return { type: SET_CURRENT_TEMPLATE, id };
}