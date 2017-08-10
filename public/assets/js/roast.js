console.log(JSON.parse(localStorage.getItem('user')));

var user = JSON.parse(localStorage.getItem('user'));
var RoastId = $("#RoastId").val();
var roast = {
    RoastId: RoastId,
    roastee: "",
    creator: "",
    winner: "",
};

$.get("/roasts/" + RoastId, function (data) {
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


//get users to force a roastee
if(RoastId){
 getQuotes();
}


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

//displays buttons for the roastee to choose from
function getWinner(quotes){
    var displayQuotes = $("#displayQuotes");
    var html = "";
    for(i=0; i<quotes.length; i++){
    html += "<button class='winner' id='" + quotes[i].RoastId + "' user='"+quotes[i].UserId+"' quoteId='"+quotes[i].id+"' value='" + quotes[i].quote + "'> user: " + quotes[i].UserId + " quote: " + quotes[i].quote + "</button>";
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
                    $.get("/quotes/roast/" + RoastId, function (quotes) {
        if (quotes) {
            console.log(quotes);
            displayQuotes(quotes)
        }
    });
            }
        });
    }

})

//if the roastee
$(document).on("click", ".winner", function(){
    var id = this.id
    var UserId = $(this).attr("name");
    var quote = $(this).attr("value");
    var quoteId = $(this).attr("quoteId")
    var req = {
        UserId: UserId,
        quote: quote,
        quoteId: quoteId
    }

    //PUT http://localhost:8080/roasts/winner 404 (Not Found)
    $.ajax({
        url: "/roasts/winner/" + id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(req)
    }).done(function (data) {
    })
})

//when game ends... timer runs out
if (user.UserId === roast.roastee) {
    //allow user to pick a quote
    $.get("/quotes/roast/" + RoastId, function (quotes) {
        if (quotes) {
            console.log(quotes);
            getWinner(quotes)
        }
    });
}