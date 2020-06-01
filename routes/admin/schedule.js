var express = require('express');
var router = express.Router();
var db = require('../../database/db.js');

router.get('/', db.classes, db.subclasses, function(req, res, next) {
    res.render('adminindex', 
    { page: 'partials/admin/schedule',
      classes: res.locals.classes,
      subclasses: res.locals.subclasses});
});

router.post('/', db.adminSchedule, db.getInstructors, db.getRooms, function(req, res, next) {
    res.render('adminindex', 
    { page: 'partials/admin/displayschedule',
      schedule: res.locals.schedule,
      instructors: res.locals.instructors,
      rooms: res.locals.rooms,
      type: req.body.className});
});

router.post('/book', db.createScheduleEntry, db.createInstructorBooking, db.adminSchedule, db.getInstructors, db.getRooms, function(req, res, next) {
    res.render('adminindex', 
    { page: 'partials/admin/displayschedule',
      schedule: res.locals.schedule,
      instructors: res.locals.instructors,
      rooms: res.locals.rooms,
      type: req.body.className});
});

router.post('/delete', db.deleteScheduleEntry, db.adminSchedule, db.getInstructors, db.getRooms, function(req, res, next) {
    res.render('adminindex', 
    { page: 'partials/admin/displayschedule',
      schedule: res.locals.schedule,
      instructors: res.locals.instructors,
      rooms: res.locals.rooms,
      type: req.body.className});
});

module.exports = router;