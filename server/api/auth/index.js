'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/', function(req, res) {
  res.json({
    name: 'auth',
    test: 'test'
  })
});

router.get('/login', controller.check)
router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;