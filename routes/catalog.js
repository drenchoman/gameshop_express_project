var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController');
var developer_controller = require('../controllers/developerController');
var game_controller = require('../controllers/gameController');
var gameinstance_controller = require('../controllers/gameinstanceController');



// Get request for creating category
router.get('/category/create', category_controller.category_create_get);

// Get request for delete category
router.get('/category/:id/delete', category_controller.category_delete_get);

// Post request for deleting category
router.post('/category/:id/delete', category_controller.category_delete_post);




// Display detail of single category
router.get('/category/:id', category_controller.category_detail);


// Post request for creating category
router.post('/category/create', category_controller.category_create_post);

// Display all categories
router.get('/categories', category_controller.category_list);

// Developer routes

// Display all developers
router.get('/developers', developer_controller.developer_list);

// Display individual developer in detail
router.get('/developers/:id', developer_controller.developer_detail);

// Get request for creating developer
router.get('/developer/create', developer_controller.developer_create_get);

// Post request for creating developer
router.post('/developer/create', developer_controller.developer_create_post);

// Get request for deleting developer
router.get('/developer/:id/delete', developer_controller.developer_delete_get);

// POST request for deleting developer
router.post('/developer/:id/delete', developer_controller.developer_delete_post);

// Game Routes

// Display homepage for Gameshop
router.get('/', game_controller.index);

// Display list of games
router.get('/games', game_controller.game_list);

// Get request for deleting game
router.get('/game/:id/delete', game_controller.game_delete_get);

// POST request for deleteing game
router.post('/game/:id/delete', game_controller.game_delete_post);


// Display detail of single game
router.get('/games/:id', game_controller.game_detail);

// Get request for creating game
router.get('/game/create', game_controller.game_create_get);

// Post request for creating game
router.post('/game/create', game_controller.game_create_post);


// Get request for updating game
router.get('/game/:id/update', game_controller.game_update_get);

// POST request for updating game
router.post('/game/:id/update', game_controller.game_update_post);


// Gameinstance routes

// Display game instances
router.get('/gameinstances', gameinstance_controller.gameinstance_list);

// Post request for creating game instance
router.post('/gameinstance/create', gameinstance_controller.gameinstance_create_post);


// GEt request for creating game instance
router.get('/gameinstance/create', gameinstance_controller.gameinstance_create_get);




// Get request for deleting game instance
router.get('/gameinstance/:id/delete', gameinstance_controller.gameinstance_delete_get);

// Post request for deleting game instance
router.post('/gameinstance/:id/delete', gameinstance_controller.gameinstance_delete_post);

// Display detail of individualgame instance
router.get('/gameinstance/:id', gameinstance_controller.gameinstance_detail);


module.exports = router;
