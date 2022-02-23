const mongoose = require('mongoose');

const attemptSchema = mongoose.Schema({
    email: String,
    value: String,
    level: Number
});

module.exports = mongoose.model('Attempt', attemptSchema);