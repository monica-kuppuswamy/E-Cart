var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryScehma = new Schema({
  name: { type: String, unique: true, lowercase: true}
});

module.exports = mongoose.model('Category', CategoryScehma);
