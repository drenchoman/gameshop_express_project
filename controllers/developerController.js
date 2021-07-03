var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');

// Display list of all Developers

exports.developer_list = function(req, res, next){
  Developer.find()
    .exec(function(err, list_developers){
      if(err){ return next(err); }
      res.render('developer_list', {title: 'Developer List', developer_list: list_developers});
    });
};

// Display detail of Developer
exports.developer_detail = function(req, res, next){
  async.parallel({
    developer: function(callback){
      Developer.findById(req.params.id)
      .exec(callback)
    },
    developers_games: function(callback){
      Game.find({'developer': req.params.id}, 'title description')
      .exec(callback)
    },
  }, function(err, results){
    if(err) { return next(err); }
    if (results.developer==null){
      var err = new Error("Author not found");
      err.status = 404
      return next(err);
    }
    res.render("developer_detail", {title: 'Developer detail', developer: results.developer, developer_games: results.developers_games })
  })
};

// Display create Developer FORM on GET

exports.developer_create_get = function (req, res, next){
  res.send('NOT IMPLEMENTED: GET Developer Create Form')
};

// Handle create Developer form on POST

exports.developer_create_post = function (req, res, next){
  res.send('NOT IMPLEMENTED: POST developer Create form')
}

exports.developer_delete_get = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET developer delete form")
};

exports.developer_delete_post = function(req, res, next){
  res.send('NOT IMPLEMENTED: POST developer delete form')
};
