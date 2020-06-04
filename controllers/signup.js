var express = require('express');
var path = require('path');
var passport = require('../passportFun');
const User = require('../models/User');

module.exports = (req, res) => {
  passport.authenticate('signup', (err, user, info) => {
    if(user == false){
      // return res.json({"success": false, "account_made": false, "message": info.message});
      return res.render(path.join(__dirname, "../views/index.ejs"),
      {"data": {"success": false, "account_made": false, "message": info.message}});
    }
    else{
      res.render(path.join(__dirname, "../views/index.ejs"),
      {"data": {"success": false, "account_made": true, "message": info.message}});
    }
  })(req, res);
};
