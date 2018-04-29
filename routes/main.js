var router = require('express').Router();
var Product = require('../models/products');


// Renders the home page of the Ecommerce application
router.get('/', function(req, res) {
  res.render('main/home');
});

// Renders the about me page
router.get('/about', function(req, res) {
  res.render('main/about');
});

router.get('/products/:id', function(req, res, next) {
  Product.find({ category : req.params.id })
         .populate('category')
         .exec(function(err, products) {
           if(err) return next(err);
           res.render('main/category', {
             products: products
           });
         });
});
module.exports = router;
