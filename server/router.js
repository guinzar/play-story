const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/home', requireAuth, (req, res) => {
    console.log(req.user);
    res.send({ hi: 'there' });
  });
  app.post('/login', requireLogin, Authentication.login);
  app.post('/signup', Authentication.signUp);
};
