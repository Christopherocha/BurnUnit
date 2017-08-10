$(document).ready(function () {

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
    var chatData = database.ref("/chat");
    var email = $("#email").attr("value");
    var UserId = $("#UserId").attr("value");


    $("#profile").attr("href", )
    var user = {
        email: email,
        UserId: UserId
    }

    localStorage.setItem('user', JSON.stringify(user));
    
    $.get("/roasts/", function(data){
        if(data){
            console.log(data);
            var roastButtons = "";
            var stillRoasting = [];
            for(i=0; i<data.length; i++){
                if(data[i].stillRoasting === true){
                    roastButtons += "<form class='create-update-form' action='/roasts/" + data[i].id + "' method='GET'>"+
                    "<button type='submit' class='btn waves-effect waves-light btn-large join-btn'"+
                    " id='" + data[i].id + "'><span>Join Roast " + data[i].id + "</span></button></form>";
                }
            }

            $("#current-roasts").html(roastButtons);
        }

    })


    $(document).on("click", "#create-roast", function(){

    })


    $("#chatSubmit").click(function () {
        event.preventDefault();

        if ($("#textarea1").val() !== "") {

            var message = $("#textarea1").val();

            chatData.push({
                user: UserId,
                email: email,
                message: message
            });

            $("#textarea1").val("");

            // $("#chatMsg").append("<div>" + UserId + ": " + message + "</div>");

        }
    });

    $("#chatSubmit").keypress(function (e) {
        event.preventDefault();

        if (e.which === 13 && $("#textarea1").val() !== "") {

            var message = $("#textarea1").val();

            chatData.push({
                user: UserId,
                email: email,
                message: message
            });

            $("#textarea1").val("");

            // $("#chatMsg").append("<div>" + UserId + ": " + message + "</div>");
        }
    });


    chatData.on('child_added', function (snapshot) {
        var msg = snapshot.val();
        displayMsg(msg.user, msg.message);
    });

    function displayMsg(userId, message) {
        $('<div />').text(message).prepend($('<em/>').text(userId + ': ')).appendTo('#chatMsg');

        // $('#chatBox').scrollTop = $('#chatBox').scrollHeight;
        $("#chatMsg").stop().animate({ scrollTop: $("#chatMsg")[0].scrollHeight}, 1000);
    };


})
