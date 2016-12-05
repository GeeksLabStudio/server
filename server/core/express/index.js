// module dependencies
const express           = require('express');
const morgan            = require('morgan');
const jwt               = require('express-jwt');
const cors              = require('cors');
const compression       = require('compression');
const expressValidator  = require('express-validator');
const errorhandler      = require('errorhandler')
const bodyParser        = require('body-parser');

// Creating Express Server
const app = express();

app.use(morgan('dev'));

app.set('port', config.port)
app.set('env', config.env)

if (config.env == 'development') { // using only in development
  app.use(errorhandler({
    log: (err,str,req) => {
      let title = 'Error in ' + req.method + ' ' + req.url

      log.error({
        title: title,
        message: str
      })
    }
  }));

  const expressStatusMonitor = require('express-status-monitor');
  app.get('/status', expressStatusMonitor());
}

app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

module.exports = app;