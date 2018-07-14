const User = require('../models/user');

exports.postStory = (req, res) => {
  if (req.user) {
    console.log(req.body);
    const gameIndex = req.user.games.findIndex(game => game.id === req.body.game.id);
    let game = req.user.games[gameIndex];
    let isEdit = false;
    if (req.body.remove) {
      if (game) {
        isEdit = true;
        req.user.games.splice(gameIndex, 1);
      } else {

      }
    } else {
      if (game) {
        isEdit = true;
        game.name = req.body.game.name,
        game.release = new Date(req.body.game.release),
        game.thumb = req.body.game.thumb,
        game.platforms = req.body.game.platforms,
        game.platform = req.body.game.platform,
        game.genres = req.body.game.genres,
        game.enjoyment = req.body.game.enjoyment,
        game.comment = req.body.game.comment,
        game.playData = req.body.game.playData
      } else {
        const story = {
          type: 0,
          game: {
            id: req.body.game.id,
            name: req.body.game.name,
            release: new Date(req.body.game.release),
            thumb: req.body.game.thumb,
            platform: req.body.game.platform,
          }
        };
        game = {
          ...story.game,
          platforms: req.body.game.platforms,
          genres: req.body.game.genres,
          enjoyment: req.body.game.enjoyment,
          comment: req.body.game.comment,
          playData: req.body.game.playData
        };
        req.user.games.push(game);
        req.user.stories.push(story);
      }
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
