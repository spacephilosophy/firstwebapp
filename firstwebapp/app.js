



var speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-US";

speechRecognition.onresult = function (event) {
  var interimTranscript = "";
  var finalTranscript = "";

  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript;
    } else {
      interimTranscript += event.results[i][0].transcript;
    }
  }
  document.getElementById("input").value = finalTranscript;
};

function startRecording() {
  speechRecognition.start();
}

function stopRecording() {
  speechRecognition.stop();
}

function sendMessage() {
  var input = document.getElementById("input").value;
  var chatbox = document.getElementById("chatbox");

  chatbox.innerHTML += '<div class="user-message">' + input + "</div>";
  chatbox.scrollTop = chatbox.scrollHeight;

  fetch("https://api.openai.com/v1/models/text-davinci-002/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "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",
    },
    body: JSON.stringify({
      prompt: input,
      max_tokens: 2048,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      var response = data.choices[0].text;
      chatbox.innerHTML += '<div class="bot-message">' + response + "</div>";
      chatbox.scrollTop = chatbox.scrollHeight;
    });
}
