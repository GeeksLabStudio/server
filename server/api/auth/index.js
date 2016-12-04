// module dependencies
const express 		= require('express');
const router 			= express.Router();
const controller 	= require('./controller');
const config 			= require('../../core/config/api'); // should be removed
const auth 				= require('../../core/auth');

// profile
router.get(
	config.auth.profile.path,
	auth.apiAccess(config.auth.profile.permissions),
	controller.profile
);
// login
router.post(config.auth.login.path, controller.login);
// register
router.post(config.auth.register.path, controller.register);

module.exports = router;