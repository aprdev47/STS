var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();
 
var Textbox = $('#textbox');
var instructions = $('instructions');
 
var Content = '';
var Signs = [];
 
recognition.continuous = true;

setInterval(function(){ 
  if (Array.isArray(Signs) && Signs.length) {
    if(Signs[0]=="") Signs.shift()
    $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/"+Signs[0]+".gif\" />");
    setTimeout(function(){ Signs.shift() 
    }, 1000);
  }
  else  $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/default.jpg\" alt=\"Oorja Sign\" />");
}, 1000);

recognition.onresult = function(event) {
 
  var current = event.resultIndex;
 
  var transcript = event.results[current][0].transcript;
 
    Content = transcript+"<br/>"+Content;
    $('#translation-content').html(Content);
    Signs = Signs.concat(transcript.split(" "));
    console.log(Signs)
};
 
recognition.onstart = function() { 
  instructions.text('Voice recognition is ON.');
}
 
recognition.onspeechend = function() {
  instructions.text('No activity.');
}
 
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('Try again.');  
  }
}
$('#pauseTranslation').on('click', function(e) {
  recognition.stop();
});
$('#startTranslation').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.start();
});
 