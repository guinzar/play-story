const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = user => {
  return jwt.sign({ sub: user.id, iat: (new Date).getTime() }, config.secret);
};

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) return res.status(422).send({ error: 'You must provide email and password' });
  
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(422).send({ error: 'Email is in use' });
    const user = new User({
      email: email,
      password: password
    });
    user.save(err => {
      if (err) return next(err);
      res.json({ token: tokenForUser(user) });
    });
  });
};
