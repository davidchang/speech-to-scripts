import getActivated from './getActivated';

/**
 * Checks if speech recognition is supported, creates an instance, and starts listening
 */
export function start() {

  let errorOccurred = false;

  let recognitionStarted = () => {
    console.log('recognition started!');
  };

  let recognitionEnded = () => {
    console.log('recognition ended!');

    if (!errorOccurred) {
      console.log('reviving recognition!');
      setTimeout(start);
    } else {
      console.log('an error had occurred, not reviving recognition');
    }
  };


  /**
   * Callback for unsuccessful speech recognition
   * @param {SpeechRecognitionError} e - The recognition error
   */
  let recognitionFailed = e => {
    // Send error information
    console.log('error - recognition failed!', e);
    if (e.error === 'aborted') {
      errorOccurred = true;
    }
  };

  /**
   * Callback for successful speech recognition
   * @param {SpeechRecognitionEvent} e - The speech recognition result event
   */
  let recognitionSucceeded = e => {
    if (!e.results.length) {
      return;
    }

    let result = e.results[e.resultIndex][0].transcript;
    result = result.trim().toLowerCase();

    console.log('recognition succeeded!', result);

    // Send the most accurate interpretation of the speech.
    chrome.extension.sendMessage({
      type: 'result',
      text: result
    });
  };


  let speechInput = new webkitSpeechRecognition();
  speechInput.continuous = true;
  speechInput.interimResults = false;

  // Set speech API event listeners.
  speechInput.onstart = recognitionStarted;
  speechInput.onerror = recognitionFailed;
  speechInput.onresult = recognitionSucceeded;
  speechInput.onend = recognitionEnded;

  // Start speech recognition.
  getActivated()
    .then(() => speechInput.start());
};
