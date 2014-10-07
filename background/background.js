var _ = require('lodash/lodash');

var getCommands = require('./getCommands');

require('./setUpRecognition')();

var processResult = result => {
  getCommands().then(commands => {

    var pertinentCommands = _.where(commands.commands, command => {
      if (!command.regex) {
        return command.keywords.toLowerCase() == result;
      }

      // probably don't want to do this everytime
      var regex = new RegExp(command.keywords);

      return regex.test(result);
    });

    _.each(pertinentCommands, command => {
      var regex = new RegExp(command.keywords);
      console.log('command.script', command.script);
      (captured => eval(command.script))(regex.exec(result).splice(1));
    });

  });
};

chrome.extension.onMessage.addListener(function(message) {
  switch(message.type) {
    case 'result':
      processResult(message.text);
      break;
  }
});



chrome.runtime.onInstalled.addListener(details => {
  console.log('details', details);
  if (_.contains(['install', 'update'], details.reason)) {
    chrome.storage.sync.get('speechEnabled', value => {
      console.log('value', value);
    });

    // TODO: just for now, logic needs to fix to chrome.tabs.create only when speechEnabled is falsy
    return;

    chrome.tabs.create({
      url : chrome.extension.getURL('permissions/askForPermission.html')
    });
  }

  // TODO: populate Chrome storage with defaultCommands preeminently
});