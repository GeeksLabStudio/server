var mongoose = require('mongoose');

mongoose.connection.on('open', function() {
  // callback();
  log.info('Database connection opened');
});

mongoose.connection.on('error', function(err) {
  // callback(err);
  log.error('Database connection error:', err.message);
});

// Connect to database
if (!mongoose.connection.db)
  mongoose.connect(config.mongo.url, config.mongo.options);