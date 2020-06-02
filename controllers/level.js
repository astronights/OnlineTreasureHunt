var express = require('express');
var path = require('path');
var Level = require('../models/Level');

module.exports = (req, res) => {
  console.log(req.params.name);
  
  const level = req.params.name;

  // GET /level/coffee
  // Get token from cookie
  // Query token table, see if its valid user

  //Not valid -> send error

  //valid -> check if user can access the level. Yes -> render, no -> error
  

  //DB lookup for the data
  res.render(path.join(__dirname, "../views/level.ejs"), {level: req.params.name});
}
