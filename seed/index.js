var seeder = require('mongoose-seed-plus');
var config = require('../server/core/config/environment/development');
var models = './server/models/';
 
// Connect to MongoDB via Mongoose 
seeder.connect(config.mongo.url, function() {
	// Users
  seeder.start(__dirname + '/data', [
    { path: models + 'User.js', name: 'User', clear: true }
  ], false);
});