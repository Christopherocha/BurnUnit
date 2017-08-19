var express = require("express");
var bodyParser = require("body-parser");
var override = require("method-override");
var path = require("path");
var hb = require("express-handlebars");
var db = require("./models");


var admin = require("firebase-admin");
var serviceAccount = require("./config/burnunit-7cd3d-firebase-adminsdk-s1mo7-c6af3fae0d");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://burnunit-7cd3d.firebaseio.com"
});

var database = admin.database();

var firebase = require('firebase');
var config = require('./config/fbConfig');

firebase.initializeApp(config);
var auth = firebase.auth();

var port = process.env.PORT || 8080;

var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

var handleClient = function (socket) {
    // we've got a client connection
    socket.emit("chat message", {user: "nodesource", text: "Hello, world!"});
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(override("_method"));
app.engine("handlebars", hb({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/routes.js");
var usersRoutes = require("./controllers/usersRoutes.js");
var roastsRoutes = require("./controllers/roastsRoutes.js");
var quotesRoutes = require("./controllers/quotesRoutes.js");

app.use("/", routes);
app.use("/users", usersRoutes);
app.use("/roasts", roastsRoutes);
app.use("/quotes", quotesRoutes);


//removed force : true in .sync({force:true}) to keep the information inserted in the table
db.sequelize.sync().then(function() {
  server.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});
  console.log('connected');

  socket.on('chat message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});