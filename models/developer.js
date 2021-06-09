var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeveloperSchema = new Schema({
  company: {type: String, required: true, maxLength: 30},
  founded: {type: Number},
  description: {type: String, required: true},
});

// Virtuals

DeveloperSchema
.virtual('url')
.get(function(){
  return '/developers/' + this._id;
});

module.exports = mongoose.model('Developer', DeveloperSchema);
