var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.Roast.findAll({}).then(function(data){
        var hbsObject = {roasts:data};
        console.log(hbsObject);
        res.render("index", hbsObject);
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
        res.render("index", hbsObject);
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
        res.render("index", hbsObject);
    });
});


router.post("/", function(req, res){
    if(!req.body.roast || !req.body.participants){
        console.log("needs more info to create roast");
        res.redirect("/")
    }
    else{
        db.Roast.create({
            "roast": req.body.roast,
            "participants": req.body.participants
        }).then( function(dbRoast)
        {
            res.redirect("/");
        });
    }
});


//Roast in db 
// id, winner(association with users table), winning text, participants..maybe  
router.put("/:id", function(req, res){
    db.Roast.update({
        winner: req.body.winner,
        winning_post: req.body.post, 
        participants: req.body.participants},
        {
            where: {id: req.params.id}
      }).then(function(dbRoast) {
        res.redirect("/");
      });
});

router.delete("/:id", function(req, res){
    db.Roast.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRoast) {
      res.redirect("/");
    });
});


module.exports = router;
