const crypto = require('crypto'),
	User = require('../models/User'),
	Token = require('../models/Token'),
	bcrypt = require("bcryptjs");

module.exports = async (req, res) => {

	const { email, password } = req.body;

	const setLocals = (success, logged_in, token, message) => {
		req.session.locals = {
			data: {
				success: success,
				logged_in: logged_in,
				token: token,
				message: message
			}
		};
	}

	if (!email || !password) {
		setLocals(false, false, '', "Incorrect credentials");
		res.redirect('/home');
		return;
	}

	let user;

	try {
		user = await User.findOne({email: email});
	} catch (e){
		setLocals(false, false, '', "Internal Server Error");
		res.redirect('/home');
		return;
	}

	if (!user){
		setLocals(false, false, '', "User not found");
		res.redirect('/home');
		return;
	}

	if (!bcrypt.compareSync(password, user.password)){
		//Wrong password
		setLocals(false, false, '', "User not found"); //Better than saying *if* email is wrong or password
		res.redirect('/home');
		return;
	}

	//If we got here, the user checked out. GG
	const user_token = crypto.randomBytes(20).toString('hex');

	try {
		await Token.updateOne(
			{
				email: user.email
			},
			{
				$push: {tokens: user_token}
			},
			{
				upsert: true //Create if not exist
			}
		);
	} catch (e){
		setLocals(false, false, '', "Error in saving token");
		res.redirect('/home');
		return;
	}

	setLocals(true, true, user_token, "Logged in successfully!");
	res.redirect('/home');
	return;
};
