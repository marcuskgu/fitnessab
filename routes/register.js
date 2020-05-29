var express = require('express');
var router = express.Router();
var db = require('../database/db.js');
/*
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database/fitnessab.db');
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'partials/register', nomenu: true });
});

router.post('/', db.registerUser, function(req, res, next) {

  console.log('final stage begun, checking success');
      console.log('loading success page');
    res.render('index', 
    { page: 'partials/success', 
      ssn: req.body.socialSecurityNumber,
      nomenu: true});

  
  /*
  db.run('INSERT INTO Member (name, email, phoneNumber, socialSecurityNumber) VALUES(?, ?, ?, ?)', [name, email, phoneNumber, socialSecurityNumber], function(err) {
    if (err) {
      var matchingssn = socialSecurityNumber;
      res.render('index', 
      { page: 'partials/register', 
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phoneNumber,
        ssn: socialSecurityNumber,
        email: req.body.email
      });
      console.log(matchingssn)
      return console.log(err);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    res.render('index', { page: 'partials/success' });
  });
  */
}, function(err, req, res, next){
  res.render('index', 
  { page: 'partials/register', 
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phoneNumber,
    ssn: req.body.socialSecurityNumber,
    email: req.body.email,
    nomenu: true
  });
});
 /*
document.querySelector("#email").addEventListener('keydown', function() {
  var isValid = document.querySelector("#email");
  var email = isValid.value;
  console.log(email);
});
*/

module.exports = router;