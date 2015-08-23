var Q = require('q');

export default function getActivated() {

  var getActivatedPromise = Q.defer();

  chrome.storage.sync.get('activated', value => {
    if (value && value.activated) {
      console.log('getActivated: truthy');
      getActivatedPromise.resolve();
    } else {
      console.log('getActivated: falsy');
      getActivatedPromise.reject();
    }
  });

  return getActivatedPromise.promise;
};
