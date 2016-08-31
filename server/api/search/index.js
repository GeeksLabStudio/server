'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    name: 'search',
    test: 'test'
  })
});

module.exports = router;