'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = require('./server');

log.server('Starting server...');

// Start server
server.listen(config.port, () => {
    log.server('Server started on %d, in %s mode',
        config.port,
        config.env
    );
});