// authorization manager
// using this class methods will allow you to verify access

const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  let {
    secret,
    issuer,
    audience,
  } = config.jwt;

  let userProperty = 'tokenPayload';

  return ejwt({
    userProperty,
    secret,
    issuer,
    audience,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  })
};


exports.verifyToken = function(token){
  if (!token)
    return Promise.reject({
      msg: 'No token provided'
    })

  return new Promise((resolve,reject) => {
    let {
      secret,
      issuer,
      audience,
    } = config.jwt;

    jwt.verify(token, secret, {
      issuer,
      audience
    }, (err,decoded) => {
      if (err)
        reject(err)
      else
        resolve(decoded)
    });

  });
}

exports.signToken = function(obj){
  let secret = config.jwt.secret;

  let opts = {
    audience: config.jwt.audience,
    issuer: config.jwt.issuer
  }

  return jwt.sign(obj, secret, opts)
}