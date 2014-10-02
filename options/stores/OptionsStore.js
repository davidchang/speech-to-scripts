var _ = require('lodash/lodash');

var BaseStore = require('common/BaseStore');
var defaultCommands = require('common/defaultCommands');
var OptionsConstants = require('./../actions/OptionsConstants');

var storeInstance;

var options = {
  commands : defaultCommands
};

chrome.storage.sync.get('options', value => {
  if (_.isObject(value.options)) {
    options = value.options;
    storeInstance.emitChange();
  }
});


class OptionsStore extends BaseStore {
  get options() {
    return options;
  }
}

var saveOptions = () => {
  chrome.storage.sync.set({ 'options' : options });
  storeInstance.emitChange();
}

var actions = {};

actions[OptionsConstants.ADD_NEW_LINK] = action => {
  options[action.linkType].push({
    command : '',
    script : ''
  });
  saveOptions();
};

actions[OptionsConstants.UPDATE_LINK_FIELD] = action => {
  options[action.linkType][action.index][action.field] = action.value;
  saveOptions();
};

actions[OptionsConstants.REMOVE_LINK_ROW] = action => {
  options[action.linkType].splice(action.index, 1);
  saveOptions();
};

actions[OptionsConstants.REVERSE_TO_LINK_DEFAULTS] = action => {
  options[action.linkType] = _.clone(defaultCommands, true);
  saveOptions();
};

storeInstance = new OptionsStore(actions);

module.exports = storeInstance;