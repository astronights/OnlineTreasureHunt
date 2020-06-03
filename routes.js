var express = require('express');
var router = express.Router();

var signup = require('./controllers/signup');
var login = require('./controllers/login');

var home = require('./controllers/home');
var level = require('./controllers/level');
var leaderboard = require('./controllers/leaderboard');
var getlevel = require('./controllers/getlevel');

router.get('/home', home);
router.get('/levels/:name', level);
router.get('/leaderboard', leaderboard);
router.get('/getlevel', getlevel);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
