var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');


// Display a list of Game categories
exports.category_list = function(req, res, next){
  res.send("NOT IMPLEMENTED: Category GET list")
}

// Display detailed information on Category
exports.category_detail = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET category detail")
};

// Display Category create Form

exports.category_create_get= function(req, res, next){
  res.send("NOT IMPLEMENTED: GET Category create form")
};

// Handle Category create on POST

exports.category_create_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: POST category form")
}

//  Display Category Delete Form

exports.category_delete_get = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET category delete form");
};

// Handle Category Delete on POST

exports.category_delete_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: POST category delete form");
};
