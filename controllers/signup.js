var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('../passportFun');
const User = require('../models/User');

module.exports = (req, res) => {
  passport.authenticate('signup', (err, user, info) => {
    if(user == false){
      res.json({"message": "User already exists"});
    }
    else{
      res.render(path.join(__dirname, "../views/index.ejs"), {"success": true});
    }
  })(req, res);
};
