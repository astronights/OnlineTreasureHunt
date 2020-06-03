var express = require('express');
var path = require('path');
var passport = require('../passportFun');
const User = require('../models/User');

module.exports = (req, res) => {
  passport.authenticate('signup', (err, user, info) => {
    console.log(user);
    console.log(info);
    if(user == false){
      res.json({"message": info.message});
    }
    else{
      res.render(path.join(__dirname, "../views/index.ejs"), {"success": false});
    }
  })(req, res);
};
