var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();
 
var Textbox = $('#textbox');
var instructions = $('instructions');
 
var Content = ''
var Signs = [];
var master_loop_time = 500
var remove_count = 0
var skip = 0
 
recognition.continuous = true;

function fileExists(url) {
   var http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send();
   return http.status!=404;
}
setInterval(function(){ 
  console.log(Signs)
  if(skip==0){
    Signs = Signs.slice(remove_count)
    remove_count=0
    if (Array.isArray(Signs) && Signs.length) {
      if(Signs[0]=="") Signs.shift()
      if(fileExists("assets/img/"+Signs[0]+"_"+Signs[1]+"_"+Signs[2]+"_"+Signs[3]+".gif"))
      {
        console.log("File Found 4")
          $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/"+Signs[0]+"_"+Signs[1]+"_"+Signs[2]+"_"+Signs[3]+".gif\" />");
          remove_count = 4
          skip = 4
      }
      else if(fileExists("assets/img/"+Signs[0]+"_"+Signs[1]+"_"+Signs[2]+".gif"))
      {
        console.log("File Found 3")
          $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/"+Signs[0]+"_"+Signs[1]+"_"+Signs[2]+".gif\" />");
          remove_count = 3
          skip = 3
      }
      else if(fileExists("assets/img/"+Signs[0]+"_"+Signs[1]+".gif"))
      {
        console.log("File Found 2")
          $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/"+Signs[0]+"_"+Signs[1]+".gif\" />");
          remove_count = 2
          skip = 2
      }
      else if(fileExists("assets/img/"+Signs[0]+".gif"))
      {
        console.log("File Found 1")
          $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/"+Signs[0]+".gif\" />");
          console.log("word exist")
          remove_count = 1
          skip = skip+1
      }
      else {
        $('#sign-box').html("<h1>"+Signs[0]+"</h1>");
        remove_count = 1
        skip = skip+1
      }
    }
  }
  else skip--
  console.log(skip)

  // $('#sign-box').html("<img class=\"img-fluid\" src=\"assets/img/default.jpg\" alt=\"Oorja Sign\" />");
}, 500);

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
 