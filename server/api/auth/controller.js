// module dependencies
const User    = require('../../models/User');
const $auth   = require('../../core/auth');
const $token  = require('../../core/auth/token');

/**
 * Auth controller
 */
class AuthController {
  /**
   * Login
   * User authentication
   */
  login(req, res, next){
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
      email,
      password
    })
    .then(user => {
      if (!user) {
        let error = new ApiError(404, 'Incorrect login or password');
        return Promise.reject(error)
      }

      let id = user.id;
      let profile = user.profile;
      let token = $token.signToken({id});

      log.dev(`AuthController: ${id} logged in`);

      res.json({
        status: core.api.status.ok,
        data: {
          profile,
          token
        }
      })
    })
    .then(null, error => {
      next(error)
    })
  }

  /**
   * Register
   * User registration
   */
  register(req, res, next){
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
      email
    })
    .then(isExist => {
      if (isExist){
        let error = new ApiError(400, 'User with same email already exists');
        return Promise.reject(error);
      }

      else {
        return new User({
          email,
          password
        }).save()
      }
    })
    .then(user => {
      let id = user.id;
      let profile = user.profile;
      let token = $token.signToken({id});

      log.dev(`AuthController: ${id} is registered`);

      res.json({
        status: core.api.status.ok,
        data: {
          profile,
          token
        }
      });
    })
    .then(null, error => {
      next(error)
    })
  }

  /**
   * Profile
   * Get user profile
   */
  profile(req, res, next){
    let _id = req.user._id;

    User.findById(_id)
      .select('profile _id email')
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
}

const $AuthController = new AuthController();
module.exports = $AuthController;