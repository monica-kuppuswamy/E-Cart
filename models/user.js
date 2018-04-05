var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// creating user schema for login into the ecommerce website
var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true},
  password: String,

  profile : {
    name: {type: String, default: ''},
    picture: {type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: 0}
  }]
});

// hahsing the password before saving to the database
UserSchema.pre('save', function(next) {

  // current user instance
  var user = this;

  // return callback without any parameter
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// authorizing if the password that the user types is equal to the password in the database
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema); 
