const passport = require('passport');
const User = require('../../models/User');
const $auth = require('../../core/auth');

module.exports.login = function(req, res, next) {
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('password', 'Password cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // const errors = req.validationErrors();

  // if (errors){
  //   return next(errors)
  // }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(info);
    }

    let id = user.id;
    let token = $auth.signToken({id})

    res.json({
      status: 'ok',
      profile: user.profile,
      token
    })

    log.dev(`${user._id} has been logged in`);
  })(req, res, next);
}

module.exports.register = function(req, res, next) {
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // const errors = req.validationErrors();

  // if (errors){
  //   return next(errors)
  // }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return next({
        msg: 'Account with that email address already exists.'
      })
    }

    user.save((err) => {
      if (err) {
        return next(err);
      }

      let token = $auth.signToken({
        id: user.id
      })

      res.json({
        status: 'ok',
        profile: user.profile,
        token
      })
    });
  });
}