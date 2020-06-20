const express = require('express'),
	path = require('path'),
	Level = require('../models/Level'),
	Token = require('../models/Token'),
	User = require('../models/User');

module.exports = async (req, res) => {

	const setLocals = (success, logged_in, message) => {
		req.session.locals = {
			data: { success, logged_in, message}
		};
	}

	const token = req.cookies.token;


	if (!token || token.length != 40) {
		setLocals(false, false, "Invalid Token. Please log in.");
		res.redirect('/home');
		return;
	}

	let user_token;

	try {
		user_token = await Token.findOne({tokens: token}).select('email');
	} catch(e){
		setLocals(false, false, "Internal Server Error");
		res.redirect('/home');
		return;
	}

	if (!user_token){
		console.log('notfound');
		//This means they *did* specify a token, but it is definitely wrong. So we clear that cookie
		res.clearCookie('token');
		setLocals(false, false, "Invalid Token. Please log in.");
		//Now the redirect does not have a cookie.
		res.redirect('/home');
		return;
	}

	//Token Valid. Find associated user
	let user;

	try {
		user = await User.findOne({email: user_token.email}).select('current_level');
	} catch (e){
		setLocals(false, false, "Internal Server Error");
		res.redirect('/home');
		return;
	}

	if (!user){
		console.log(`Shits fucked up.`);
		setLocals(false, false, "User not found");
		res.redirect('/home');
		return;
	}

	let level;

	try {
		level = await Level.findOne({level_num: user.current_level}).select('level_key');
	}  catch (e){
		setLocals(false, false, "Internal Server Error");
		res.redirect('/home');
		return;
	}

	if (!level){
		console.log(`Shits fucked up.`);
		setLocals(false, false, "Level not found");
		res.redirect('/home');
		return;
	}

	const new_url = `/levels/${level.level_key}`;
	res.redirect(new_url);
}
