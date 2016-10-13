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

/*
  Route not found middleware
  Creating error and passing it to error handler
*/
router.use(function(req, res, next) {
    var err = new ApiError(404, 'Page not found');
    next(err);
})

/*
  Error handling middleware
*/
router.use(function(err, req, res, next) {
    if (!(err instanceof ApiError))
      err = new ApiError(
        core.api.status.internalerr,
        'Unhandled Server Error'
      );

    // Error json response object
    let jsonErrorResponse = {
      status: err.status,
      error: {
        route: req.originalUrl,

      }
    }

    if (err.message)
      jsonErrorResponse.error.message = err.message;

    if (err.properties)
      jsonErrorResponse.error = Object.assign({}, err.properties, jsonErrorResponse.error);

    res
        .status(err.code)
        .json(jsonErrorResponse)
})

module.exports = router;