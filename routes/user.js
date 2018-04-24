var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var verifyLogin = require('../config/authenticateLogin');

router.get('/login', function(req, res) {
  if(req.user) return res.redirect('/profile');
  res.render('accounts/login', {
    message : req.flash('loginMessage')
  })
});

router.get('/profile', function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user) {

    if(err) return next(err);
    
    res.render('accounts/profile', {user: user});
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
})); // using the middleware created

router.get('/signup', function(req, res) {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.profile.picture = User.getAvatar();

  User.findOne({ email : req.body.email }, function(err, existing) {
    if(existing) {
      req.flash('errors', 'Account with this email is already registered!');
      //console.log("User with email " + req.body.email + " already exists");
      return res.redirect('/signup');
    } else {
      user.save(function(err, user) {
        if(err)
          return next(err);

        return res.redirect('/');
      });
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.get('/edit-profile', function(req, res, next) {
  res.render('accounts/edit-profile.ejs', {message: req.flash('success')});
});


router.post('/edit-profile', function(req, res, next) {
  User.findOne({_id: req.user._id}, function(err, user) {

    if(err) return next(err);

    if(req.body.name) user.profile.name = req.body.name;
    if(req.body.address) user.address = req.body.address;

    user.save(function(err) {
      if(err) return next(err);
      req.flash('success', 'Changes are saved successfully.');
      return res.redirect('/edit-profile');
    });
  });
});


module.exports = router;
