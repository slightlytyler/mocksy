'use strict'
// templates need to fix bluprint...

import { routeActions } from 'react-router-redux';
import shortId from 'shortid';

import createTemplateFiles from 'api/create-template-files';
import indentifyImage from 'api/indentify-image';
import { actionTypes } from './constants';

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  UPDATE_NEW_TEMPLATE,
  CLEAR_NEW_TEMPLATE,
  SET_CURRENT_TEMPLATE,
} = actionTypes;

export function addTemplate(callback) {
  return (dispatch, getState) => {
    const { newRecord } = getState().present.templates;
    const {
      name,
      backgroundPath,
      format,
      dimensions
    } = newRecord;
    const id = shortId();
    const date = new Date().getTime();

    const record = {
      id,
      name,
      set: 'user',
      createdAt: date,
      updatedAt: date,
      format,
      dimensions
    };

    createTemplateFiles(id, backgroundPath, () => {
      dispatch({ type: ADD_TEMPLATE, record });
      callback();
    });
  };
}

export function updateTemplate(id, props) {
  return { type: UPDATE_TEMPLATE, id, props };
}

export function removeTemplate(id) {
  return { type: REMOVE_TEMPLATE, id };
}

export function updateNewTemplate(props) {
  return { type: UPDATE_NEW_TEMPLATE, props };
}

export function updateNewTemplateBackground(path, callback) {
  return (dispatch, getState) => {
    indentifyImage(path, data => {
      const { format, size } = data;
      const { width, height } = size;

      dispatch(updateNewTemplate({
        backgroundPath: path,
        format,

        dimensions: {
          width,
          height,

          foreground: {
          }
        }
      }));

      callback();
    });
  }
}

export function clearNewTemplate() {
  return { type: CLEAR_NEW_TEMPLATE }
}

export function setCurrentTemplate(id) {
  return { type: SET_CURRENT_TEMPLATE, id };
}