'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./controller');
const passport = require('passport');

const auth = require('../../core/auth')

router.get('/', auth.isAuthenticated, controller.check);

router.post('/', controller.check);

router.get('/login', controller.check)
router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;