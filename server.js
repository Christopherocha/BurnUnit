var express = require("express");
var bodyParser = require("body-parser");
var override = require("method-override");
var path = require("path");
var hb = require("express-handlebars");


var port = 3000;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(override("_method"));
app.engine("handlebars", hb({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var usersRoutes = require("./controllers/usersApiRoutes.js");
var roastRoutes = require("./controllers/roastsApiRoutes.js");

app.use("/users", usersRoutes);
app.use("/roasts", roastRoutes)

app.listen(port);