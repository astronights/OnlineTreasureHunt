var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('../passportFun');
const User = require('../models/User');

module.exports = (req, res) => {
  passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/home',
    failureFlash : true
  });
}
