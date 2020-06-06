var express = require('express');
var router = express.Router();

var upload = require('./storage');

var signup = require('./controllers/signup');
var login = require('./controllers/login');

var home = require('./controllers/home');
var level = require('./controllers/level');
var leaderboard = require('./controllers/leaderboard');
var getlevel = require('./controllers/getlevel');
var error = require('./controllers/error');

var addlevelget = require('./controllers/addlevelget');
var addlevelpost = require('./controllers/addlevelpost');

router.get('/error', error);
router.get('/home', home);
router.get('/levels/:name', level);
router.get('/leaderboard', leaderboard);
router.get('/getlevel', getlevel);
router.post('/signup', signup);
router.post('/login', login);

router.get('/addlevel', addlevelget);
router.post('/addlevel', upload.any(), addlevelpost);

module.exports = router;
