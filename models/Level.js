const mongoose = require('../db');

const userSchema = mongoose.Schema({
    level_id: String,
    level_text: [String],
    level_images: [String],
    level_times: [Date],
    num_solved: Number,
    level_clues: [String]
});

module.exports = mongoose.model('Level', userSchema, 'levels');
