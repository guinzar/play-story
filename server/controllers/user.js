const User = require('../models/user');

exports.postStory = (req, res) => {
  if (req.user) {
    console.log(req.body);
    const story = {
      type: 0,
      gameInfo: {
        gameId: req.body.gameId,
        thumb: req.body.thumb,
        platform: req.body.platform,
        enjoyment: req.body.enjoyment,
        comment: req.body.comment,
        playData: req.body.playData
      }
    };
    req.user.stories.push(story);
    req.user.save((err, user) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true });
      }
    });
  } else {
    res.end();
  }
};
