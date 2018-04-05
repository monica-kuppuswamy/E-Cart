var router = require('express').Router();

// Renders the home page of the Ecommerce application
router.get('/', function(req, res) {
  res.render('main/home');
});

// Renders the about me page
router.get('/about', function(req, res) {
  res.render('main/about');
});


module.exports = router;
