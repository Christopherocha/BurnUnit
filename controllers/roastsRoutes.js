var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.Roast.findAll({}).then(function(data){
        var hbsObject = {roasts:data};
        console.log(hbsObject);
        res.render("roast", hbsObject);
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
        res.render("roast", hbsObject);
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
        res.render("roast", hbsObject);
    });
});


router.post("/", function(req, res){
    if(!req.body.roast || !req.body.participants){
        console.log("needs more info to create roast");
        res.redirect("/roasts")
    }
    else{
        console.log(req.body);
        db.Roast.create(req.body).then( function(dbRoast)
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
