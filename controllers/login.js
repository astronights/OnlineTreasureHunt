var express = require('express');
var bcrypt = require('bcrypt');
var path = require('path');
var passport = require('../passportFun');
var crypto = require('crypto');
const User = require('../models/User');

module.exports = (req, res) => {
  passport.authenticate('login', (err, user, info) => {
    if(user == false){
      // req.flash("messages", { "error" : "Invalid username or password" });
      // res.locals.messages = req.flash();
      res.json({"message": "Invalid credentials"});
    }
    else{
      const user_token = crypto.randomBytes(20).toString('hex');
      res.cookie('token', user_token);
      res.render(path.join(__dirname, "../views/index.ejs"), {"success": true});
    }
  })(req, res);
};
