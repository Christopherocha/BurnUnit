var user = JSON.parse(sessionStorage.getItem('user'));

console.log(user);

// if(user){
//     $("#profile-url").attr("href", "/users/"+user.profileUrl );
//     $("#startroast-url").attr("href", "/users/"+user.startUrl );

//     console.log($("#profile-url").attr("href"))
//     console.log($("#startroast-url").attr("href"))
// }


//query user table for current user's information this can be done through routes
//this the route should res.json the profile page with the user object


//based on userId query roast table to see how many roasts the user has won
//if they have won a roast save the QuoteID 
//get the number of roasts that the user has initiated

//use QuoteId from roasts to query the quote table and get the winnig quotes