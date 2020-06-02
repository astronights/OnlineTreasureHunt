var express = require('express');
var router = express.Router();

var signup = require('./controllers/signup');
var login = require('./controllers/login');

var home = require('./controllers/home');
var level = require('./controllers/level');
var leaderboard = require('./controllers/leaderboard');

var addlevel = require('./controllers/addlevel');

router.get('/home', home);
router.get('/level', level);
router.get('/leaderboard', leaderboard);
router.post('/signup', signup);
router.post('/login', login);
router.post('/addlevel', addlevel);

module.exports = router;
