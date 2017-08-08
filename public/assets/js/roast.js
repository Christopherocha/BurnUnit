var roastId = $("#RoastId").val();

//get users to force a roastee
if(roastId){
$.get("/quotes/roast/"+roastId, function(data) {
      if (data) {
        console.log(data);

      }
});
}

function displayQuotes(quote){
    var displayQuotes = $("#displayQuotes");
    var html = "";

    html += "<p> user: " + quote.UserId + " quote: " + quote.quote + "</p>";
    

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
                var html = "<p>" + data + "</p>";
                displayQuotes(data);
            }
        });
    }

})