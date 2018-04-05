var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var User = require('./models/user');

mongoose.connect('mongodb://root:abc123@ds135399.mlab.com:35399/ecommerce', function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
})

//middleware for morgan to add loggin
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// API to create a user profile in mongodb
app.post('/create-user', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err) {
    if(err) return next(err);
    res.json("New user is created successfully!");
  });
});

// Running a server using Node JS
app.listen(3000, function(err) {
  if(err) throw err;
  console.log("Server is running on port 3000");
})
