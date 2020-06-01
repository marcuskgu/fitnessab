var express = require('express');
var router = express.Router();
var db = require('../../database/db.js');

router.get('/', db.getInstructors, function(req, res, next) {
    res.render('adminindex', 
    { page: 'partials/admin/instructors',
      instructors: res.locals.instructors});
});

router.post('/edit', db.editInstructor, function(req, res, next) {
    res.redirect('/admin/instructors');
});

router.post('/delete', function(req, res, next) {

});

router.post('/add', db.addInstructor, function(req, res, next) {
    res.redirect('/admin/instructors');
});

module.exports = router;