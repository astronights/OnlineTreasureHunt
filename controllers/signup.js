const bcrypt = require("bcryptjs"),
	User = require('../models/User');

module.exports = async (req, res) => {

	const setLocals = (success, account_made, message) => {
		req.session.locals = {
			data: {
				success: success,
				account_made: account_made,
				message: message
			}
		};
	}

	const { email, password, username, fname, lname } = req.body;

	if (!email || !password || !username || !fname || !lname){
		setLocals(false, false, "Invalid form parameters.");
		res.redirect('/home');
		return;
	}

	if (email == '' || password == '' || username == '' || fname == '' || lname == ''){
		setLocals(false, false, "Invalid form parameters.");
		res.redirect('/home');
		return;
	}

	//TODO: Email based domain check

	let user_exist = null;

	try {
		user_exist = await User.findOne(
			{
				$or: [
					{ email: email},
					{ username: username}
				]
			}
		);
	} catch (e){
		console.log(e);
		setLocals(false, false, "Internal Server Error");
		res.redirect('/home');
		return;
	}

	if (user_exist){
		
		if (user_exist.email == email){
			setLocals(false, false, "A User with that Email already exists.");
			res.redirect('/home');
			return;
		}

		if (user_exist.username == username){
			setLocals(false, false, "A User with that Display Name already exists.");
			res.redirect('/home');
			return;
		}

		console.log(`Something is fucked up.`);
		setLocals(false, false, "Internal Server Error");
		res.redirect('/home');
		return;
	}

	const salt = bcrypt.genSaltSync(parseInt(process.env.SALTS));
	const hash = bcrypt.hashSync(password, salt);

	let newUser = new User();

	newUser.username = username;
	newUser.password = hash;
	newUser.email = email;
	newUser.display_name = [fname, lname];
	newUser.current_level = 0;

	try {
		await newUser.save();
		setLocals(false, true, "Successful registration, please login to play!");
		res.redirect('/home');
		return;
	} catch (e){
		setLocals(false, false, "Internal Server Error");
		res.redirect('/home');
		return;
	}
};
