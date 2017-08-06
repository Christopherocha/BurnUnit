var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res){
    db.User.findAll({include: [db.Roast] }).then(function(data){
        var hbsObject = {users:data};
        res.render("userroute", hbsObject);
    });
});


//using this route to create a temporary roastee in the roastrouts.handlebars
//might not need this in the future
router.get("/roasts", function(req, res){
    db.User.findAll({}).then(function(data){
        var hbsObject = {users:data};
        res.json(hbsObject);
    });
});

router.get("/:id", function(req, res){
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Roast]
    }
    ).then(function(data){
        var hbsObject = {users:data};
        res.render("home", {hbsObject,
            whichPartial: function() {
            return "userroute";
            }
        });
    });
});

router.post("/", function(req, res){
    if(!req.body.name || !req.body.password || !req.body.image){
        console.log("order was not properly completed");
        res.redirect("/users")
    }
    else{
        db.User.create({
            "name": req.body.name,
            "password": req.body.password,
            "image": req.body.image
        }).then( function(dbUser)
        {
            res.redirect("/users");
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
        res.redirect("/users");
      });
});

router.delete("/:id", function(req, res){
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.redirect("/users");
    });
});


module.exports = router;

