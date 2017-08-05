console.log("roasts");

var roastee  = {};
var roasteeId;


$.get("/users/", function(data) {
      if (data) {
        console.log(data);
        roastee = data[0];
        roasteeId = data[0].UserId;
        var action = "/roasts/"+roasteeId;
        $("#create-roast").attr("action", action);
        // If this post exists, prefill our cms forms with its data
      }
});



function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }