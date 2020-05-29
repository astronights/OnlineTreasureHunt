var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mime = require('mime');
require('dotenv').config();

var routes = require('./routes');

var app = express();
var http = require('http').Server(app);

const mimeTypes = {
  'text/css': ['css'],
  'application/javascript': ['js']
}

app.use(express.static("public/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

http.listen(3000, function(){
    console.log("Server started on port 3000");
});
