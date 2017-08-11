$(document).ready(function () {
    
    var status = "waiting";


    var config = {
        apiKey: "AIzaSyDmgMsEV_DQwOSOWaqUf1cALXQtFkmj_ec",
        authDomain: "burnunit-7cd3d.firebaseapp.com",
        databaseURL: "https://burnunit-7cd3d.firebaseio.com",
        projectId: "burnunit-7cd3d",
        storageBucket: "burnunit-7cd3d.appspot.com",
        messagingSenderId: "393333141750"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var chatData = database.ref("/chatTwo");



    $("#chatSubmit").click(function () {
        event.preventDefault();

        if ($("#textarea1").val() !== "") {

            var message = $("#textarea1").val();

            chatData.push({
                user: user.UserId,
                username: user.username,
                email: user.email,
                message: message
            });

            $("#textarea1").val("");

            // $("#chatMsg").append("<div>" + UserId + ": " + message + "</div>");

        }
    });

    //if data push to database - log to DOM
    chatData.on('child_added', function (snapshot) {
        var msg = snapshot.val();
        displayMsg(msg.username, msg.message);
    });

    function displayMsg(username, message) {
        $('<div />').text(message).prepend($('<em/>').text(username + ': ')).appendTo('#chatMsg');

        // $('#chatBox').scrollTop = $('#chatBox').scrollHeight;
        $("#chatMsg").stop().animate({ scrollTop: $("#chatMsg")[0].scrollHeight}, 1000);
    };
    //load quotes on intervarl
    var nIntervId;

    function updateGame() {
        nIntervId = setInterval(getStatus, 500);
    }

    function endRoast() {
        clearInterval(nIntervId);
    }

    //updateQuotes();


    //check to see that user is stored
    console.log(JSON.parse(sessionStorage.getItem('user')));

    //get user from local storage and save to global user object
    var user = JSON.parse(sessionStorage.getItem('user'));

    console.log(user);

    if (user) {
        $("#profile-url").attr("href", user.profileUrl);
        $("#startroast-url").attr("href", user.startUrl);
    }

    //get the roast id of the roast that the page was rendered with
    var RoastId = $("#RoastId").val();
    //create a global roast object  
    var roast = {
        RoastId: RoastId,
        roastee: "",
        creator: "",
        winner: "",
    };

    if (RoastId) {
        //get the roast info
        //this might not be needed once things are moving smoothly
        $.get("/roasts/find/" + RoastId, function (data) {
            console.log(data)
            if (!data.creator) {
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
        updateQuotes();
        //getQuotes();
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


//get game status and post in display area
 updateGame();   
 //getQuotes();




//get game status
function getStatus(){
    $.get("/roasts/find/" + RoastId, function (data) {
        console.log(data);
        status = data.status;

        // if (data.Participants.length >= 4 && data.status === "waiting") {
        //     $.ajax({
        //         url: "/roasts/status/" + id,
        //         type: "PUT",
        //         data: {status:"playing"},
        //         success: function (data) {
        //             console.log(data);
        //         }
        //     })
        // }

    })

    switch(status){
        case "waiting" : $("#displayQuotes").html("<p>waiting on players</p>");
            break;
        case "playing" : getQuotes();
            break;
        case "over" : displayWinner();
            break;
        default: break;
    }

}

function displayWinner() {
    $.get("/roasts/find/" + RoastId, function (data) {
        console.log(data);
        $("#displayQuotes").html("<h1>Winner!</h1><p> User: " + data.winner + " Quote: " +
        data.quote + "</p>");
    })
    endRoast();
}

//gets the quotes of the current roast and displays them in #displayQuotes <div>
//I want to pass a function into getQuotes so I can use it with displayQuotes 
//and getWinner
function getQuotes() {
    $.get("/quotes/roast/" + RoastId, function (quotes) {
        if (quotes) {
            if(quotes.length > 4){
                getWinner(quotes);
            }

            else{
                console.log(quotes);
                displayQuotes(quotes)
            }
        }
    })
}

//displays all of the quotes for a roast
function displayQuotes(quotes) {
    var displayQuotes = $("#displayQuotes");
    var html = "";
    for (i = 0; i < quotes.length; i++) {
        html += "<p class='quotes'> User: " + quotes[i].UserId + " Quote: " + quotes[i].quote + "</p>";
    }

    }

    //displays buttons for the roastee to choose a winner from
    function getWinner(quotes){
        var displayQuotes = $("#displayQuotes");
        var html = "";
        for(i=0; i<quotes.length; i++){
        // moved the class to <p> instead of <a>
        html += "<p class='winner'><a id='" + quotes[i].RoastId +
        "' user='" + quotes[i].UserId + "' quoteId='" + quotes[i].id + 
        "' value='" + quotes[i].quote + "'> User: " + quotes[i].UserId + 
        " Quote: " + quotes[i].quote + "</a></p>";
        }
    }

    $(document).on("click", "#burn", function () {
        var quote = $("#quote").val();
        var UserId = user.UserId;
        var RoastId = roast.RoastId;

        $("#quote").val("");

        var quoteObj = {
            quote: quote,
            UserId: UserId,
            RoastId: RoastId
        };

        if (!quote || !UserId || !RoastId) {
            console.log("you are missing some deets!")
        }
        else {
            $.post("/quotes", quoteObj, function (data) {
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
    $(document).on("click", ".winner", function () {
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