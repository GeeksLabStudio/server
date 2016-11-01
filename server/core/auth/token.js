const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.signToken = function (obj){
  let secret = config.jwt.secret;

  let opts = {
    audience: config.jwt.audience,
    issuer: config.jwt.issuer
  }

  return jwt.sign(obj, secret, opts)
}

exports.verifyToken = function(token){
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
    }, (err,decoded) => {
      if (err){
        let error = new ApiError(400, err);
        reject(error)
      }
      else {
        User.findById(decoded.id)
          .then(user => {
            resolve(user)
          })
          .then(null, err => {
            let error = new ApiError(400, err)
            reject(error)
          })
      }
    });
  });
}