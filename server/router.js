const Authentication = require('./controllers/authentication');
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
  app.get('/home', requireAuth, (req, res) => {
    console.log(req.user);
    const stories = [
      'story1', 'story2', 'story3'
    ];
    res.json({
      username: req.user ? req.user.username : null,
      stories: stories
    });
  });
  app.post('/login', requireLogin, Authentication.login);
  app.post('/signup', Authentication.signUp);
};
