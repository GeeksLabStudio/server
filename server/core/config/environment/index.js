var path = require('path');
var _ = require('lodash');
var _root = path.normalize(__dirname + '/../../../..');

const all = {
    env: process.env.NODE_ENV,

    process: {
        platform: process.platform
    },

    root: _root,


    session: {
        secret: 'server super klu4',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false
        }
    },

    logger: {
        path: '/logs'
    }

};

module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {}
);