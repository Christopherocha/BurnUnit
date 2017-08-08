var firebase = require('firebase-admin');
var user = ('../controllers/usersRoutes');
var roast = ('../controllers/roastsRoutes');

var database = firebase.database();

var firebaseQueries = {
    userCreate: function(user) {
        console.log(user)//.name + "\n" + user.password)
        var idConvert = JSON.stringify(user.id);
        firebase.auth().createUser({
            uid: idConvert,
            email: user.name + '@gmail.com',
            password: user.password
        })
        .then(function(user) {
            console.log("created account")
        })
        .catch(function(err){
            console.log(err);
        })
    },
    userLogin: function(user){
        firebase.auth().signInWithEmailAndPassword(user.email, user.pwd).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error);
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
var ref = firebase.database().ref('/roasts');
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
});
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


