const mongoose = require('../db');

const logSchema = mongoose.Schema({
    path: String,
    ip: String
});

module.exports = mongoose.model('Log', logSchema);