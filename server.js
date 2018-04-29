var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsEngine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session); // to store session on the server side
var passport = require('passport');

var app = express();

var appInfo = require('./config/appinfo');
var User = require('./models/user');
var Categories = require('./models/category');

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
  saveUninitialized: true,
  secret: appInfo.secretKey,
  store: new MongoStore({ url: appInfo.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use(function(req, res, next) {
  Categories.find({}, function(err, categories) {
    if(err) return next(err);
    res.locals.productCategories = categories;
    next();
  });
});

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var apiRoutes = require('./api/api.js');
app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use('/api', apiRoutes);

// Running a server using Node JS
app.listen(appInfo.port, function(err) {
  if(err) throw err;
  console.log("Server is running on port " + appInfo.port);
})
