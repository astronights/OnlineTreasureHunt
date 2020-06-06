var express = require('express');
var path = require('path');


module.exports = (req, res) => {
  res.render(path.join(__dirname, "../views/error.ejs"));
}
