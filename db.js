var express = require('express');
var mongoose = require('mongoose');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const mongo_uri = `mongodb+srv://${user}:${pass}@othcluster-pkzmz.gcp.mongodb.net/oth?retryWrites=true&w=majority`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongo_uri);

mongoose.connection.on('connected', function(){
    console.log("Mongoose connection opened to " + mongo_uri);
});

mongoose.connection.on('error', function(err){
    console.log("Mongoose connection error: " + err);
});

mongoose.connection.on('disconnected', function(){
    console.log("Mongoose connection disconnected.");
});

module.exports = mongoose;
