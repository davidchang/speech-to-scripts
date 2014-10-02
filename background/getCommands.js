var Q = require('q');

var defaultCommands = require('common/defaultCommands');

var getCommands = () => {

  var promise = Q.defer();

  chrome.storage.sync.get('options', value => {
    if (_.isObject(value.options)) {
      promise.resolve(value.options || defaultCommands);
    } else {
      promise.resolve(defaultCommands);
    }
  });

  return promise.promise;

};

module.exports = getCommands;