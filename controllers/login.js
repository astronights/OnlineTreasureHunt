var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('../passportFun');
const User = require('../models/User');

module.exports = (req, res) => {
  console.log("Inside login route");
  passport.authenticate('login', (err, user, info) => {
    console.log(user);
  })(req, res);
};
