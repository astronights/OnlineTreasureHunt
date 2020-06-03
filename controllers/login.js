var express = require('express');
var path = require('path');
var passport = require('../passportFun');
var crypto = require('crypto');
const User = require('../models/User');
const Token = require('../models/Token');

module.exports = (req, res) => {
  passport.authenticate('login', (err, user, info) => {
    if(user == false){
      // req.flash("messages", { "error" : "Invalid username or password" });
      // res.locals.messages = req.flash();
      res.json({"message": "Invalid credentials"});
    }
    else{
      const user_token = crypto.randomBytes(20).toString('hex');
      Token.findOne({'email': user.email}, (err, token_user)=> {
        if(err){
          console.log("Error in finding token user");
          throw err;
        }
        else if (!token_user){
          var token = new Token();
          token.email = user.email;
          if(token.tokens === undefined || token.tokens.length == 0){
            token.tokens = [user_token];
          }
          else{
            token.tokens.push(user_token);
          }
          token.save(function(err) {
            if (err){
              console.log('Error in Saving token: '+err);
              throw err;

          }
          console.log('Token Registration succesful');
          res.cookie('token', user_token);
          res.render(path.join(__dirname, "../views/index.ejs"), {"success": true});
          });
        }
        else{
          Token.findByIdAndUpdate(token_user._id,{
            "$push": {"tokens": user_token}
          }, function(err, updated_user){
              if(err){
                console.log("Error in updating user token");
                throw err;
              }
              else{
                console.log('Token Registration succesful');
                res.cookie('token', user_token);
                res.render(path.join(__dirname, "../views/index.ejs"), {"success": true});
              }
          });
        }
      })

    }
  })(req, res);
};
