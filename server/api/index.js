'use strict';

var express = require('express');
var router = express.Router();

var ModulesController = require('./modules.controller');

const $modules = new ModulesController();

router.get('/', function(req, res) {
  res.json({
    version: '0.0.1',
    name: 'server[alpha]',
    actions: $modules.actions
  })
});

$modules.actions.forEach(action => {

  log.dev('Registering [/%s] api route ', action);

  router.use(`/${action}`, require(`./${action}`))
})

router.use(function(req, res, next) {
    // route not found 404
    // invoke error
    var err = {
     status: 404
    }
    next(err);
})

router.use(function(err, req, res, next) {
    // main
    // error handler
    err.route = req.originalUrl;
    err.status = err.status || 500;

    res
        .status(err.status)
        .json(err)
})

module.exports = router;