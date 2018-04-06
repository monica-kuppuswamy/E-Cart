var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res) {
  res.render('accounts/signup');
});

router.post('/signup', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email : req.body.email }, function(err, existing) {
    if(existing) {
      console.log("User with email " + req.body.email + " already exists");
      return res.redirect('/signup');
    } else {
      user.save(function(err, user) {
        if(err)
          return next(err);

        res.json("New user created");
      });
    }
  });
});

module.exports = router;