window.RoastId;

if(!RoastId){
    $.get("/roasts", function(data) {
        if(data[data.length-1].winner == null){
            window.RoastId = data[data.length-1].id;
        }
        else{
            console.log("there is no roast started");
        }
    } )
}