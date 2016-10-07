'use strict';

var express 		= require('express');
var router 			= express.Router();
var controller 	= require('./controller');
var config 			= require('../../core/config/api');

router.post(config.login.path, controller.login)
router.post(config.register.path, controller.register)

module.exports = router;