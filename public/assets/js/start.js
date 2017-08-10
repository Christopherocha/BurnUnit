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

})
