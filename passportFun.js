const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var User = require("./models/User");

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
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
             req.flash('message','User Already Exists'));
        } else {
          User.findOne({'username': req.body.username}, function(err, user1){
            if(err){
              console.log('Error in SignUp: ' + err);
              throw err;
            }
            else if(user1){
              console.log('Display name already exists');
              return(done, null, false, req.flash('message', 'Display name already exists'));
            }
            else{
              bcrypt.genSalt(process.env.SALTS, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                  var newUser = new User();
                  newUser.username = req.body.username;
                  newUser.password = createHash(password);
                  newUser.email = email;
                  newUser.display_name = [req.body.fname, req.body.lname];
                  newUser.current_level = 0;

                  newUser.save(function(err) {
                    if (err){
                      console.log('Error in Saving user: '+err);
                      throw err;
                    }
                    console.log('User Registration succesful');
                    return done(null, newUser);
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
        bcrypt.compare(password, user.password, function(err, res) {
          if(err){
            throw err;
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
