'use strict';

var express 		= require('express');
var router 			= express.Router();
var controller 	= require('./controller');
var config 			= require('../../core/config/api');

router.get(
	config.articles.path,
	controller.articles
);

router.get(
	config.articles.children.article.path,
	controller.article
);

module.exports = router;