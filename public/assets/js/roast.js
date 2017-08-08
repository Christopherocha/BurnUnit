var roastId = $("#RoastId").val();

//get users to force a roastee
if(roastId){
$.get("/quotes/roast/"+roastId, function(data) {
      if (data) {
        console.log(data);

      }
});
}

function loadQuotes(quotes){
    var displayQuotes = $("#displayQuotes");
    var html = "";

    for(i=0; i<quotes.length; i++){
        html += "<p>" + quotes[i] + "</p>";
    }

    displayQuotes.html(html);
}

$(document).on("click", "#burn", function(){
    var quote = $("#quote").val();
    var UserId = $("#UserId").val();
    var RoastId = $("#RoastId").val();

    var quoteObj = {
        quote:quote,
        UserId: UserId, 
        RoastId: RoastId
    };

    if(!quote || !UserId || !RoastId){
        console.log("you are missing some deets!")
    }
    else{
        $.post("/quotes", quoteObj, function(data) {
            if (data) {
                console.log(data);
                $.get("/roasts"+UserId, function(data){
                    console.log("oh my!");
                })
            }
        });
    }

})