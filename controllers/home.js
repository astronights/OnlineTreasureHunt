var express = require('express');
var path = require('path');

var User = require('../models/User');
var Token = require('../models/Token');

//check cookie first on a normal call, see if token exists, valid

module.exports = (req, res) => {
    if(req.session.locals){
      res.cookie('token', req.session.locals.data.token);
      res.render(path.join(__dirname, "../views/index.ejs"), req.session.locals);
      return;
    }
    else{
      const token = req.cookies.token;
      Token.findOne({"tokens": token}, function(err1, user_token){
        if(err1){
          console.log("Error in finding token");
          throw err1;
        }
        else if(!user_token){
          res.render(path.join(__dirname, "../views/index.ejs"), {"data": {"success": false}});
          return;
        }
        else{
            User.findOne({"email": user_token.email}, function(err2, user){
              if(err2){
                console.log("Error in finding user");
                throw err2;
              }
              else if(!user){
                res.render(path.join(__dirname, "../views/index.ejs"), {"data": {"success": false}});
                return;
              }
              else{
                res.render(path.join(__dirname, "../views/index.ejs"), {"data": {"success": true}});
                return;
              }
            });
        }
      });
    }
}
