'use strict'
// screenshots need to fix bluprint...

import { actionTypes } from './constants'

const {
  SET_CURRENT_SCREENSHOT
} = actionTypes;

export function setCurrentScreenshot(path) {
  return { type: SET_CURRENT_SCREENSHOT, path };
}