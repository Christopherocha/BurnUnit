var express = require("express");

var router = express.Router();

var db = require("../models");
var orm = require('../config/orm')

//using this route to create a temporary roastee in the roastrouts.handlebars
//might not need this in the future
router.get("/roasts", function(req, res){
    db.User.findAll({}).then(function(data){
        var hbsObject = {users:data};
        res.json(hbsObject);
    });
});


//get users

//get all users
router.get("/", function(req, res){
    db.User.findAll({include: [db.Roast] }).then(function(data){
        var hbsObject = {users:data};
        res.render("partials/user/users", hbsObject);
    });
});

//get users by id
router.get("/:id", function(req, res){
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Roast]
    }
    ).then(function(data){
        var hbsObject = {users:data};
        res.json(hbsObject);
    });
});

//get user by name
router.get("/:name", function(req, res){
    db.User.findOne({
      where: {
        name: req.params.name
      },
      include: [db.Roast]
    }
    ).then(function(data){
        var hbsObject = {users:data};
        res.json(hbsObject);
    });
});

//get user by username
router.get("/:username", function(req, res){
    db.User.findOne({
      where: {
        username: req.params.username
      },
      include: [db.Roast]
    }
    ).then(function(data){
        var hbsObject = {users:data};
        res.json(hbsObject);
    });
});


//get user by username and password
//use for login

router.post("/login", (req, res) => {
    var email = req.body.email,
        password = req.body.password;

    db.User.findOne({
        where:
        { email: email, password: password },
        include: [db.Roast]
    }).then(function (user) {
        console.log("selected user: " + user);
        if (!user) {
            res.redirect('/login');
        } else {
            //check out using sessions to check the user status
            //req.session.user = user.dataValues;
            var hbsObject = { user: user };
            res.render("partials/profile", hbsObject);
        }
    });
});


// router.get("/login", function(req, res){
//     console.log("req.body: ", req.body)
//     db.User.findOne({
//       where: {
//         username: req.body.name,
//         password:req.body.password
//       },
//       include: [db.Roast]
//     }
//     ).then(function(data){
//         console.log(data);
//         if(data){
            
//             var hbsObject = {user:data};
//             res.render("partials/profile", hbsObject);
            
//         }
//     });
// });

//create a user with name, username, password, image
router.post("/", function(req, res){
    //must input name, username, password, image
    //******maybe this could be refactored to a more concise format */
    if(!req.body.name.length > 2 || !req.body.username.length > 2 || !req.body.password.length > 7 || !req.body.image.length > 0){
        console.log("order was not properly completed");
        res.redirect("/users")
    }
    else{
        db.User.create({
            "name": req.body.name,
            "password": req.body.password,
            "username": req.body.username,
            "email": req.body.email,
            "image": req.body.image,
            "about": req.body.about,
            "location": req.body.location
        }).then( function(dbUser)
        {
            // console.log(dbUser.dataValues)
            orm.userCreate(dbUser.dataValues);
            res.redirect("/login");
        });
    }
});

//update users
//update name and password
router.put("n/pw/:id", function(req, res){
    db.User.update({
        //can I user req.body here to update any parameters passed?
        name: req.body.name, 
        password:req.body.password},
        {
            where: {id: req.params.id}
      }).then(function(dbUser) {
        res.redirect("/users");
      });
});

//update image
router.put("image/:id", function(req, res){
    db.User.update({
        image: req.body.image},
        {
            where: {id: req.params.id}
      }).then(function(dbUser) {
        res.redirect("/users");
      });
});

//delete user
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

