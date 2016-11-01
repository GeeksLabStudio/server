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

  let email = req.body.email;
  let password = req.body.password;

  $auth.authenticate('local', {
    email,
    password
  }).then(user => {

    // If OK - signing new token
    let id = user.id;
    let profile = user.profile;
    let token = $auth.signToken({id})

    log.dev(`AuthController: ${id} logged in`);

    res.json({
      status: core.api.status.ok,
      data: {
        profile,
        token
      }
    })

  }).then(null, error => {
    next(error)
  })

}

module.exports.register = function(req, res, next) {
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // const errors = req.validationErrors();

  // if (errors){
  //   return next(errors)
  // }

  let email = req.body.email;
  let password = req.body.password;

  $auth.registrate('local', {
    email,
    password
  }).then(user => {
    // If OK - signing new token
    let id = user.id;
    let profile = user.profile;
    let token = $auth.signToken({id});

    log.dev(`AuthController: ${id} is registered`);

    res.json({
      status: core.api.status.ok,
      data: {
        profile,
        token
      }
    });

  }).then(null, error => {
    next(error)
  })

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