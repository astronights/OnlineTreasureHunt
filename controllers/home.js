var express = require('express');
var path = require('path');

var User = require('../models/User');
var Token = require('../models/Token');

module.exports = (req, res) => {
    const token = req.cookies.token;
    Token.findOne({"tokens": token}, function(err1, user_token){
      if(err1){
        console.log("Error in finding token");
        throw err1;
      }
      else if(!user_token){
        res.render(path.join(__dirname, "../views/index.ejs"), {"data": {"success": false}});
      }
      else{
          User.findOne({"email": user_token.email}, function(err2, user){
            if(err2){
              console.log("Error in finding user");
              throw err2;
            }
            else if(!user){
              res.render(path.join(__dirname, "../views/index.ejs"), {"data": {"success": false}});
            }
            else{
              res.render(path.join(__dirname, "../views/index.ejs"), {"data": {"success": true}});
            }
          });
      }
    });
}
