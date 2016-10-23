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
    setTimeout(()=>{
      if (err) {
      let error = new ApiError(400, err);
      return next(error);
    }

    if (!user) {
      let error = new ApiError(400, info);
      return next(error);
    }

    let id = user.id;
    let token = $auth.signToken({id})

    res.json({
      status: core.api.status.ok,
      profile: user.profile,
      token
    })

    log.dev(`${user._id} has been logged in`);
  }, 3000)
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
      let error = new ApiError(400, err);
      return next(error);
    }

    if (existingUser) {
      let error = new ApiError(400, 'Account with that email address already exists.')
      return next(error)
    }

    user.save((err) => {
      if (err) {
        let error = new ApiError(400, err);
        return next(err);
      }

      let token = $auth.signToken({
        id: user.id
      })

      res.json({
        status: core.api.status.ok,
        profile: user.profile,
        token
      })
    });
  });
}

module.exports.profile = function(req, res, next) {
  let _id = req.user._id;

  User.findById(_id)
    .select('profile -_id')
    .then(data => {
      res.json({
        status: core.api.status.ok,
        data
      })
    })
    .then(null, err => {
      let errResponse = new ApiError(401, err);

      next(errResponse);
    })
}