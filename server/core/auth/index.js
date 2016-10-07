// authorization manager
// using this class methods will allow you to verify access

const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');

exports.verifyToken = function(req, res, next){
  var token = getTokenFromHeader(req);

  if (!token) {
    let error = new Error({
      msg: 'token is absent'
    });

    next(error);
  }
    
  let {
    secret,
    issuer,
    audience,
  } = config.jwt;

  jwt.verify(token, secret, {
    issuer,
    audience
  }, (err,decoded) => {
    if (err) {
      let error = new Error({
        msg: 'invalid token'
      });

      next(error);
    } else {
      req.userID = decoded.id;
      next();
    }
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

function getTokenFromHeader(req){
  if (req.body.authorization)
    return req.body.authorization

  if (req.headers.authorization){
    return req.headers.authorization;
  }

  if (req.query && req.query.token) {
    return req.query.token;
  }

  return null
}