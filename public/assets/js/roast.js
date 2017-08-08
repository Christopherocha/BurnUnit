var roastId = $("#RoastId").val();

//get users to force a roastee
if(roastId){
$.get("/quotes/"+roastId, function(data) {
      if (data) {
        console.log(data);
        if(data.quotes.length > 0){
            loadQuotes(data.quotes);
        }
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