var Q = require('q');

var defaultCommands = require('common/defaultCommands');

// var getCommandsPromise;

var getCommands = () => {

  // // cache
  // if (getCommandsPromise) {
  //   return getCommandsPromise.promise;
  // }

  var getCommandsPromise = Q.defer();

  chrome.storage.sync.get('options', value => getCommandsPromise.resolve(value.options));

  return getCommandsPromise.promise;

};

module.exports = getCommands;