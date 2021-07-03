var Category = require('../models/category');
var Developer = require('../models/developer');
var Game = require('../models/game');
var GameInstance = require('../models/gameinstance')

var async = require('async');
var {body, validationResult} = require('express-validator');

// Display home page for gameshop

exports.index = function(req, res, next){
  async.parallel({
    category_count: function(callback){
      Category.countDocuments({}, callback);
    },
    developer_count: function(callback){
      Developer.countDocuments({}, callback);
    },
    game_count: function(callback){
      Game.countDocuments({}, callback);
    },
    gameinstance_count: function(callback){
      GameInstance.countDocuments({}, callback);
    }
  }, function(err, results){
    if (err){ return next(err); }
    console.log(results);
    res.render('index', {title: 'Kiwi Games Fan Club', error: err, data: results});
  })
};

// Display list of all games

exports.game_list = function(req, res, next){
  Game.find({}, 'title developer category')
  // .populate('title')
  .populate('developer')
  .populate('category')
  .exec(function(err, list_games){
    if (err) { return next(err); }
    console.log(list_games);
    console.log(list_games[0].category)
    res.render('game_list', {title: 'Game List', game_list: list_games})
  })
};

// Display detail of a game

exports.game_detail = function(req, res , next){
  async.parallel({
    game: function(callback){
      Game.findById(req.params.id)
      .populate('developer')
      .populate('category')
      .exec(callback)
    },
    game_instance: function(callback){
      GameInstance.find({'game': req.params.id})
      .exec(callback);
    },
  }, function(err, results){
    if (err){ return next(err); }
    if (results.game=== null){
    var err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  res.render("game_detail", {title: results.game.title, game: results.game, game_instances: results.game_instance});
});
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
