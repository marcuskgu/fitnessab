var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', db.classes, db.subclasses, function(req, res, next) {
    console.log(res.locals.classes);
    console.log(res.locals.subclasses);
    res.render('index', 
    { page: 'partials/classes',
      classes: res.locals.classes,
      subclasses: res.locals.subclasses });
});

router.post('/', db.schedule, db.checkSchedule, function(req, res, next) {
    res.render('index', 
    { page: 'partials/displayclasses',
      type: req.body.faketype,
      schedule: res.locals.schedule,
      memberBookings: res.locals.memberBookings});
});

router.post('/booking', db.makeBooking, db.schedule, db.checkSchedule, function(req, res, next) {
    res.render('index', 
    { page: 'partials/displayclasses',
      type: req.body.fakename,
      schedule: res.locals.schedule,
      memberBookings: res.locals.memberBookings,
      success: true,
      action: req.body.fakeaction,
      time: req.body.faketime});
});

module.exports = router;