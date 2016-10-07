// authorization manager
// using this class methods will allow you to verify access
const ejwt = require('express-jwt');
const jwt = require('jsonwebtoken');
let User = require('../../models/User');

exports.getAccessVerifier = function(accessLevel){
  return (req, res, next)=>{
    let token = getTokenFromHeader(req);

    verifyToken(token)
      .then(user => {
        let role = user.profile.role;

        if (accessLevel.indexOf(role) >= 0) {
          req.user = user;
          next();
        } else {
          let error = new Error({
            msg: 'permission de'
          })

          next(error)
        }
      })
      .then(null, err => {
        next(err)
      });
  }
}

exports.signToken = function(obj){
  let secret = config.jwt.secret;

  let opts = {
    audience: config.jwt.audience,
    issuer: config.jwt.issuer
  }

  return jwt.sign(obj, secret, opts)
}

function verifyToken(token){
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
      else {
        User.findById(decoded.id)
          .then(user => {
            resolve(user)
          })
          .then(null, err => {
            reject(err)
          })
      }
    });
  });
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

  return null;
}