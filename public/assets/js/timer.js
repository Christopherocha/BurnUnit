$(document).ready(function(){

})
//  Our timer object.
var timer = {
  intervalId:undefined,
  running:false,
  time: 10,
  reset: function() {

    timer.time = 10;
    //  TODO: Change the "display" div to "00:00."
    $("#displayQuotes").html(timer.timeConverter(timer.time));

  },
  start: function(callback) {

    if (!this.running){
      //  TODO: Use setInterval to start the count here.
      this.intervalId = setInterval(timer.count.bind(null, callback), 1000);
      this.running = true;
    }
  },
  stop: function() {
    this.running = false;

    //  TODO: Use clearInterval to stop the count here.

      clearInterval(this.intervalId);

  },
  count: function(callback) {
    if(timer.time > 0){
      timer.time--;

      var currentTime = timer.timeConverter(timer.time);

      $("#displayQuotes").html("<p>Count Down to Roast: "+currentTime+"</p>");
    }
    else{
      timer.stop();
      timer.time = 0;
      timeUp = true;
      callback();     
    }
  },
  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

