var Q = require('q');

var defaultCommands = require('common/defaultCommands');

// var getCommandsPromise;

var getCommands = () => {

  // // cache
  // if (getCommandsPromise) {
  //   return getCommandsPromise.promise;
  // }

  var getCommandsPromise = Q.defer();

  chrome.storage.sync.get('options', value => {
    if (_.isObject(value.options)) {
      getCommandsPromise.resolve(value.options || defaultCommands);
    } else {
      getCommandsPromise.resolve(defaultCommands);
    }
  });

  return getCommandsPromise.promise;

};

module.exports = getCommands;