var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsEngine = require('ejs-mate');

var app = express();

var User = require('./models/user');

mongoose.connect('mongodb://root:abc123@ds135399.mlab.com:35399/ecommerce', function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
})

//middlewares
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsEngine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

// Running a server using Node JS
app.listen(3000, function(err) {
  if(err) throw err;
  console.log("Server is running on port 3000");
})
