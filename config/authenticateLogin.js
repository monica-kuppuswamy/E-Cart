var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//middlewares to create strategies for local authentication using passport
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  }, function(req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }

        if (!user) {
          return done(null, false, req.flash('loginMessage', 'The email id is not registered!'));
        }

        if (!user.comparePassword(password)) {
          return done(null, false, req.flash('loginMessage', 'The password does not match!'));
        }

        return done(null, user);
      });
  }));

// to check if the user is authenticated
exports.isAuthenticatedUser = function(req, res, done) {
  if(req.isAuthenticated()) {
    return done();
  }
  res.redirect('/login');
}
