'use strict';

var express 		= require('express');
var router 			= express.Router();
var controller 	= require('./controller');
var config 			= require('../../core/config/api');
var auth 				= require('../../core/auth');

// profile
router.get(
	config.auth.profile.path, 
	auth.getAccessVerifier(config.auth.profile.permissions), 
	controller.profile
);
router.post(config.auth.login.path, controller.login);
router.post(config.auth.register.path, controller.register);

module.exports = router;