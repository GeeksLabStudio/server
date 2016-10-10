'use strict';

var express 		= require('express');
var router 			= express.Router();
var controller 	= require('./controller');
var config 			= require('../../core/config/api');

router.get(
	config.articles.path,
	controller.articles
);

module.exports = router;