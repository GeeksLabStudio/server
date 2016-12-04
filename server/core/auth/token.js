// module dependencies
const jwt   = require('jsonwebtoken');
const User  = require('../../models/User');

/**
 * Token service
 */
class TokenService {
  /**
   * Sign a token
   */
  signToken(obj){
    let secret = config.jwt.secret;

    let opts = {
      audience: config.jwt.audience,
      issuer: config.jwt.issuer
    }

    return jwt.sign(obj, secret, opts)
  }

  /**
   * Check a token from the request
   */
  verifyToken(token){
    if (!token){
      let error = new ApiError(400, 'No token provided')
      return Promise.reject(error)
    }

    return new Promise((resolve,reject) => {
      let {
        secret,
        issuer,
        audience,
      } = config.jwt;

      jwt.verify(token, secret, {
        issuer,
        audience
      }, (err, decoded) => {
        if (err){
          let error = new ApiError(400, 'invalid token');
          reject(error)
        }
        
        else {
          User.findById(decoded.id)
            .then(user => {
              resolve(user)
            })
            .then(null, err => {
              let error = new ApiError(400, 'user wasn\'t found or token is incorrect')
              reject(error)
            })
        }
      });
    });
  }
}

const $TokenService = new TokenService();
module.exports = $TokenService;