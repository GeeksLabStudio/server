// module dependencies
const User = require('../../models/User');
const $token = require('./token');

/**
 * Auth service
 */
class AuthService {
  /**
   * Get user's access to the certain API points
   */
  apiAccess(accessLevel) {
    return (req, res, next) => {
      let token = this._getTokenFromHeader(req);

      $token
        .verifyToken(token)
        .then(user => {
          let role = user.profile.role;

          if (accessLevel.indexOf(role) > -1) {
            req.isAuthenticated = true;
            req.user = user;
            next();
          } 

          else {
            let error = new ApiError(403);

            next(error)
          }
        })
        .then(null, err => {
          let error = new ApiError(400, err);
          next(error)
        });
    }
  }

  /**
   * Get token from header
   */
  _getTokenFromHeader(req){
    if (req.body.authorization)
      return req.body.authorization

    if (req.headers.authorization){
      return req.headers.authorization;
    }

    if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
}

const $AuthService = new AuthService();
module.exports = $AuthService;