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
      colorize: true,
      timestamp: function(){
        // TODO
        let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];
        return `[\u001b[90m${time}\u001b[39m]`
      },
      formatter: function(options){
        let timestamp = options.timestamp();
        let level = applyColor(options.level);
        let message = options.message || '';
        let meta = (options.meta && Object.keys(options.meta).length) ? '\n\t'+ JSON.stringify(options.meta) : '';

        return `${timestamp} [${level}] ${message} ${meta}`
      }
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

function applyColor(level){
  let color = settings.colors[level]
  let val = styles[color];
  
  return `\u001b[${val[0]}m${level}\u001b[${val[1]}m`
}

const styles = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39]
}