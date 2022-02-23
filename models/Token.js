require("dotenv").config();

const mongoose = require("../db");

const tokenSchema = mongoose.Schema({
  email: String,
  tokens: [String],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Token", tokenSchema, process.env.TOKENS);
