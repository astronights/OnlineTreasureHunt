var express = require('express');

module.exports = (req, res) => {
  res.sendFile( "../views/index.html", {root: __dirname});
}
