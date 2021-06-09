#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category')
var Game = require('./models/game')
var Developer = require('./models/developer')
var GameInstance = require('./models/gameinstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var games = []
var developers = []
var gameinstances = []

function developerCreate(company, founded, description, cb) {

  var developer = new Developer({
    company: company,
    founded: founded,
    description: description,
  });

  developer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New developer: ' + developer);
    developers.push(developer)
    cb(null, developer)
  }  );
}

function categoryCreate(name, description, cb) {
  var category = new Category({
    name: name,
    description: description
   });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function gameCreate(title, description, developer, category, price, cb) {
  gamedetail = {
    title: title,
    description: description,
    developer: developer,
    category: category,
    price: price,
  }

  var game = new Game(gamedetail);
  game.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Game: ' + game);
    games.push(game)
    cb(null, game)
  }  );
}


function gameInstanceCreate(game, status, cb) {
  gameinstancedetail = {
    game: game,
    status: status,
  }
  // if (due_back != false) bookinstancedetail.due_back = due_back
  // if (status != false) bookinstancedetail.status = status

  var gameinstance = new GameInstance(gameinstancedetail);
  gameinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING GameInstance: ' + gameinstance);
      cb(err, null)
      return
    }
    console.log('New GameInstance: ' + gameinstance);
    gameinstances.push(gameinstance)
    cb(null, gameinstance)
  }  );
}

function createCategory(cb){
  async.series([
    function(callback) {
      categoryCreate("Platformer", "Platformers are characterized by their level of use in jumping and climbing to navigate the player's environment and reach their goal.", callback);
    },
    function(callback) {
      categoryCreate("FPS", "A First Person Shooter is a genre of video game that is played from the point of view of the protagonist.", callback);
    },
    function(callback) {
      categoryCreate("RPG", "A game in which the players assume the roles of characters in a fictional setting", callback);
    },
    function(callback){
      categoryCreate("Survival", "Survival games are a sub-genre of action video games, usually set in hostile, intense, open-world enivronments.", callback);
    },
    function(callback){
      categoryCreate("2d", "2D games, as their name suggests, are titles with only two axes of motion. Typically, these are flat games where you can move left and right as well as up and down.", callback);
    },
    function(callback){
      categoryCreate("Multiplayer", "A game in which more than one person can play in the same game enivronment at the same time.", callback);
    }
  ], cb)
};

function createDeveloper(cb) {
    async.series([
        function(callback) {
          developerCreate('Nintendo', 1889, 'Nintendo Co., Ltd. is a Japanese multinational consumer electronics and video game company headquartered in Kyoto. The company was founded in 1889 as Nintendo Karuta by craftsman Fusajiro Yamauchi and originally produced handmade hanafuda playing cards. After venturing into various lines of business during the 1960s and acquiring a legal status as a public company under the current company name, Nintendo distributed its first video game console, the Color TV-Game, in 1977. It gained international recognition with the release of Donkey Kong in 1981 and the Nintendo Entertainment System and Super Mario Bros. in 1985.', callback );
        },
        function(callback) {
          developerCreate('Valve', 1996, 'Valve Corporation, also known as Valve Software, is an American video game developer, publisher, and digital distribution company headquartered in Bellevue, Washington. It is the developer of the software distribution platform Steam and the Half-Life, Counter-Strike, Portal, Day of Defeat, Team Fortress, Left 4 Dead, and Dota series.', callback );
        },
        function(callback) {
          developerCreate('Blizzard', 1991, 'Blizzard Entertainment, Inc. is an American video game developer and publisher based in Irvine, California. A subsidiary of Activision Blizzard, the company was founded on February 8, 1991, under the name Silicon & Synapse, Inc. by three graduates of the University of California, Los Angeles: Michael Morhaime, Frank Pearce and Allen Adham.', callback);
        },

        ],
        // optional callback
        cb);
}


function createGames(cb) {
    async.parallel([
        function(callback) {
          gameCreate("Overwatch", "Overwatch is a 2016 team-based multiplayer first-person shooter developed and published by Blizzard Entertainment", developers[2], [categories[1],categories[5]], 39.99, callback);
        },
        function(callback) {
          gameCreate("Left 4 Dead 2", "Left 4 Dead 2 is a 2009 multiplayer survival horror first-person shooter developed and published by Valve", developers[1], [categories[1],categories[3]], 20.00, callback);
        },
        function(callback) {
          gameCreate("Super Mario Bros. 2", "Super Mario Bros. 2 is a platform video game developed and published by Nintendo for the Nintendo Entertainment System.", developers[0], [categories[0],categories[4]], 9.99, callback);
        },
        function(callback){
          gameCreate("Half Life 3", "Half Life 3 is a First Person Shooter currently in development by Valve.", developers[1], [categories[0]], 99.99, callback)
        }
        ],
        // optional callback
        cb);
};


function createGameInstances(cb) {
    async.parallel([
        function(callback) {
          gameInstanceCreate(games[0], 'Available', callback)
        },
        function(callback) {
          gameInstanceCreate(games[1], 'Available', callback)
        },
        function(callback) {
          gameInstanceCreate(games[2], 'Sold', callback)
        },
        function(callback) {
          gameInstanceCreate(games[0], 'Available', callback)
        },
        function(callback) {
          gameInstanceCreate(games[3], 'Coming Soon', callback)
        },
        function(callback) {
          gameInstanceCreate(games[3], 'Coming Soon', callback)
        },
        function(callback) {
          gameInstanceCreate(games[2], 'Sold', callback)
        },
        function(callback) {
          gameInstanceCreate(games[1], 'Sold', callback)
        },
        function(callback) {
          gameInstanceCreate(games[4], 'Coming Soon', callback)
        },
        function(callback) {
          gameInstanceCreate(games[0], 'Available', callback)
        },
        function(callback) {
          gameInstanceCreate(games[1], 'Sold', callback)
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createCategory,
    createDeveloper,
    createGames,
    createGameInstances,



],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('working!');

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
