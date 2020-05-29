var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('../passportFun');
const User = require('../models/User');

module.exports = (req, res) => {
  passport.authenticate('login', {
    successRedirect: '/level',
    failureRedirect: '/home',
    failureFlash : true
  });
}
