const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('User', UserSchema);
