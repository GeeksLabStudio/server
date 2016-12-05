'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = require('./server');

log.server('Starting server...');

// Start server
server.listen(server.get('port'), () => {
  log.server('Server started on %d, in %s mode',
    server.get('port'),
    server.get('env')
  );
});