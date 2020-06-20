const express = require('express'),
	path = require('path'),
	sorter = require('./utils/sorter'),
	User = require('../models/User');

module.exports = (req, res) => {
	User.find({}).select('username current_level level_times').exec((err, users) => {
		if (err) {
			throw err;
		}
		else {
			// console.log(users);
			res.render(path.join(__dirname, "../views/leaderboard.ejs"), { users: users.sort(sorter("current_level", "level_times")) });
		}
	})

}
