const User = require('../models/user');

exports.postStory = (req, res) => {
  if (req.user) {
    console.log('user', req.user)
    console.log(req.body);
    const game = {
      id: req.body.id,
      name: req.body.name,
      release: new Date(req.body.release),
      thumb: req.body.thumb,
      platform: req.body.platform,
      genres: req.body.genres,
      enjoyment: req.body.enjoyment,
      comment: req.body.comment,
      playData: req.body.playData
    }
    const story = {
      type: 0,
      game: game
    };
    req.user.games.push(game);
    req.user.stories.push(story);
    req.user.save((err, user) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ game: game });
      }
    });
  } else {
    res.end();
  }
};
