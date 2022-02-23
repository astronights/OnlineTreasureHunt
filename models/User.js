require("dotenv").config();

const mongoose = require("../db");

const userSchema = mongoose.Schema({
  display_name: [String],
  email: String,
  username: String,
  password: String,
  current_level: Number,
  level_times: [Date],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema, process.env.USERS);
