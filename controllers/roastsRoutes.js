var express = require("express");

var router = express.Router();

var db = require("../models");


//get roasts

//get all roasts and render
router.get("/", function(req, res){
    db.Roast.findAll({}).then(function(data){
        var hbsObject = {roasts:data};
        console.log(hbsObject);
        res.render("partials/roast/roasts", hbsObject);
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
        var hbsObject = {roasts:data};
        res.render("roastroute", hbsObject);
    });
});

//get roasts by winner
router.get("/:id", function(req, res){
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
router.get("/:id", function(req, res){
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
router.get("/:id", function(req, res){
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

//update roastee when game is a max capacity or is force started
router.put("roastee/:id", function(req, res){
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
router.put("winner/:id", function(req, res){
    db.Roast.update(
        {
            winner: req.body.winner,
            quote: req.body.quote},
        {
            where: {id: req.params.id}
      }).then(function(dbRoast) {
        res.redirect("/roasts");
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
