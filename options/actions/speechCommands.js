import * as types from '../constants/ActionTypes';
import _ from 'lodash';

export function addNew() {
  return { type: types.ADD_NEW };
}

export function save() {
  return { type: types.SAVE };
}

export function remove(index) {
  return { type: types.REMOVE, index };
}

export function restoreDefaults() {
  return { type: types.RESTORE_DEFAULTS };
}

export function update(index, newCommand) {
  return { type: types.UPDATE, index, newCommand };
}

export function loadSpeechCommands() {
  return dispatch => {
    chrome.storage.sync.get('options', value => {
      if (_.isObject(value.options)) {
        dispatch({
          type: types.SPEECH_COMMANDS_LOADED,
          speechCommands: { commands : value.options }
        });
      }
    });
  };
}

export function logDebugMessage(debugMessage) {
  return { type: types.LOG_DEBUG_MESSAGE, debugMessage };
}