var user = JSON.parse(sessionStorage.getItem('user')); 

if(user){
    generateNav(user.signedIn);
}
else{generateNav(false);}

function generateNav(signedIn){
    if(signedIn === true){
        console.log(user);
        $(".navigation").html(
            '<div class="nav-wrapper"><a href="/" class="brand-logo"><span class="glyphicon glyphicon-fire"></span>burnUnit</a>'
            + '<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>'
            + '<ul class="right hide-on-med-and-down">'
            + '<li><a href="/users/profile/' + user.email + '/' + user.UserId + '">Profile</a></li>'
            + '<li><a href="/users/startroast/' + user.UserId + '">Roast!</a></li>'
            + '<li><a href="/login">Sign Out</a></li></ul>'
            + '<ul class="side-nav" id="mobile-demo">'
            + '<li><a href="/users/profile/{{this.email}}/{{this.id}}">Profile</a></li>'
            + '<li><a href="/users/startroast/{{this.id}}">Roast!</a></li>'
            + '<li><a href="/login">Sign Out</a></li></ul></div>'


        )
    }
    else if(signedIn === false){
        console.log(user);
        $(".navigation").html(
        '<div class="nav-wrapper">'
        +'<a href="/" class="brand-logo">'
        +'<span class="glyphicon glyphicon-fire"></span>burnUnit</a>'			
        +'<a href="#" data-activates="mobile-demo" class="button-collapse">'
        +'<i class="material-icons">menu</i></a>'
		+'<ul class="right hide-on-med-and-down">'
		+'<li><a href="/login">Login</a></li>'
		+'<li><a href="/signup">Sign Up</a></li></ul>'
		+'<ul class="side-nav" id="mobile-demo">'
		+'<li><a href="/login">Login</a></li>'
		+'<li><a href="/signup">Sign Up</a></li></ul></div>'
        )
    }
}