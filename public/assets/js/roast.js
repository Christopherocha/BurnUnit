$(document).ready(function () {

    //load quotes on intervarl
    var nIntervId;

    function updateQuotes() {
        nIntervId = setInterval(getQuotes, 500);
    }

    function stopTextColor() {
        clearInterval(nIntervId);
    }

    updateQuotes();

//check to see that user is stored
console.log(JSON.parse(localStorage.getItem('user')));

//get user from local storage and save to global user object
var user = JSON.parse(localStorage.getItem('user'));
//get the roast id of the roast that the page was rendered with
var RoastId = $("#RoastId").val();
//create a global roast object  
var roast = {
    RoastId: RoastId,
    roastee: "",
    creator: "",
    winner: "",
};

//get the roast info
//this might not be needed once things are moving smoothly
$.get("/roasts/find/" + RoastId, function (data) {
    console.log(data)
    if(!data.creator){
        roast.creator = data.UserId
        localStorage.setItem('currentRoast', JSON.stringify(roast));
        console.log(JSON.parse(localStorage.getItem('currentRoast')));

    }
    else {
        roast.creator = data.creator
        localStorage.setItem('currentRoast', JSON.stringify(roast));
        console.log(JSON.parse(localStorage.getItem('currentRoast')));
    }
});



//get print the current quotes in the roast
if(RoastId){
 getQuotes();
}


//gets the quotes of the current roast and displays them in #displayQuotes <div>
//I want to pass a function into getQuotes so I can use it with displayQuotes 
//and getWinner
function getQuotes() {
    $.get("/quotes/roast/" + RoastId, function (quotes) {
        if (quotes) {
            console.log(quotes);
            displayQuotes(quotes)
        }
    });
}

//displays all of the quotes for a roast
function displayQuotes(quotes){
    var displayQuotes = $("#displayQuotes");
    var html = "";
    for(i=0; i<quotes.length; i++){
    html += "<p> user: " + quotes[i].UserId + " quote: " + quotes[i].quote + "</p>";
    }

    displayQuotes.html(html);
}

//displays buttons for the roastee to choose a winner from
function getWinner(quotes){
    var displayQuotes = $("#displayQuotes");
    var html = "";
    for(i=0; i<quotes.length; i++){
    html += "<p><a class='winner' id='" + quotes[i].RoastId +
     "' user='" + quotes[i].UserId + "' quoteId='" + quotes[i].id + 
     "' value='" + quotes[i].quote + "'> user: " + quotes[i].UserId + 
     " quote: " + quotes[i].quote + "</a></p>";
    }

    displayQuotes.html(html);
}

$(document).on("click", "#burn", function(){
    var quote = $("#quote").val();
    var UserId = user.UserId;
    var RoastId = roast.RoastId;

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
                getQuotes();
            }
        });
    }

})

//if the roastee
$(document).on("click", ".winner", function(){
    var id = this.id
    var UserId = $(this).attr("user");
    var quote = $(this).attr("value");
    var quoteId = $(this).attr("quoteId")
    var req = {
        winner: UserId,
        quote: quote,
        quoteId: quoteId
    }

    console.log(req.winner);

    //PUT http://localhost:8080/roasts/winner 404 (Not Found)
    $.ajax({
        url: "/roasts/winner/" + id,
        type: "PUT",
        data: req,
        success: function (data) {
            console.log(data);
        }
    })

})

//when game ends... timer runs out
if (user.UserId === roast.roastee) {
    //allow user to pick a quote
    $.get("/quotes/roast/" + RoastId, function (quotes) {
        if (quotes) {
            console.log(quotes);
            getWinner(quotes);
        }
    });
}


})