var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connection.on('open', function() {
  // callback();
  log.info('Database connection opened ✓');
});

mongoose.connection.on('error', function(err) {
  // callback(err);
  log.error('Database connection error: %s. Retrying to connect in 15 seconds...', err.message);

  setTimeout(function(){

    mongoose.connect(config.mongo.url, config.mongo.options);

  },15 * 1000);

});

// Connect to database
if (!mongoose.connection.db)
  mongoose.connect(config.mongo.url, config.mongo.options);