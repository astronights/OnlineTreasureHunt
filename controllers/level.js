var express = require('express');
var path = require('path');
var Level = require('../models/Level');
var Token = require('../models/Token');
var User = require('../models/User');

module.exports = (req, res) => {
  const level_key = req.params.name;
  const token = req.cookies.token;
  Level.findOne({'level_key': level_key}, function(err, level){
    if(err){
      console.log("Error in finding level");
      throw err;
    }
    else if(!level){
      res.json({"message": "Incorrect answer"});
    }
    else{
      Token.find({"tokens": token}, function(err1, user_token){
        if(err1){
          console.log("Error in finding token");
          throw err;
        }
        else if(!user_token){
          res.json({"message": "User not logged in"});
        }
        else{
          User.findOne({'email': user_token.email}, function(err2, user){
            if(err2){
              console.log("Error in finding user");
              throw err;
            }
            else if(!user){
              res.json({"message": "No such user exists"});
            }
            else{
              if(user.current_level + 1 >= level.level_num){
                if(user.current_level + 1 == level.level_num){
                  User.findByIdAndUpdate(user._id, {
                    "user.current_level": level.level_num
                  }, function(err3, updated_user){
                    if(err){
                      console.log("Error in updating user");
                      throw err;
                    }
                    else{
                      res.render(path.join(__dirname, "../views/level.ejs"), level);
                    }
                  })
                }
                res.render(path.join(__dirname, "../views/level.ejs"), level);

              }
              else{
                res.json({"message": "Incorrect answer"});
              }
            }
          });
        }
      })
    }
  });
}
