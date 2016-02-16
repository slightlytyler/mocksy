'use strict'

import { routeActions } from 'react-router-redux';
import shortId from 'shortid';
import { mapValues } from 'lodash';

import createTemplateFiles from 'api/create-template-files';
import indentifyImage from 'api/indentify-image';
import { actionTypes } from './constants';

const {
  ADD_TEMPLATE,
  UPDATE_TEMPLATE,
  REMOVE_TEMPLATE,
  UPDATE_NEW_TEMPLATE,
  UPDATE_NEW_TEMPLATE_FOREGROUND,
  CLEAR_NEW_TEMPLATE,
  SET_CURRENT_TEMPLATE,
  UPDATE_TEMPLATE_EDITOR
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

export function updateNewTemplateForeground(diff) {
  return (dispatch, getState) => {
    const { foreground } = getState().present.templates.newRecord.dimensions;
    let newForeground = mapValues(diff, (val, key) =>
      Math.round(val + foreground[key])
    );

    if (newForeground.width < 0) {
      newForeground.width = Math.abs(newForeground.width);
      newForeground.x = newForeground.x - newForeground.width;
    }

    if (newForeground.height < 0) {
      newForeground.height = Math.abs(newForeground.height);
      newForeground.y = newForeground.y - newForeground.height;
    }

    return dispatch(updateNewTemplate({
      dimensions: {
        foreground: newForeground
      }
    }));
  }
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

export function updateTemplateEditor(props) {
  return { type: UPDATE_TEMPLATE_EDITOR, props };
}