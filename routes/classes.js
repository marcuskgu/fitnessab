var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', db.checkMembership, db.classes, db.subclasses, function(req, res, next) {
    console.log(res.locals.classes);
    console.log(res.locals.subclasses);
    res.render('index', 
    { page: 'partials/classes',
      classes: res.locals.classes,
      subclasses: res.locals.subclasses });
}, function (err, req, res, next) {
    console.log('Not a member');
    res.render('index', { page: 'partials/notmember'});
});

router.post('/', db.schedule, db.checkSchedule, function(req, res, next) {
    res.render('index', 
    { page: 'partials/displayclasses',
      type: req.body.fakename, //used to be req.body.faketype for some reason, not sure why
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

router.post('/booking', db.doubleBooked, db.schedule, db.checkSchedule, function(req, res, next) { //case for double booking, passed to by db.makeBooking
  res.render('index', 
  { page: 'partials/displayclasses',
    type: req.body.fakename,
    schedule: res.locals.schedule,
    memberBookings: res.locals.memberBookings,
    bookedClass: res.locals.bookedClass,
    success: true,
    action: 'doubleBooked',
    time: req.body.faketime});
});

module.exports = router;