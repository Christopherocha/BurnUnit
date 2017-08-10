var express = require("express");

var router = express.Router();


router.get("/", function(req, res){
    res.render("index");
});

router.get("/login", function(req, res){
    res.render("partials/login");
});

router.get("/signup", function(req, res){
    res.render("partials/user/createUser");
});

router.get("/profile", function(req, res){
    res.render("partials/profile");
});

router.get("/roast", function(req, res){
    res.render("partials/roast/roast");
});

router.get("/roaststats", function(req, res){
    res.render("partials/roast/roaststats");
});

module.exports = router;