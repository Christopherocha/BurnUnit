$(document).ready(function(){
    
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
})
