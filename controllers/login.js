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
      return res.render(path.join(__dirname, "../views/index.ejs"),
      {"data": {"success": false, "logged_in": false, "message": "Invalid credentials"}});
    }
    else{
      const user_token = crypto.randomBytes(20).toString('hex');
      Token.findOne({'email': user.email}, (err, token_user)=> {
        if(err){
          console.log("Error in finding token user");
          return res.render(path.join(__dirname, "../views/index.ejs"),
          {"data": {"success": false, "logged_in": false, "message": "Invalid token"}});
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
              return res.render(path.join(__dirname, "../views/index.ejs"),
              {"data": {"success": false, "logged_in": false, "message": "Error in saving token"}});

          }
          console.log('Token Registration succesful');
          res.cookie('token', user_token);
          return res.render(path.join(__dirname, "../views/index.ejs"),
          {"data": {"success": true, "logged_in": true, "message": "Logged in succesfully!"}});
          });
        }
        else{
          Token.findByIdAndUpdate(token_user._id,{
            "$push": {"tokens": user_token}

          }, function(err, updated_user){
              if(err){
                console.log("Error in updating user token");
                return res.render(path.join(__dirname, "../views/index.ejs"),
                {"data": {"success": false, "logged_in": false, "message": "Error in updating token"}});
              }
              else{
                console.log('Token Registration succesful');
                res.cookie('token', user_token);
                return res.render(path.join(__dirname, "../views/index.ejs"),
                {"data": {"success": true, "logged_in": true, "message": "logged in succesfully!"}});
              }
          });
        }
      })

    }
  })(req, res);
};
