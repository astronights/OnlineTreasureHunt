var express = require('express');
var path = require('path');

var Token = require('../models/Token');

module.exports = (req, res) => {
    const token = req.cookies.token;
    Token.findOne({"tokens": token}, function(err1, user_token){
      if(err1){
        console.log("Error in finding token");
        throw err1;
      }
      else if(!user_token){
        res.render(path.join(__dirname, "../views/index.ejs"), {"success": false});
      }
      else{
          res.render(path.join(__dirname, "../views/index.ejs"), {"success": true});
      }
}
