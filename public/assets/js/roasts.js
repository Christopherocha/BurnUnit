console.log("roasts");

var roastee  = {};
var roasteeId;

//get users to force a roastee
$.get("/users/roasts", function(data) {
      if (data) {
        console.log(data);
        if(data.users.length > 0){
          roastee = data.users[0];
          roasteeId = data.users[0].id;
          var action = "/roasts/"+roasteeId;
          $("#create-roast").attr("action", action);
          // If this post exists, prefill our cms forms with its data
        }
      }
});

