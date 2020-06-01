var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

router.get('/', db.checkMembership, function(req, res, next) {
    var expDate = new Date(res.locals.profile.regDate);
    expDate.setDate(expDate.getDate() + res.locals.profile.durationDays);
    res.locals.profile.expDate = expDate.toISOString().substring(0, 10); 
    res.render('index', 
    { page: 'partials/profile',
      profile: res.locals.profile });
}, function(err, req, res, next) {
    console.log('Something went wrong in profile.js...');
    res.render('index', { page: 'partials/notmember'});
});

module.exports = router;