const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const playData = new Schema({
  year: {
    type: Number,
    min: 1900,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});
const gameSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  release: {
    type: Date,
    required: true
  },
  thumb: {
    type: String,
  },
  platform: {
    type: Number,
    required: true
  },
  genres: [Number],
  enjoyment: {
    type: Number,
    min: 0,
    max: 10
  },
  comment: String,
  playData: [playData]
});
const storySchema = new Schema({
  type: { // game, story, 
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  game: gameSchema,
  storyInfo: {
    comment: String,
  }
});
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: String,
  games: [gameSchema],
  stories: [storySchema]
});

userSchema.pre('save', function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    console.log('lolresalt');
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;
