const path = require('path'),
	Level = require('../models/Level'),
	Token = require('../models/Token'),
	User = require('../models/User');
const { json } = require('express');

module.exports = async (req, res) => {

	const level_key = req.params.name;
	const token = req.cookies.token;

	let level;
	
	try {
		level = await Level.findOne({level_key: level_key});
	} catch (e){
		res.status(500).json({
			error: 'Failed to query DB'
		});

		return;
	}

	if (!level){
		res.json({
			error: 'Incorrect answer'
		});

		return;
	}

	let user_token;

	try {
		user_token = await Token.findOne({tokens: token});
	} catch (e){
		res.status(500).json({
			error: 'Failed to query DB'
		});

		return;
	}

	if (!user_token){

		req.session.locals = {
			"data": {
				"success": false,
				"logged_in": false,
				"message": "Invalid token"
			}
		};

		return res.redirect('/home');
	}

	let user;

	try {
		user = await User.findOne({email: user_token.email});
	} catch (e){
		res.status(500).json({
			error: 'Failed to query DB'
		});

		return;
	}

	if (!user){
		res.status(404).json({
			"error": "User not found"
		});

		return;
	}

	if (user.current_level + 1 == level.level_num){
		//They found the answer to the next level
		user.current_level = level.level_num;
		user.level_times.push(Date.now());

		try {
			await user.save();
		} catch (e){
			res.status(500).json({
				error: 'Failed to query DB'
			});
	
			return;
		}

		res.render(path.join(__dirname, '../views/level.ejs'), { level: level});
		return;
	}

	if (user.current_level >= level.level_num){
		//They are accessing a level they've already cleared. Ok buddy.
		res.render(path.join(__dirname, '../views/level.ejs'), { level: level});
		return;
	}

	//If we got here, means it is a CORRECT answer, but of some future level. GG
	res.json({
		error: 'Incorrect answer'
	});
}
