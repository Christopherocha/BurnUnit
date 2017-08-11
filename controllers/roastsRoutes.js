var express = require("express");

var router = express.Router();

var db = require("../models");


//get roasts

//get all roasts and return json
router.get("/", function(req, res){
    db.Roast.findAll({}).then(function(data){
        var hbsObject = {roasts:data};
        console.log(hbsObject);
        res.json(data);
    });
});

//get all roasts and render
router.get("/stats", function(req, res){
    db.Roast.findAll({}).then(function(data){
        var hbsObject = {roasts:data};
        console.log(hbsObject);
        res.render("partials/roast/roaststats", hbsObject);
    });
});

//get roasts by id
router.get("/:id", function(req, res){
    db.Roast.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(data){
        var hbsObject = {roast:data};
        console.log (hbsObject);
        res.render("partials/roast/roast", hbsObject);
    });
});

router.get("/find/:id", function(req, res){
    db.Roast.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Participant]
    }).then(function(data){
        var hbsObject = {roast:data};
        console.log (hbsObject);
        res.json(data);
    });
});

//get roasts by winner
router.get("/winner/:id", function(req, res){
    db.Roast.findAll({
      where: {
          winner: req.params.id
      },
      include : [db.User]
    }).then(function(data){
        var hbsObject = {roasts:data};
        res.render("roastroute", hbsObject);
    });
});

//get roasts by roastee
router.get("/roastee/:id", function(req, res){
    db.Roast.findAll({
      where: {
          roastee: req.params.id
      },
      include : [db.User]
    }).then(function(data){
        var hbsObject = {roasts:data};
        res.render("roastroute", hbsObject);
    });
});

//get roasts by creator of roast
router.get("/creator/:id", function(req, res){
    db.Roast.findAll({
      where: {
          UserId: req.params.id
      },
      include : [db.User]
    }).then(function(data){
        var hbsObject = {roasts:data};
        res.render("roastroute", hbsObject);
    });
});


//create a roast with the creator's id
router.post("/:id", function(req, res){
    if(!req.params.id){
        console.log("needs UserId");
        res.redirect("/roasts")
    }
    else{
        db.Roast.create({
            UserId:req.params.id
        }).then( function(dbRoast)
        {
            console.log("creating roast");
            var hbsObject = {roast:dbRoast}
            res.render("partials/roast/roast", hbsObject);
        });
    }
});

//update roasts
router.post("/join/:id/:username", function(req, res){
    db.Participant.create({
        RoastId: req.params.id,
        username: req.params.username
    }).then(function(dbPart){
        res.json(dbPart)

    })
} )

//update roastee when game is a max capacity or is force started
router.put("/roastee/:id", function(req, res){
    db.Roast.update(
        {
            roastee: req.body.roastee
        },
        {
            where: {id: req.params.id}
    }).then(function(dbRoast) {
        res.redirect("/roasts");
    });
});

//update winner and winning quote ids at the end of game
router.put("/winner/:id", function(req, res){
    console.log(req.body)
    db.Roast.update(
        {
            winner: req.body.winner,
            quote: req.body.quote,
            quoteId: req.body.quoteId,
            status: req.body.status},
        {
            where: {id: req.params.id}
      }).then(function(dbRoast) {
          console.log(dbRoast);
        res.json(dbRoast);
      });
});

//update status 
router.put("/status/:id", function(req, res){
    console.log(req.body)
    db.Roast.update(
        {
            roastee:req.body.roastee,
            status:req.body.status},
        {
            where: {id: req.params.id}
      }).then(function(dbRoast) {
          console.log(dbRoast);
        res.json(dbRoast);
      });
});


//delete roast by id
router.delete("/:id", function(req, res){
    db.Roast.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRoast) {
      res.redirect("/roasts");
    });
});


module.exports = router;
