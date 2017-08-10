console.log( JSON.parse(localStorage.getItem('user')));

var RoastId = $("#RoastId").val();
var roast = {
    RoastId: RoastId,
};

localStorage.setItem('currentRoast', JSON.stringify(roast));

console.log(JSON.parse(localStorage.getItem('currentRoast')));

//get users to force a roastee
if(RoastId){
$.get("/quotes/roast/"+RoastId, function(data) {
      if (data) {
        console.log(data);

      }
});
}

function displayQuotes(quotes){
    var displayQuotes = $("#displayQuotes");
    var html = "";
    for(i=0; i<quotes.length; i++){
    html += "<p> user: " + quotes[i].UserId + " quote: " + quotes[i].quote + "</p>";
    }

    displayQuotes.html(html);
}

$(document).on("click", "#burn", function(){
    var quote = $("#quote").val();
    var UserId = $("#UserId").val();
    var RoastId = $("#RoastId").val();

    $("#quote").val("");

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
            if (quote) {
                console.log(quote);
                var html = "<p>" + data + "</p>";
                //displayQuotes(data);
                $.get("/quotes/roast/"+RoastId, function(quotes) {
                    if (quotes) {
                        console.log(quotes);
                        displayQuotes(quotes)
                    }
                });
            }
        });
    }

})