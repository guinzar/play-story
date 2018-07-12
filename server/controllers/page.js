const User = require('../models/user');

exports.getHome = (req, res) => {
  User.findOne({ username: 'a' }, (err, globalUser) => {
    if (err) return res.end();
    if (globalUser) {
      res.json({
        username: req.user ? req.user.username : null,
        stories: globalUser.toObject().stories
      });
    } else {
      res.end();
    }
  });
};
exports.getUser = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user}, (err, user) => {
    if (err) return res.end();
    if (user) {
      res.json({
        username: req.user ? req.user.username : null,
        stories: user.toObject().stories
      });
    } else {
      res.end();
    }
  });
};
exports.getGames = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user}, (err, user) => {
    if (err) return res.end();
    if (user) {
      const games = user.toObject().stories.filter(story => story.type === 0);
      res.json({
        username: req.user ? req.user.username : null,
        games: games
      });
    } else {
      res.end();
    }
  });
};
