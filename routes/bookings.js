var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', function(req, res, next) {
    res.render('index', 
        { page: 'partials/bookings',
          userid: req.app.locals.userid });
});

module.exports = router;