const mongoose = require('../db');

const userSchema = mongoose.Schema({
    level_num: Number,
    level_key: String,
    level_title: String,
    level_text: [String],
    level_images: [String],
    level_favicon: String,
    level_times: [{
      user_id: String,
      user_time: Date,
    }],
    num_solved: Number,
    level_clues: [String],
    level_hidden: [String],
    level_extras: [String]
});

module.exports = mongoose.model('Level', userSchema, 'levels');
