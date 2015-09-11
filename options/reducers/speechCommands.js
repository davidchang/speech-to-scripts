import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';
import DEFAULT_COMMANDS from '../constants/DefaultCommands';

const initialState = {
  commands : [],
  debugMessage : {},
  resetId : 0
};

export default function speechCommands(state = initialState, action) {
  switch (action.type) {
  case types.ADD_NEW:
    return {
      ...state,
      commands : [
        ...state.commands,
        {}
      ]
    };

  case types.SAVE:
    chrome.storage.sync.set({
      'options' : state
    });

    return state;

  case types.RESTORE_DEFAULTS:
    return {
      ...state,
      commands : DEFAULT_COMMANDS,
      resetId : state.resetId + 1
    };

  case types.UPDATE:
    return {
      ...state,
      commands : state.commands.map((command, i) => {
        if (i === action.index) {
          return action.newCommand;
        }

        return command;
      })
    };

  case types.SPEECH_COMMANDS_LOADED:
    return {
      ...state,
      commands : action.speechCommands.commands
    };

  case types.REMOVE:
    return {
      ...state,
      commands : state.commands.filter((command, i) => i !== action.index),
      resetId : state.resetId + 1
    };

  case types.LOG_DEBUG_MESSAGE:
    return {
      ...state,
      debugMessage : action.debugMessage,
      commands : state.commands.map((command) => {
        return command;
      })
    };

  default:
    return state;
  }
}
