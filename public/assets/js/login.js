var username = $("#email").val();
var UserId = $("#UserId").val();

window.user = {email: email,
                UserId: UserId}; 

//when login submit button is clicked check to see that username and password are entered
//if user entered username and password, check to see if they are in the data base

//if they are in the database, get the UserId and set to local var userId
//redirect to profile or game page with url param id set to userId

//if they are not in the database, show message that their was an error with 
//username and password verification