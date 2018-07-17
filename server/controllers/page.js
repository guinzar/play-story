const User = require('../models/user');

exports.getHome = (req, res) => {
  User.findOne({ username: 'a' }, (err, globalUser) => {
    if (err) return res.end();
    if (globalUser) {
      res.json({
        user: req.user ? {
          username: req.user.username,
          birthday: req.user.birthday
        } : null,
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
        user: req.user ? {
          username: req.user.username,
          birthday: req.user.birthday
        } : null,
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
      const games = user.games.toObject();
      res.json({
        user: req.user ? {
          username: req.user.username,
          birthday: req.user.birthday
        } : null,
        games: games
      });
    } else {
      res.json({
        username: req.user ? req.user.username : null
      });
    }
  });
};
exports.getTimeline = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user}, (err, user) => {
    if (err) return res.end();
    if (user) {
      const games = user.games.toObject();
      res.json({
        user: req.user ? {
          username: req.user.username,
          birthday: req.user.birthday
        } : null,
        games: games.filter(game => game.playData.length)
      });
    } else {
      res.json({
        username: req.user ? req.user.username : null
      });
    }
  });
};
