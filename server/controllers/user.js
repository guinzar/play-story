const User = require('../models/user');

exports.postStory = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user }, (err, user) => {
    if (err) return res.end();
    if (user) {
      console.log('addgamepost')
      console.log(req.body);
      res.end();
      // res.json({
      //   username: req.user ? req.user.username : null,
      //   stories: user.toObject().stories
      // });
    } else {
      res.end();
    }
  });
};
