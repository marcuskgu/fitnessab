var express = require('express');
var router = express.Router();
var db = require('../../database/db.js');

router.get('/', db.subclasses, function(req, res, next) {
    res.render('adminindex', 
    { page: 'partials/admin/classes',
      classes: res.locals.subclasses});
});

router.post('/add', db.addClass, function(req, res, next) {
    res.redirect('/admin/classes');
})

module.exports = router;