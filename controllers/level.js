var express = require('express');
var path = require('path');
var Level = require('../models/Level');

module.exports = (req, res) => {
  res.render(path.join(__dirname, "../views/level.ejs"), {level: ""});
}
