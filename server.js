var express = require("express");
var bodyParser = require("body-parser");
var override = require("method-override");
var path = require("path");
var hb = require("express-handlebars");
var db = require("./models");

var port = 8080;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(override("_method"));
app.engine("handlebars", hb({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var usersRoutes = require("./controllers/usersRoutes.js");
var roastRoutes = require("./controllers/roastsRoutes.js");

app.use("/users", usersRoutes);
app.use("/roasts", roastRoutes)

db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});