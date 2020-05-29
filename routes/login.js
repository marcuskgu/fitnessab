var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', function(req, res, next) {
    res.render('index', { page: 'partials/login', nomenu: true });
  });

router.post('/', db.login, function(req, res, next) {
    //app.locals.userid = req.body.socialSecurityNumber
    res.render('index',
     { page: 'partials/profile',
       name: res.locals.userdata.name });
  }, function(err, req, res, next) {
    res.render('index', 
     { page: 'partials/login',
       ssn: req.body.socialSecurityNumber,
       nomenu: true});
  });

module.exports = router;