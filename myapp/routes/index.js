var express = require('express');
var router = express.Router();

var pop = require('./../data/pop.json');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sunrise' });
});

router.get('/pop', function(req, res, next) {
  res.render('pop', pop);
});

router.get('/pdp', function(req, res, next) {
  res.render('pdp', { title: 'Sunrise - Product Detail Page' });
});

module.exports = router;
