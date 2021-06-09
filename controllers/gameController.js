var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');

// Display home page for gameshop

exports.index = function(req, res, next){
  res.send('<h1>Hello world</h1>')
};

// Display list of all games

exports.game_list = function(req, res, next){
  res.send("Not implemeneted: GET list of games")
};

// Display detail of a game

exports.game_detail = function(req, res , next){
  res.send('Not implemented: Get detail of games');
};

// Display create new game form
exports.game_create_get = function(req, res, next){
  res.send("Not implemented: GET game create form")
};

// Handle create new game form
exports.game_create_post = function(req, res, next){
  res.send('NOT IMPLEMENTED: POST game create form');
};

// Display(GET) game delete form
exports.game_delete_get = function(req, res, next){
  res.send('NOT IMPLEMENTED: GET game delete form');
};

// Handle game delete form on POST
exports.game_delete_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: POST game delete form");
};

// Display game update on get
exports.game_update_get = function(req, res, next){
  res.send("NOT IMPLEMENTED: Get Game update form");
}

// Handle game update on post
exports.game_update_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: Post game update form")
}
