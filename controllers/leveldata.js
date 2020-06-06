var express = require('express');
var path = require('path');


module.exports = (req, res) => {
  var filepath = ("../level_data/").concat(req.params.name);
  res.sendFile(path.join(__dirname, filepath));
}
