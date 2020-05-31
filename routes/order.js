var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', db.benefits, db.prices, db.facilities, db.durations, function(req, res, next) {
    console.log(res.locals.benefits);
    res.render('index', 
    { page: 'partials/order',
      userid: req.app.locals.userid,
      benefits: res.locals.benefits,
      prices: res.locals.prices,
      facilities: res.locals.facilities,
      durations: res.locals.durations,
      nomenu: true });
});

router.post('/', db.regorder, function(req, res, next) {
  res.render('index', 
  { page: 'partials/profile',
    userid: req.app.locals.userid
  });
}, function(err, req, res, next) {
  res.render('index', 
  { page: 'partials/profile'});
});

module.exports = router;