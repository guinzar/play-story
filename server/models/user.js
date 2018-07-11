const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/playstory');
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
const gameInfoSchema = new Schema({
  thumbnail: {
    type: String,
  },
  platform: {
    type: Number,
    required: true
  },
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
  gameId: {
    type: Number,
    required: true,
  },
  gameInfo: gameInfoSchema,
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
  stories: [storySchema]
});

userSchema.pre('save', function(next) {
  bcrypt.genSalt(10, (err, salt) => {
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
// const user = new ModelClass({
//   email: 'asdf@asdf.com',
//   username: 'asdf',
//   password: 'asdf',
//   birthday: '',
//   stories: [
//     {
//       type: 0,
//       gameId: 14,
//       gameInfo: {
//         platform: 1,
//         enjoyment: 10,
//         comment: 'asdf',
//         playData: [{
//           year: 1900,
//           amount: 0
//         }]
//       }
//     }
//   ]
// });
// user.save(err => {
//   if (err) console.log(err);
// });
// console.log('done');
module.exports = ModelClass;
