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

exports.gameinstance_detail = function(req, res, next){
  GameInstance.findById(req.params.id)
    .populate('game')
    .exec(function(err, gameinstance){
      if(err){ return next(err); }
      if (gameinstance ===null){
        var err = new Error('Game Instance not found')
        err.status = 404
        next(err)
      }
      res.render('gameinstance_detail', {title:'Copy: ' + gameinstance.game.title, gameinstance:gameinstance});
    })
};

exports.gameinstance_create_get = function(req, res, next){
let refId = req.headers.referer;
refId = refId.slice(28)
Game.findById(refId)
  .populate('developer')
  .populate('category')
  .exec(function(err, game_info){
    if(err){ return next(err);}
    if(game_info===null){
      var err = new Error("Game no found");
      err.status = 404
      return next(err);
    }
    res.render('game_instance_form', {title: 'Add a game copy', gameinfo: game_info})
    console.log(game_info)
  }
)

};

exports.gameinstance_create_post = [
  body('game').trim().isLength({min: 1}).escape(),
  body('status').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var gameinstance = new GameInstance(
      {
        game: req.body.game,
        status: req.body.status
      }
    );

    if(!errors.isEmpty()){
      console.log("What could possible go wrong?")
        return;
  } else {
    gameinstance.save(function(err){
      if(err){ return next(err); }
      console.log(gameinstance.game)
      res.redirect('/games/' + gameinstance.game)
    });
  }
}
];



exports.gameinstance_delete_get = function(req, res, next){
  GameInstance.findById(req.params.id)
  .populate('game')
  .exec(function(err, gameinstance){
    if(err){ return next(err);}
    if(gameinstance==null){
      res.redirect('/')
    }
    res.render('gameinstance_delete', {title: 'Delete instance of game', gameinstance:gameinstance})
  })
};

exports.gameinstance_delete_post = function(req, res, next){
  GameInstance.findById(req.params.id)
  .populate('game')
  .exec(function(err, gameinstance){
    if(err){return next(err);}
    if(gameinstance==null){
      res.render('gameinstance_delete', {title:'Delete instance of game', gameinstance:gameinstance});
      return;
    }
    else{
      GameInstance.findByIdAndRemove(req.body.gameinstanceid, function deleteGameInstance(err){
        if(err){ return next(err);}
        res.redirect('/games/' + gameinstance.game._id)

      })
    }
  })
};
