import _ from 'lodash';
import * as speechRecognition from './speechRecognition';

import getActivated from './getActivated';

var getCommands = require('./getCommands');

// typeof script === string
// typeof args === array
var convertFunctionToString = (script, args) => {
  return `(function(captured) { eval(${script}); })('${args.toString()}')`;
};

var execute = (script, args) => {
  chrome.tabs.executeScript({ 'file' : 'background/jquery.min.js' }, () => {

    if (chrome.runtime.lastError) {
      console.log(`ERROR executing script: ${chrome.runtime.lastError.message}`);
    }

    chrome.tabs.executeScript({ 'code' : convertFunctionToString(script, args) }, () => {
      if (chrome.runtime.lastError) {
        console.log(`ERROR executing script: ${chrome.runtime.lastError.message}`);
      }
    });
  });
}

var processResult = result => {
  getCommands().then(commands => {

    console.log('commands', commands);

    _.each(commands.commands, command => {
      if (!command.keywords) {
        return;
      }

      // probably don't want to do this everytime
      var regex = new RegExp(command.keywords);
      var regexResults = regex.exec(result);
      if (!regexResults) {
        return;
      }

      console.log('command running:', command);

      (captured => eval(command.script))(regexResults.splice(1));
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

chrome.browserAction.onClicked.addListener(function() {
  // if it's already activated
  getActivated()
    .then(() => {
      // then we're toggling off
      chrome.storage.sync.set({'activated' : false}, () => {
        console.log('speech recognition deactivated');
        chrome.browserAction.setBadgeText({text : 'Off'});
        chrome.browserAction.setBadgeBackgroundColor({color : '#FF0000'});
      });
    }, () => {
      // else, we're toggling on
      chrome.storage.sync.set({'activated' : true}, () => {
        console.log('speech recognition activated');
        chrome.browserAction.setBadgeText({text : 'On'});
        chrome.browserAction.setBadgeBackgroundColor({color : '#00FF00'});
        speechRecognition.start();
      });
    });
});

// start it, if relevant
getActivated()
  .then(() => {
    chrome.browserAction.setBadgeText({text : 'On'});
    chrome.browserAction.setBadgeBackgroundColor({color : '#00FF00'});
    speechRecognition.start();
  }, () => {
    chrome.browserAction.setBadgeText({text : 'Off'});
    chrome.browserAction.setBadgeBackgroundColor({color : '#FF0000'});
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

  // TODO: populate Chrome storage with defaultCommands preemptively
});