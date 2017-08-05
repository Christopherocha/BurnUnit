var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.Roast.findAll({}).then(function(data){
        var hbsObject = {roasts:data};
        console.log(hbsObject);
        res.render("roastroute", hbsObject);
    });
});

router.get("/", function(req, res){
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Roast.findAll({
      where: {query},
      include : [db.User]
    }).then(function(data){
        var hbsObject = {roasts:data};
        res.render("roastroute", hbsObject);
    });
});

router.get("/", function(req, res){
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


router.post("/:id", function(req, res){
    if(!req.body.roast || !req.body.participants){
        console.log("needs more info to create roast");
        res.redirect("/roasts")
    }
    else{
        db.Roast.create({
            UserId:req.params.id,
            roast:req.body.roast,
            participants:req.body.participants
        }).then( function(dbRoast)
        {
            res.redirect("/roasts");
        });
    }
});


//Roast in db 
// id, winner(association with users table), winning text, participants..maybe  
router.put("/:id", function(req, res){
    db.Roast.update({
        winner: req.body.winner,
        post: req.body.post, 
        participants: req.body.participants},
        {
            where: {id: req.params.id}
      }).then(function(dbRoast) {
        res.redirect("/roasts");
      });
});

router.put("/winner/:id", function(req, res){
    db.Roast.update({
        winner: req.body.winner,
        post: req.body.post},
        {
            where: {id: req.params.id}
      }).then(function(dbRoast) {
        res.redirect("/roasts");
      });
});

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
