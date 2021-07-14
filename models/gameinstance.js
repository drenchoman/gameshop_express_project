var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameInstanceSchema = new Schema({
  game: {type: Schema.Types.ObjectId, ref: 'Game', require: true},
  status: {type: String, required: true, enum: ['Available', 'Sold', 'Coming Soon'], default: 'Available'},
});

GameInstanceSchema
.virtual('url')
.get(function(){
  return '/gameinstance/' + this._id;
});

GameInstanceSchema
.virtual('delete_url')
.get(function(){
  return '/category/' + this._id + '/delete'
})

module.exports = mongoose.model('GameInstance', GameInstanceSchema);
