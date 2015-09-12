// Create a speech recognition instance.
var speechInput = new webkitSpeechRecognition();
speechInput.continuous = true;
speechInput.interimResults = false;

// Add an event listener for when speech recognition (hopefully) starts successfully.
speechInput.onstart = function() {
  chrome.storage.sync.set({ 'speechEnabled' : true }, function() {
    window.close();
  });
};

// Attempt to start speech recognition (and thus generate a permission prompt).
speechInput.start();