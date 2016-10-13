require('./config');

const express = require('./express')
const errors = require('./errors')

global.ApiError = errors.ApiError;

module.exports = {
  app: express
};
