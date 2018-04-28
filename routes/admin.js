var router = require('express').Router();
var Category = require('../models/category');

// Route to render add category page
router.get('/add-category', function(req, res, next) {
  res.render('admin/add-category', {message: req.flash('success')});
});

// Route for adding a new category to the database
router.post('/add-category', function(req, res, next) {
  var category = new Category();
  category.name = req.body.name;

  category.save(function(err) {
    if(err) return;
    req.flash('success', 'Category added successfully');
    return res.redirect('/add-category');
  });
});

module.exports = router;
