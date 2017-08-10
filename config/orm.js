var admin = require('firebase-admin');
var firebase = require('firebase');
var user = ('../controllers/usersRoutes');
var roast = ('../controllers/roastsRoutes');

var firebaseQueries = {
    userCreate: function(user) {
        var idConvert = JSON.stringify(user.id);

        admin.auth().createUser({
            uid: idConvert,
            email: user.email,
            password: user.password,
        })
        .then(function(user) {
            console.log("created account")
        })
        .catch(function(err){
            console.log(err);
        })
    },
    userLogin: function(email, pwd){
        firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then(function(user){
            console.log(user.uid);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error);
        });
    },
    sendPwdReset: function(email) {
        admin.auth().sendPasswordResetEmail(email)
        .then(function() {
        // Email sent.
        }).catch(function(error) {
        // An error happened.
        });
    },
    createRoast: function(num) {
        var postData = {
            members: num
        }

        var postKey = database.ref("/roasts").push(postData).key;
    }
}
//  On value DB change command to feed content to DOM
// var ref = firebase.database().ref('/roasts');
// ref.on("value", function(snapshot) {
//     console.log(snapshot.val());
// });
// End value change update
module.exports = firebaseQueries;

//  Create account logic
function validatePwd (pwd1, pwd2) {
    if (pwd1 !== pwd2) {
        return false;
    } else {
        return true;
    }
}

// $("#pwd2").on("blur", function() {
//     var pwd1 = $("#pwd1").text();
//     var pwd2 = $("#pwd2").text();
    
//     if (validatePwd(pwd1, pwd2)){
//         $("#createAcct").prop("disabled", false);
//     }
// })
//  End create logic


