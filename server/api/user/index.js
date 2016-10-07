'use strict';

var express 		= require('express');
var router 			= express.Router();
var controller 	= require('./controller');
var auth 				= require('../../core/auth');

router.get('/', auth.verifyToken, controller.profile);

module.exports = router;