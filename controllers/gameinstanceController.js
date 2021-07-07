var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');

// Display list of all gameinstances
exports.gameinstance_list = function(req, res, next){
  res.send('NOT IMPLEMENTED: get gameinstance list');
}

exports.gameinstance_create_get = function(req, res, next){
console.log(req.headers);
  res.render('game_instance_form', {title: 'Add a game copy', reqinfo: req.params})

};

exports.gameinstance_detail = function(req, res, next){
  res.send("Hello world!")
};



exports.gameinstance_create_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: POST gameinstance create form");
};

exports.gameinstance_delete_get = function(req, res, next){
  res.send("NOT IMPLEMENTED: GET gameinstance delete form");
};

exports.gameinstance_delete_post = function(req, res, next){
  res.send('NOT IMPLEMENTED: POST gameinstance delete form');
};
