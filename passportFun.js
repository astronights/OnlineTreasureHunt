const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var User = require("./models/User");

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback : true
  },
  function(req, email, password, done) {
    findOrCreateUser = function(){
      User.findOne({'email':email},function(err, user) {
        if (err){
          console.log('Error in SignUp: '+err);
          throw err;
        }
        else if (user) {
          console.log('User already exists');
          return done(null, false,
             {'message': 'Email ID Already Exists'});
        } else {
          User.findOne({'username': req.body.username}, function(err1, user1){
            if(err1){
              console.log('Error in SignUp: ' + err);
              throw err1;
            }
            else if(user1){
              console.log('Display name already exists');
              return done(null, false,
                {'message': 'Display name already exists'});
            }
            else{
              bcrypt.genSalt(parseInt(process.env.SALTS), function(err2, salt) {
                bcrypt.hash(password, salt, function(err2, hash) {
                  var newUser = new User();
                  newUser.username = req.body.username;
                  newUser.password = hash;
                  newUser.email = email;
                  newUser.display_name = [req.body.fname, req.body.lname];
                  newUser.current_level = 0;

                  newUser.save(function(err3) {
                    if (err3){
                      console.log('Error in Saving user: '+err);
                      throw err3;
                    }
                    console.log('User Registration succesful');
                    return done(null, newUser,
                    {'message': 'Successful registration, please login to play!'});
                  });
                });
              });
            }
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
    session: false
  },
  function(email, password, done) {
    // console.log(req)
    User.findOne({ 'email' :  email },
      function(err, user) {
        if (err)
          return done(err);
        if (!user){
          console.log('User Not Found with email '+ email);
          return done(null, false,
                {'message': 'User Not found.'});
        }
        else{
        bcrypt.compare(password, user.password, function(err1, res) {
          if(err1){
            throw err1;
          }
          else if(res == false){
            console.log('Wrong credentials '+ email);
            return done(null, false,
                  {'message': 'Wrong password.'});
          }
          else{
            console.log("Found user");
            return done(null, user);
          }
        });
        }
      }
    );
}));



module.exports = passport;
