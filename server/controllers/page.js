const User = require('../models/user');

exports.getHome = (req, res) => {
  User.findOne({ username: 'a' }, (err, globalUser) => {
    if (err) return res.end();
    const resData = {
      user: req.user ? {
        username: req.user.username,
        birthday: req.user.birthday
      } : null
    };
    if (globalUser) resData.stories = globalUser.toObject().stories.slice(-40);
    else res.status(404);
    res.json(resData);
  });
};
exports.getUser = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user }, (err, user) => {
    if (err) return res.end();
    const resData = {
      user: req.user ? {
        username: req.user.username,
        birthday: req.user.birthday
      } : null
    };
    if (user) resData.stories = user.stories.toObject();
    else res.status(404);
    res.json(resData);
  });
};
exports.getGames = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user}, (err, user) => {
    if (err) return res.end();
    const resData = {
      user: req.user ? {
        username: req.user.username,
        birthday: req.user.birthday
      } : null
    };
    if (user) resData.games = user.games.toObject();
    else res.status(404);
    res.json(resData);
  });
};
exports.getTimeline = (req, res) => {
  const user = req.params.user;
  User.findOne({ username: user}, (err, user) => {
    if (err) return res.end();
    const resData = {
      user: req.user ? {
        username: req.user.username,
        birthday: req.user.birthday
      } : null
    };
    if (user) resData.games = user.games.toObject().filter(game => game.playData.length);
    else res.status(404);
    res.json(resData);
  });
};
