// module dependencies
const path  = require('path');
const _     = require('lodash');
const _root = path.normalize(__dirname + '/../../../..');

const all = {
  env: process.env.NODE_ENV,

  process: {
    platform: process.platform
  },

  root: _root,

  logger: {
    path: '/logs'
  },

  jwt: {
    secret: 'SECRET KEY',
    issuer: 'accounts.test.test',
    audience: 'gls.com'
  }
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
