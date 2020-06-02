const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var User = require("./models/User");

// passport.initialize();

// var createHash = function(password){
//  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }
//
// var isValidPassword = function(user, password){
//   return bCrypt.compareSync(password, user.password);
// }

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
          return done(err);
        }
        if (user) {
          console.log('User already exists');
          return done(null, false,
             req.flash('message','User Already Exists'));
        } else {
          bcrypt.genSalt(process.env.SALTS, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
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
            });
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
          console.log('User Not Found with email '+username);
          return done(null, false,
                {'message': 'User Not found.'});
        }
        else{
        bcrypt.compare(password, user.password, function(err, res) {
          if(err){
            throw err;
          }
          else if(res == false){
            console.log('Wrong credentials '+username);
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
