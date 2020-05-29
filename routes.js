var express = require('express');
var router = express.Router();

var signup = require('./controllers/signup');
var login = require('./controllers/login');
var home = require('./controllers/home');

router.get('/home', home)
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
