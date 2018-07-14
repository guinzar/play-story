const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = user => {
  return jwt.sign({ sub: user.id, iat: (new Date).getTime() }, config.secret);
};
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const alphaNumericRegex = /^[0-9a-zA-Z]{2,}$/;
const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
exports.login = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

exports.signUp = (req, res, next) => {
  const email = `${req.body.email}`;
  const username = `${req.body.username}`;
  const password = `${req.body.password}`;
  const birthday = `${req.body.birthday}`;
  console.log(email, username, password, birthday);
  if (!email || !email.match(emailRegex)) return res.status(422).send({ error: 'You must provide a valid email' });
  if (!username || !username.match(alphaNumericRegex)) return res.status(422).send({ error: 'You must provide a valid alphanumeric username' });
  if (!password) return res.status(422).send({ error: 'You must provide a valid password' });
  if (birthday && !birthday.match(dateRegex)) return res.status(422).send({ error: 'You must provide a valid birthday' });
  
  User.findOne({ username: username }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      console.log('existing user');
      return res.status(422).send({ error: 'Username is taken', field: 'username' });
    }
    const user = new User({
      email: email,
      username: username,
      password: password,
      birthday: birthday,
      stories: []
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        user.save(err => {
          if (err) return next(err);
          res.json({ token: tokenForUser(user) });
        });
      });
    });
  });
};
