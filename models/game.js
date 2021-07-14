var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  title: {type: String, required: true, maxLength: 100},
  description: {type: String, required: true, maxLength: 300},
  developer: {type: Schema.Types.ObjectId, ref: 'Developer', required: true},
  category: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
  price: {type: Number, required: true},
});

// Virtuals

GameSchema
.virtual('url')
.get(function(){
  return '/games/' + this._id;
});

GameSchema
.virtual('delete_url')
.get(function(){
  return '/game/' + this._id + '/delete'
});

module.exports = mongoose.model('Game', GameSchema);
