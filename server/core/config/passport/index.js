const _ = require('lodash');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      let error = new ApiError(400, err);
      return done(err);
    }

    if (!user) {
      let error = new ApiError(400, `Email ${email} not found.`)
      return done(null, false, error);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        let error = new ApiError(400, err);
        return done(error);
      }

      if (isMatch) {
        return done(null, user);
      }

      let error = new ApiError(400, 'Invalid email or password.' )
      return done(null, false, error);
    });
  });
}));
