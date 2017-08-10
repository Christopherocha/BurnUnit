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

    window.user = {
        email: email,
        UserId: UserId
    }

    localStorage.setItem('user', JSON.stringify(window.user));

    if (window.user) {
        console.log(window.user);
        console.log(JSON.parse(localStorage.getItem('user')))
    }
    else {
        console.log("no window.user")
    }

    $("#chatSubmit").click(function () {
        event.preventDefault();

        if ($("#textarea1").val() !== "") {

            var message = $("#textarea1").val();

            chatData.push({
                user: UserId,
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

        $('#chatBox')[0].scrollTop = $('#chatBox')[0].scrollHeight;
    };


})
