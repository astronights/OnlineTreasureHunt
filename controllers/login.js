var express = require('express');
var bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = parseInt(process.env.SALTS);

  User.findOne({email: email}, function(err, user){
    if(err){
      console.log("Error in finding email");
      res.status(500).json({message: err.toString()});
    }
    else if(user == null){
      console.log("Email does not exist");
      res.status(401).json({message: "User does not exist"});
    }
    else{
      bcrypt.compare(password, user.password, function(err_match, match){
        if(err_match){
          console.log("Error in matching passwords");
          res.status(500).json({message: err.toString()});
        }
        else{
          if(match){
            console.log("Password matched");
            res.status(200).json(user);
          }
          else{
            console.log("Wrong password");
            res.status(401).json({message: "Wrong password"});
          }
        }
      });
    }
  });
}
