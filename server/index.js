// module dependencies
const core 	= require('./core');
const api 	= require('./api');

core.app.use(api);

module.exports = core.app;