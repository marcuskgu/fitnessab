const sqlite3 = require('sqlite3').verbose();

var sql = new sqlite3.Database('./database/fitnessab.db');

//module.exports = db;
var status = true;
module.exports.registerUser = function (req, res, next) {

    var name = req.body.fname + ' ' + req.body.lname;
    var socialSecurityNumber = req.body.socialSecurityNumber;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;

    console.log('initializing success value');
    res.locals.success = true;

    sql.run('INSERT INTO Member (name, email, phoneNumber, socialSecurityNumber) VALUES(?, ?, ?, ?)', [name, email, phoneNumber, socialSecurityNumber], function(err) {
        if (err) {
          var matchingssn = socialSecurityNumber;
          console.log('db.js: ' + matchingssn);
          console.log('db.js: ' + err);
          res.locals.success = false;
          console.log('db.js: ' + res.locals.success);
          next(err);
        } else {
        // get the last insert id
        console.log('db.js: ' + `A row has been inserted with rowid ${this.lastID}`);
        next();
        }
    });
    console.log('passed sqlite stage, going next');
}

module.exports.login = function (req, res, next) {
  var socialSecurityNumber = req.body.socialSecurityNumber;

  sql.get('SELECT * FROM Member WHERE socialSecurityNumber = ?', [socialSecurityNumber], function(err, row) {
    if (err) {
      console.log(socialSecurityNumber + ' does not exist')
      next(err);
    } else {
      res.locals.userdata = row;
      console.log('user exists:\n' + row);
      next();
    }
  });
}