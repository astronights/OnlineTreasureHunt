var express = require('express');
var path = require('path');

module.exports = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
}
