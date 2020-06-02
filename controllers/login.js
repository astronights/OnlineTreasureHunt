var express = require('express');
// var bcrypt = require('bcrypt');
var passport = require('../passportFun');
const crypto = require('crypto');
const User = require('../models/User');

module.exports = (req, res) => {
  console.log("Inside login route");
  passport.authenticate('login', (err, user, info) => {
    console.log(user);
    console.log('abc');
    const token = crypto.randomBytes(20).toString('hex');

    //Clear existing tokens
    //Set new token
    res.cookie('token', token);

    //Create entry in token table to link a user with a cookie
    res.send('.');

    

    /*

    /level1

    {
  display_name: [ 'Shubhankar', 'Agrawal' ],
  level_times: [],
  _id: 5ecfff1484c4024cb8de6c2d,
  username: 'astronights',
  email: 'agshubhankar@gmail.com',
  password: '$2b$07$v2NdGH6KMKlX6Kh9nZfQqeYtfwAKwqVV79rdeiEsRJFI5hUzIYZSu',
  current_level: 0,
  created: 2020-05-28T18:12:36.856Z,
  __v: 0
}
    */

  })(req, res);
};
