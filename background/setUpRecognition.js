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
  console.log('recognition ended!');

  console.log('reviving recognition!');
  setTimeout(setUpRecognition);
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

  var result = e.results[e.resultIndex][0].transcript;
  result = result.trim().toLowerCase();

  console.log('recognition succeeded!', result);

  // Send the most accurate interpretation of the speech.
  chrome.extension.sendMessage({
    type: 'result',
    text: result
  });
};

module.exports = setUpRecognition;