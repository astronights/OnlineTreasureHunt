const mongoose = require('../db');

const userSchema = mongoose.Schema({
    email: String,
    token: [String],
    created: {
      type: Date,
      default: Date.now
}});

module.exports = mongoose.model('User', userSchema, 'users');
