var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var User = require("./models/User");


var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, email, password, done) {
    findOrCreateUser = function(){
      User.findOne({'email':email},function(err, user) {
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        if (user) {
          console.log('User already exists');
          return done(null, false,
             req.flash('message','User Already Exists'));
        } else {
          var newUser = new User();
          newUser.username = req.param('username');
          newUser.password = createHash(password);
          newUser.email = email;
          newUser.display_name = [req.param('fname'), req.param('lname')];
          newUser.current_level = 0;

          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  })
);

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log(req)
    User.findOne({ 'email' :  username },
      function(err, user) {
        if (err)
          return done(err);
        if (!user){
          console.log('User Not Found with email '+username);
          return done(null, false,
                req.flash('message', 'User Not found.'));
        }
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false,
              req.flash('message', 'Invalid Password.'));
        }
        return done(null, user);
      }
    );
}));



module.exports = passport;
