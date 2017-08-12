var express = require("express");

var router = express.Router();

var db = require("../models");


//get quotes

//get all quotes
router.get("/", function(req, res){
    db.Quote.findAll({}).then(function(data){
        var hbsObject = {quotes:data};
        console.log(hbsObject);
        res.render("quoteroute", hbsObject);
    });
});

//get quote by id
router.get("/:id", function(req, res){
    db.Quote.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Roast]
    }).then(function(data){
        var hbsObject = {quote:data};
        res.render("quoteroute", hbsObject);
    });
});

//get quotes by roast
router.get("/roast/:id", function(req, res){
    db.Quote.findAll({
      where: {
          RoastId: req.params.id
      },
      include : [db.Roast, db.User]
    }).then(function(data){
        //var hbsObject = {quotes:data};
        res.json(data);
    });
});

//get quotes by user
router.get("user/:id", function(req, res){
    db.Quote.findAll({
      where: {
          UserId: req.params.id
      },
      include : [db.User]
    }).then(function(data){
        var hbsObject = {quotes:data};
        res.render("quoteroute", hbsObject);
    });
});

//get by wins
router.get("/win", function(req, res){
    db.Quote.findAll({
      where: {
          win: true
      },
      include : [db.User]
    }).then(function(data){
        var hbsObject = {quotes:data};
        res.render("quoteroute", hbsObject);
    });
});

//get quote by user and wins
router.get("/win/:id", function(req, res){
    db.Quote.findAll({
      where: {
          UserId: req.params.id,
          win: true
      },
      include : [db.User]
    }).then(function(data){
        var hbsObject = {quotes:data};
        res.render("quoteroute", hbsObject);
    });
});


//create quote with quote, UserId, RoastId
router.post("/", function(req, res){
    console.log(req.body);
    if(!req.body.quote || !req.body.UserId || !req.body.RoastId){
        console.log("needs quote, userid and roastid");
        res.redirect("/roast")
    }
    else{
        db.Quote.create({
            quote: req.body.quote,
            UserId: req.body.UserId,
            RoastId: req.body.RoastId
        }).then( function(dbQuote)
        {
            res.json(dbQuote);
        });
    }
});


//update quotes

//update quote by id
router.put("/:id", function(req, res){
    db.Quote.update({
        quote: req.body.quote,
        where: {id: req.params.id}
      }).then(function(dbQuote) {
        res.redirect("/quotes");
      });
});

//update quote win status
router.put("/win/:id", function(req, res){
    db.Quote.update({
        win: true,
        where: {id: req.params.id}
      }).then(function(dbQuote) {
        res.redirect("/quotes");
      });
});


//delete quote
router.delete("/:id", function(req, res){
    db.Quote.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuote) {
      res.redirect("/quotes");
    });
});


module.exports = router;