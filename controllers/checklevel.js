var express = require('express');
var path = require('path');
var Level = require('../models/Level');
var Token = require('../models/Token');
var User = require('../models/User');


//Check answer

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
          Level.findOne({'level_num': parseInt(req.body.levelnum)+1}, function(err3, level){
            if(err3){
              console.log("Error in getting level");
              throw err3;
            }
            else if(!level){
              res.json({"message": "No level exists (new)"});
            }
            else{
              console.log(level.level_key);
              console.log(req.body.answer);
              if(level.level_key == req.body.answer){
                User.updateOne({"email": user.email},
                               {"current_level": level.level_num},
                  function(err35, newuser){
                    if(err35){
                      console.log("Error in updating user");
                      throw err35;
                    }
                    else{
                        res.redirect('/level');
                    }
                })
              }
              else{
                Level.findOne({'level_num': req.body.levelnum}, function(err4, prev){
                  if(err4){
                    console.log("Error in getting level");
                    throw err4;
                  }
                  else if(!level){
                    res.json({"message": "No level exists (current)"});
                  }
                  else{
                    res.redirect("/level");
                  }
                })
              }

            }
          });
        }
      });
    }
  });
}
