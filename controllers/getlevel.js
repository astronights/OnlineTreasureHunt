var express = require('express');
var path = require('path');
var Level = require('../models/Level');
var Token = require('../models/Token');
var User = require('../models/User');

module.exports = (req, res) => {
  const token = req.cookies.token;
  Token.findOne({"tokens": token}, function(err, user_token){
    if(err){
      console.log("Error in finding token");
      throw err;
    }
    else if(!user_token){
      req.session.locals = {"data": {"success": false,
                                     "logged_in": false,
                                     "message": "Invalid token"}};
      return res.redirect('/home');
    }
    else{
      User.findOne({'email': user_token.email}, function(err2, user){
        console.log(token);
        console.log(user_token.email);
        if(err2){
          console.log("Error in finding user");
          throw err2;
        }
        else if(!user){
          res.json({"message": "No such user exists"});
        }
        else{
          Level.findOne({'level_num': user.current_level}, function(err3, level){
            if(err3){
              console.log("Error in getting level");
              throw err3;
            }
            else if(!level){
              res.json({"message": "No level exists"});
            }
            else{
              var new_url = '/levels/' + level.level_key;
              res.redirect(new_url);
            }
          });
        }
      });
    }
  });
}
