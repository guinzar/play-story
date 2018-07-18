const User = require('../models/user');

exports.postStory = (req, res) => {
  if (req.user) { // auth successful
    const gameIndex = req.user.games.findIndex(game => game.id === req.body.game.id);
    let game = req.user.games[gameIndex];
    let isEdit = false;
    if (req.body.remove) { // remove game
      if (game) {
        isEdit = true;
        req.user.games.splice(gameIndex, 1);
      } else {

      }
    } else {
      if (game) { // edit game
        isEdit = true;
        game.name = req.body.game.name,
        game.release = req.body.game.release,
        game.thumb = req.body.game.thumb,
        game.platforms = req.body.game.platforms,
        game.platform = req.body.game.platform,
        game.genres = req.body.game.genres,
        game.enjoyment = req.body.game.enjoyment,
        game.comment = req.body.game.comment,
        game.playData = req.body.game.playData
      } else { // add new game
        const story = {
          type: 0,
          id: req.body.game.id,
          name: req.body.game.name,
          release: req.body.game.release,
          thumb: req.body.game.thumb,
          platform: req.body.game.platform,
        };
        game = {
          id: req.body.game.id,
          name: req.body.game.name,
          release: req.body.game.release,
          thumb: req.body.game.thumb,
          platform: req.body.game.platform,
          platforms: req.body.game.platforms,
          genres: req.body.game.genres,
          enjoyment: req.body.game.enjoyment,
          comment: req.body.game.comment,
          playData: req.body.game.playData
        };
        // save to 3 feeds (games, stories, and global)
        req.user.games.push(game);
        req.user.stories.push(story);
        User.findOne({ username: 'a' }, (err, user) => {
          if (err) console.log(err);
          user.stories.push({
            ...story,
            username: req.user.username
          });
          // console.log(req.user.username);
          user.save({ validateBeforeSave: false }, err => {
            if (err) console.log(err);
          });
        });
      }
    }
    req.user.save(err => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ game: game, isEdit: isEdit });
      }
    });
  } else { // auth failed
    res.end();
  }
};
