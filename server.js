var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsEngine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var app = express();

var appInfo = require('./config/appinfo');
var User = require('./models/user');

mongoose.connect(appInfo.database, function(err) {
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
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUnintialized: true,
  secret: appInfo.secretKey
}));
app.use(flash());

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

// Running a server using Node JS
app.listen(appInfo.port, function(err) {
  if(err) throw err;
  console.log("Server is running on port " + appInfo.port);
})
