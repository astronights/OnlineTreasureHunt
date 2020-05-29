var express = require('express');
var bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  const names = [req.body.fname, req.body.lname];
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const saltRounds = parseInt(process.env.SALTS);

  User.findOne({email: email}, function(err, user){
    if(err){
      console.log("Could not check email");
      res.status(404).json({message: err.toString()});
    }
    else if(user != null){
      console.log("User already exists");
      res.status(409).json({message: "User already exists"});
    }
    else{
      bcrypt.genSalt(saltRounds, function(err_salt, salt) {
        if(err_salt){
          console.log("Could not generate salt");
          res.status(500).json({message: err_salt.toString()})
        }
        else{
          bcrypt.hash(password, salt, function(err_hash, hash) {
            if(err_hash){
              console.log("Password could not be hashed");
              res.status(500).json({message: err_hash.toString()});
            }
            else{
              User.create(
                {
                  display_name: names,
                  username: username,
                  email: email,
                  password: hash,
                  current_level: 0,
                },
                function(err, user){
                  if(err){
                    res.json(err)
                  }
                  else{
                    res.status(201).json(user);
                  }
                }
              );
            }
          });
        }
      });
    }
  });
}
