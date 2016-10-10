var mongoose 	= require('mongoose');
var seeder 		= require('mongoose-seed-plus');
var config 		= require('../server/core/config/environment/development');
var models 		= './server/models/';

mongoose.Promise = global.Promise;
 
// Connect to MongoDB via Mongoose 
seeder.connect(config.mongo.url, function() {
	// Users
  seeder.start(__dirname + '/data', [
    { path: models + 'User.js', name: 'User', clear: true },
    { path: models + 'Article.js', name: 'Article', clear: true }
  ], false);
});