var core = require('./core');
var api = require('./api');


core.app.use(api);

// var server = require('http').createServer();

module.exports = core.app;