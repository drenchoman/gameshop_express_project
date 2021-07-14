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
  console.log(results.game_instance)
  res.render("game_detail", {title: results.game.title, game: results.game, game_instances: results.game_instance});
});
};

// Display create new game form
exports.game_create_get = function(req, res, next){
  async.parallel({
    developers: function(callback){
      Developer.find(callback)
    },
    categories: function(callback){
      Category.find(callback)
    },
  }, function(err, results){
    if(err){return next(err);}
    res.render("game_form", {title: "Add game", developers: results.developers, categories: results.categories})
  });
};


// Handle create new game form
exports.game_create_post = [
  (req, res, next) => {
    if(!(req.body.category instanceof Array)){
      if(typeof req.body.category === 'undefined')
      req.body.category = [];
      else
      req.body.category = new Array(req.body.category)
    }
    next();
  },
  body('title', 'Title must not be empty.').trim().isLength({min: 1}).escape(),
  body('developer', 'Developer must not be empty.').trim().isLength({min: 1}).escape(),
  body('description', 'Please provide a description of the game.').trim().isLength({min: 1}).escape(),
  body('price', 'Please provide a price').trim().isLength({min: 1}).escape(),
  body('cateory.*', 'Tick a box').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var game = new Game({
      title: req.body.title,
      developer: req.body.developer,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });
    if (!errors.isEmpty()){
      async.parallel({
        developers: function(callback){
          Developer.find(callback);
        },
        categories: function(callback){
          Category.find(callback);
        },
      }, function(err, results){
        if (err) { return next(err); }
        for (let i = 0; i < result.category.length; i++){
          if (game.category.indexOf(results.categories[i]._id) > -1){
            results.categories[i].checked='true';
          }
        }
        res.render('game_form', {title:"Add game", developers: results.developers, categories: results.categories, game: game, errors:errors.array() })
      });
      return;
    }
    else {
      game.save(function(err){
        if (err){ return next(err); }
        res.redirect(game.url)
      });
    }
  }
]


// Display(GET) game delete form
exports.game_delete_get = function(req, res, next){
  async.parallel({
    game: function(callback){
      Game.findById(req.params.id).exec(callback)
    },
    game_instance: function(callback){
      GameInstance.find({'game':req.params.id}).exec(callback)
    },
  }, function(err, results){
    if(err){ return next(err);}
    if(results.game_instance===null){
      var err = new Error("Game instance not found")
      err.status = 404
      console.log(results.game_instance)
      return next(err)
    }
    console.log(results.game)
    res.render('game_delete', {title: 'Delete Game', game:results.game, gameinstance: results.game_instance})
  })
};

// Handle game delete form on POST
exports.game_delete_post = function(req, res, next){
  async.parallel({
    game:function(callback){
      Game.findById(req.params.id).exec(callback)
    },
    game_instance: function(callback){
      GameInstance.find({'game':req.params.id}).exec(callback)
    },
  }, function(err, results){
    if(err){return next(err);}
    if(results.game_instance.length > 0){
      res.render('game_delete', {title:'Delete Game', game:results.game, game_instance:results.gameinstance})
      console.log(results.game.title)
      return;
    }
    else {
      console.log("Deleting Book")
      Game.findByIdAndRemove(req.body.gameid, function deleteGame(err){
        if(err){return next(err)}
        res.redirect('/games')
      })
    }
  });
};

// Display game update on get
exports.game_update_get = function(req, res, next){
  res.send("NOT IMPLEMENTED: Get Game update form");
}

// Handle game update on post
exports.game_update_post = function(req, res, next){
  res.send("NOT IMPLEMENTED: Post game update form")
}
