var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.Quote.findAll({}).then(function(data){
        var hbsObject = {quotes:data};
        console.log(hbsObject);
        res.render("quoteroute", hbsObject);
    });
});

router.post("/", function(req, res){
    if(!req.body.quote || !req.body.UserId || !req.body.RoastId){
        console.log("order was not properly completed");
        res.redirect("/quotes")
    }
    else{
        db.Quote.create({
            quote: req.body.quote,
            UserId: req.body.UserId,
            RoastId: req.body.RoastId
        }).then( function(dbQuote)
        {
            res.redirect("/quotes");
        });
    }
});

router.put("/:id", function(req, res){
    db.Quote.update({
        quote: req.body.quote,
        where: {id: req.params.id}
      }).then(function(dbUser) {
        res.redirect("/quotes");
      });
});

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