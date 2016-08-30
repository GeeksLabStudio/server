var winston = require('winston');
var path = require('path');
var fs = require('fs');

var logs = path.join(config.root, config.logger.path);

if (!fs.existsSync(logs)) {
  console.log(`${config.logger.path} does not exists. Creating new folder...`);
  fs.mkdirSync(logs);
}

var settings = {
  levels: {
    dev: 0,
    info: 1,
    server: 1,
    error: 1
  },
  colors: {
    dev: 'grey',
    info: 'blue',
    server: 'yellow',
    error: 'red'
  }
};

var logger = module.exports = new (winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      colorize: true
    }),
    new(winston.transports.File)({
      filename: path.join(config.root, config.logger.path, 'server.log'),
      level: 'error',
      maxsize: 1024 * 1024 * 10 // 10 MB
    })
  ],
  levels: settings.levels,
  colors: settings.colors
});