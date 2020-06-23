const path = require('path'),
	Level = require('../models/Level'),
	Token = require('../models/Token'),
	User = require('../models/User'),
	Attempt = require('../models/Attempt'),
	Log = require('../models/Log');

//GET /level/:name
module.exports = async (req, res) => {

	const level_key = req.params.name;
	const token = req.cookies.token;

	//some fucker who is not logged in trying to fuck with the endpoint. Scare them off
	if (!token || token.length != 40){

		res.status(401).send({
			error: "Unauthorized",
			ip: req.ip,
			message: "Your IP has been logged."
		});

		let log = new Log();
		log.ip = req.ip;
	
		if (req.path.length < 100){
			log.path = req.path;
		} else {
			log.path = req.path.substr(0, 100);
		}
	
		log.save();
		return;
	}

	let user_token;

	//Ok its set, but are they legit?
	try {
		user_token = await Token.findOne({tokens: token});
	} catch (e){
		res.status(500).json({
			error: 'Failed to query DB'
		});

		return;
	}

	//fuck off
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

	//sanity check but actually bad programming practice
	try {
		user = await User.findOne({email: user_token.email});
	} catch (e){
		res.status(500).json({
			error: 'Failed to query DB'
		});

		return;
	}

	//this should never happen tbh. Since our tokens dont expire KEK
	if (!user){
		res.status(404).json({
			"error": "User not found"
		});

		return;
	}

	let level;
	
	try {
		level = await Level.findOne({level_key: level_key});
	} catch (e){
		res.status(500).json({
			error: 'Failed to query DB'
		});

		return;
	}

	//What a chomu
	if (!level){
		res.json({
			error: 'Incorrect answer'
		});

		let attempt = new Attempt();
		attempt.email = user.email;
		attempt.value = level_key;
		attempt.level = user.current_level;
		attempt.save();

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
