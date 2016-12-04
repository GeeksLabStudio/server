// module dependencies
const pretty 	= require('prettyjson');
global.core 	= require('./var');
global.config = require('./environment');
global.log 		= require('./logger');

require('./database');

console.log(
  'Config:\n' + '==================================\n' +
  pretty.render(config,{
    numberColor: 'yellow',
    keysColor: 'cyan',
    indent: 2
  })
  + '\n=================================='
)

if (config.env == 'development')
  log.dev('The server is in development mode.')
