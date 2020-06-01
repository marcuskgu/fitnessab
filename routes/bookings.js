var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', db.checkUserSchedule, function(req, res, next) {
    res.render('index', 
        { page: 'partials/bookings',
          userSchedule: res.locals.userSchedule,
          type: 'temp',
          userid: req.app.locals.userid });
});

router.post('/booking', db.makeBooking, db.checkUserSchedule, function(req, res, next) {
  res.render('index', 
      { page: 'partials/bookings',
        userSchedule: res.locals.userSchedule,
        type: req.body.fakename,
        action: req.body.fakeaction,
        time: req.body.faketime,
        success: true,
        userid: req.app.locals.userid });
});

module.exports = router;