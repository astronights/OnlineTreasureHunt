var express = require('express');
var path = require('path');

var User = require('../models/User');
var Token = require('../models/Token');

//check cookie first on a normal call, see if token exists, valid

module.exports = async (req, res) => {

	const token = req.cookies.token;

	if (req.session.locals && (!token || token == '')) {
		if (typeof req.session.locals.data.token == "string"){
			res.cookie('token', req.session.locals.data.token); //Avoid setting undefined.
		}
		res.render(path.join(__dirname, "../views/index.ejs"), req.session.locals);
		return;
	}

	if (!token || token == '' || token.length != 40){
		//Invalid token
		res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": false } });
		return;
	} else {
		res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": true } });
		return;
	}

	/*

	let user_token;
	
	//Check if token exists

	try {
		user_token = await Token.findOne({tokens: token}).select('email');
	} catch (e){
		res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": false } });
		return;
	}

	if (!user_token){
		res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": false } });
		return;
	}

	let user;

	//Check if user exists

	try {
		user = User.findOne({email: user_token.email}).select('_id');
	} catch (e){
		res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": false } });
		return;
	}

	if (!user){
		res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": false } });
		return;
	}

	res.render(path.join(__dirname, "../views/index.ejs"), { "data": { "success": true } });
	*/
}
