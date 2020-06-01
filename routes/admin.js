var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', function(req, res, next) {
    res.render('adminindex', { page: 'partials/admin/landing'});
});

module.exports = router;