var express = require('express');
var morgan = require('morgan');

// var compression = require('compression');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');

var path = require('path');

var app = express();

// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(cookieParser());



app.use(morgan('dev'));

module.exports = app;