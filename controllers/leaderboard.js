var express = require('express');
var path = require('path');
var mongoose = require('../db');
var sorter = require('./utils/sorter');
var User = require('../models/User');

module.exports = (req, res) => {
  User.find({}, (err, users) => {
    if(err){
      throw err;
    }
    else{
      console.log(users);
      res.render(path.join(__dirname, "../views/leaderboard.ejs"), {users: users.sort(sorter("current_level", "level_times"))});
    }
  })

}
