// authorization manager
// using this class methods will allow you to verify access
let User = require('../../models/User');

let $token = require('./token');

// AUTH MIDDLEWARES

exports.getAccessVerifier = function(accessLevel){
  return (req, res, next) => {
    let token = getTokenFromHeader(req);

    $token.verifyToken(token)
      .then(user => {
        let role = user.profile.role;

        if (accessLevel.indexOf(role) >= 0) {
          req.isAuthenticated = true;
          req.user = user;
          next();
        } else {
          let error = new ApiError(
            core.api.status.denied,
            'You not allowed to do this'
          );

          next(error)
        }
      })
      .then(null, err => {
        let error = new ApiError(400, err);
        next(error)
      });
  }
}

// AUTH PUBLIC METHODS

exports.authenticate = function(strategy, credentials){

  let email = credentials.email.toLowerCase();
  let password = credentials.password;

  return new Promise((resolve,reject) => {

    User.findOne({
      email
    }).then(user => {
      if (user){
        log.dev(`AuthService: ${email} exist, checking pwd`)
        
        // user exist - then checking password
        let isMatch = user.password == password;

        if (isMatch){
          // if password match
          log.dev(`AuthService: ${user.id} authenticated`)
          resolve(user)
        } else {
          // if password not matching
          let error = new ApiError(400, 'Invalid email or password')
          reject(error)
        }
      } else {
        // no user found
        let error = new ApiError(400, 'Invalid email or password')
        reject(error)
      }
    }).then(null, err => {
      // some other db error
      let error = new ApiError(400, err)
      reject(error)
    })

  })

}


exports.simple_authenticate = function(strategy, credentials){

  let email = credentials.email.toLowerCase();
  let password = credentials.password;

  return User.findOne({
      email
    })
    .then(user => {
      // checking is user exist
      return user 
        ? user 
        : Promise.reject()
    })
    .then(user => {
      // checking password
      return user.comparePassword(password) 
        ? user
        : Promise.reject()
    })
    .then(null, error => {
      return Promise.reject(error || new ApiError(400, 'Invalid email or password'))
    })
}

exports.registrate = function(strategy, credentials){
  let email = credentials.email.toLowerCase();
  let password = credentials.password;

  return new Promise((resolve,reject) => {
    User.findOne({
      email
    }).then(isExist => {
      if (isExist){
        let error = new ApiError(400, 'User with same email already exist');
        reject(error)
      } else {
        // creating new user
        return new User({
          email,
          password
        }).save()
      }


    }).then(user => {
      log.dev(`AuthService: ${user.id} registered`)
      resolve(user)
    }).then(null, err => {
      let error = new ApiError(400, err)
      reject(error)
    })
  })
}

exports.signToken = $token.signToken;
exports.verifyToken = $token.verifyToken;


// AUTH PRIVATE METHODS

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