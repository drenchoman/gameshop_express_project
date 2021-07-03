var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');


// Display a list of Game categories
exports.category_list = function(req, res, next){
  Category.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_category){
      if (err){ return next(err); };
      res.render('category_list', {title: 'Category List', category_list: list_category})
    })
};

// Display detailed information on Category
exports.category_detail = function(req, res, next){
  async.parallel({
    category: function(callback){
      Category.findById(req.params.id)
      .exec(callback);
    },
    category_games: function(callback){
      Game.find({'category': req.params.id})
      .exec(callback);
    },
  }, function(err, results){
    if (err) { return next(err); }
    if (results.category==null){
      var err = new Error('Category not found');
      err.status= 404;
      return next(err);
    }
    console.log(results.category_games)
    res.render('category_detail', {title: 'Category Detail', category: results.category, category_games: results.category_games })
  })
};

// Display Category create Form

exports.category_create_get= function(req, res, next){
  res.render('category_form', {title: 'Create Category'});
};

// Handle Category create on POST

exports.category_create_post = [
  body('name', 'Category name required').trim().isLength({ min: 2}).escape(),
  body('description', 'Category description required').trim().isLength({min: 15}).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    var category = new Category({
      name: req.body.name,
      description: req.body.descrption
    });
    if (!errors.isEmpty()){
      res.render('category_form', {title:'Create Category', category: category, errors: errors.array()});
      console.log(erros.array());
      return
    }
    else {
      // Data from form is valid.
    // Check if Category with same name already exists.
      Category.findOne({ 'name': req.body.name })
      .exec(function(err, found_category){
        if (err){ return next(err);}
        if (found_category){
          res.redirect(found_category.url)
        }
        else {
          category.save(function (err){
            if (err) { return next (err); }
            res.redirect(category.url)
          });
        };
      });
    };
  }
];

//  Display Category Delete Form

exports.category_delete_get = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET category delete form");
};

// Handle Category Delete on POST

exports.category_delete_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: POST category delete form");
};
