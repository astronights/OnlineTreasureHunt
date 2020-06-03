var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('flash');

require('dotenv').config();

var routes = require('./routes');
require('./passportFun');

var app = express();
var http = require('http').Server(app);

app.set('view engine', 'ejs');

const mimeTypes = {
  'text/css': ['css'],
  'application/javascript': ['js']
}

app.use(express.static("public/"));
//
// app.use(session({ cookie: { maxAge: 60000 },
//                   secret: process.env.SESSION_SECRET,
//                   resave: false,
//                   saveUninitialized: false}));
//
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(require('flash')());

app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//     res.locals.messages = require('express-messages')(req, res);
//     // next();
// });

// app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

http.listen(3000, function(){
    console.log("Server started on port 3000");
});
