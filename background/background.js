var _ = require('lodash/lodash');

var getCommands = require('./getCommands');

/**
 * Checks if speech recognition is supported, creates an instance, and starts listening
 */
var setUpRecognition = () => {

  // Create speech recognition object.
  var speechInput = new webkitSpeechRecognition();
  speechInput.continuous = true;
  speechInput.interimResults = false;

  // Set speech API event listeners.
  speechInput.onstart = recognitionStarted;
  speechInput.onerror = recognitionFailed;
  speechInput.onresult = recognitionSucceeded;
  speechInput.onend = recognitionEnded;

  // Start speech recognition.
  speechInput.start();
};

var recognitionStarted = () => {
  console.log('recognition started!');
};

var recognitionEnded = () => {
  // TODO: revive when recognition ends
  console.log('recognition ended!');
};


/**
 * Callback for unsuccessful speech recognition
 * @param {SpeechRecognitionError} e - The recognition error
 */
var recognitionFailed = e => {
  // Send error information
  console.log('error - recognition failed!', e);
};

/**
 * Callback for successful speech recognition
 * @param {SpeechRecognitionEvent} e - The speech recognition result event
 */
var recognitionSucceeded = e => {
  if (!e.results.length) {
    return;
  }

  // Send the most accurate interpretation of the speech.

  var result = e.results[e.resultIndex][0].transcript;
  result = result.trim().toLowerCase();
  console.log('result', result);

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


setUpRecognition();



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