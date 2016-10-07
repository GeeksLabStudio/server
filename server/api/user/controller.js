const passport  = require('passport');
const User      = require('../../models/User');

module.exports.profile = function(req, res, next) {
  let _id = req.user._id;

  User.findById(_id)
    .select('profile -_id')
    .then(user => {
      res.json({
        status: 'ok',
        user
      })
    })
    .then(null, err => {
      next(err)
    })
}