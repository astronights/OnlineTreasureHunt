var express = require("express");
var path = require("path");
require("dotenv").config();

var Level = require("../models/Level");

module.exports = (req, res) => {
  var details = req.body;

  if (details.auth != process.env.SESSION_SECRET) {
    res
      .status(401)
      .json({ data: "You are not authorized to perform this action" });
    return;
  } else {
    var newLevel = new Level();
    newLevel.level_key = details.lkey;
    newLevel.level_num = details.lnum;
    newLevel.level_title = details.ltitle;
    newLevel.level_text = details.ltext.split(/\r\n/);
    newLevel.level_hidden = details.lhiddentext.split(/\r\n/);
    newLevel.level_clues = details.lhint.split(/\r\n/);
    newLevel.level_favicon = req.files
      .filter((item) => item.fieldname == "favicon")
      .map((img) => img.path)[0];
    newLevel.level_images = req.files
      .filter((item) => item.fieldname == "images")
      .map((img) => img.path);
    newLevel.level_extras = req.files
      .filter((item) => item.fieldname == "extras")
      .map((img) => img.path);
    console.log(newLevel);
    newLevel.save(function (err) {
      if (err) {
        console.log("Error in saving to model");
        req.session.addlevel = { success: false };
        res.redirect("/addlevel");
        return;
      } else {
        console.log("Level added");
        req.session.addlevel = { success: true };
        res.redirect("/addlevel");
        return;
      }
    });
    //Save new level
  }
};
