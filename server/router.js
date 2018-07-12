const Authentication = require('./controllers/authentication');
const Page = require('./controllers/page');
const User = require('./controllers/user');
const Games = require('./controllers/games');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    req.user = user;
    next();
  })(req, res, next);
};
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/home', requireAuth, Page.getHome);
  app.get('/user/:user', requireAuth, Page.getUser);
  app.post('/user/:user', requireAuth, User.postStory);
  app.get('/user/:user/games', requireAuth, Page.getGames);
  // app.get('/user/:user/timeline', requireAuth, Page.getTimeline);
  app.get('/games/search', Games.searchGames);
  app.post('/login', requireLogin, Authentication.login);
  app.post('/signup', Authentication.signUp);
};
