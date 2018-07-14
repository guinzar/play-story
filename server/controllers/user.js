const User = require('../models/user');

exports.postStory = (req, res) => {
  if (req.user) {
    console.log('user', req.user)
    console.log(req.body);
    let game = req.user.games.find(game => game.id === req.body.id);
    let isEdit = false;
    if (game) {
      isEdit = true;
      game.name = req.body.name,
      game.release = new Date(req.body.release),
      game.thumb = req.body.thumb,
      game.platforms = req.body.platforms,
      game.platform = req.body.platform,
      game.genres = req.body.genres,
      game.enjoyment = req.body.enjoyment,
      game.comment = req.body.comment,
      game.playData = req.body.playData
    } else {
      const story = {
        type: 0,
        game: {
          id: req.body.id,
          name: req.body.name,
          release: new Date(req.body.release),
          thumb: req.body.thumb,
          platform: req.body.platform,
        }
      };
      game = {
        ...story.game,
        platforms: req.body.platforms,
        genres: req.body.genres,
        enjoyment: req.body.enjoyment,
        comment: req.body.comment,
        playData: req.body.playData
      };
      req.user.games.push(game);
      req.user.stories.push(story);
    }
    req.user.save((err, user) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ game: game, isEdit: isEdit });
      }
    });
  } else {
    res.end();
  }
};
