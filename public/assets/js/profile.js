//query user table for current user's information this can be done through routes
//this the route should res.json the profile page with the user object


//based on userId query roast table to see how many roasts the user has won
//if they have won a roast save the QuoteID 
//get the number of roasts that the user has initiated

//use QuoteId from roasts to query the quote table and get the winnig quotes

var user = JSON.parse(sessionStorage.getItem('user'));

console.log(user);


$(document).ready( function(){
    $('.modal').modal();


    $(document).on("click", ".edit-info", function(){
        user.name = $("#newname").val();
        user.username = $("#newusername").val();
        user.email = $("#newemail").val();

        sessionStorage.setItem('user', JSON.stringify(user));
        $.ajax({
            url: "/users/" + user.UserId,
            type: "PUT",
            data: { 
                name: user.name,
                username: user.username,
                email: user.email },
            success: function(){
                $("#username").val(user.username);
                $("#email").val(user.email);
            }
        })
    })
})
