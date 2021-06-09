var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');

// Display list of all Developers

exports.developer_list = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET list of Developers")
}

// Display detail of Developer
exports.developer_detail = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET detail of Develoepr");
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
