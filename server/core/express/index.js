const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const jwt = require('express-jwt');

const compression = require('compression');
const expressStatusMonitor = require('express-status-monitor');
const expressValidator = require('express-validator');
const errorhandler = require('errorhandler')

const bodyParser = require('body-parser');

const path = require('path');

// Creating Express Server
const app = express();

app.use(morgan('dev'));

app.set('port', config.port)
app.set('env', config.env)

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({
    log: (err,str,req) => {
      let title = 'Error in ' + req.method + ' ' + req.url

      console.error({
        title: title,
        message: str
      })
    }
  }));
}

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept");
  res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Credentials', false);

  next();
})

app.get('/status', expressStatusMonitor());

app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(passport.initialize());


module.exports = app;