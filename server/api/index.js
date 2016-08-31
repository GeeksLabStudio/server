'use strict';

var express = require('express');
var router = express.Router();

var ModulesController = require('./modules.controller');

const $modules = new ModulesController({
    router
});

router.get('/', function(req, res) {
  res.json({
    version: '0.0.1',
    name: 'server[alpha]',
    actions: $modules.actions
  })
});

$modules.init()
    .then(apiModules => {
        apiModules.forEach(action => {

            log.dev('Registering [/%s] api route ', action);

            router.use(`/${action}`, require(`./${action}`))
        })
    })
    .then(() => {

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

            res
                .status(err.status || 500)
                .json(err)
        })

    })

module.exports = router;