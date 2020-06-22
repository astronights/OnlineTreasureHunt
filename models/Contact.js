const mongoose = require('./db');

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
});

module.exports = mongoose.model('Contact', contactSchema);