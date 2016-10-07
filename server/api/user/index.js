'use strict';

var express 		= require('express');
var router 			= express.Router();
var controller 	= require('./controller');
var auth 				= require('../../core/auth');
var config 			= require('../../core/config/api');

// profile
router.get(
	config.user.profile.path, 
	auth.getAccessVerifier(config.user.profile.permissions), 
	controller.profile
);

module.exports = router;