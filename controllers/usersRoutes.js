var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.User.findAll({}).then(function(data){
        var hbsObject = {users:data};
        res.render("index", hbsObject);
    });
});

router.get("/:id", function(req, res){
    db.User.findOne({
        where:{
            id: req.params.id
        }
    }).then(function(data){
        var hbsObject = {users:data};
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res){
    if(!req.body.name || !req.body.password || !req.body.image){
        console.log("order was not properly completed");
        res.redirect("/")
    }
    else{
        db.User.create({
            "name": req.body.name,
            "password": req.body.password,
            "image": req.body.image
        }).then( function(dbUser)
        {
            res.redirect("/");
        });
    }
});

router.put("/:id", function(req, res){
    db.User.update({
        name: req.body.name, 
        password:req.body.password},
        {
            where: {id: req.params.id}
      }).then(function(dbUser) {
        res.redirect("/");
      });
});

router.delete("/:id", function(req, res){
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.redirect("/");
    });
});


module.exports = router;

