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

module.exports.benefits = function (req, res, next) {
  sql.all('SELECT * FROM Benefits', [], function(err, rows) {
    if (err) {
      console.log(err);
    } 
    console.log(rows);
    res.locals.benefits = rows;
    next();
  });
}

module.exports.prices = function (req, res, next) {
  sql.all('SELECT * FROM MembershipTier', [], function(err, rows) {
    if (err) {
      console.log(err);
    }
    res.locals.prices = rows;
    next();
  });
}

module.exports.durations = function (req, res, next) {
  sql.all('SELECT * FROM MembershipDays', [], function(err, rows) {
    if (err) {
      console.log(err);
    }
    res.locals.durations = rows;
    next();
  });
}

module.exports.facilities = function (req, res, next) {
  sql.all('SELECT name FROM Facility', [], function(err, rows) {
    if (err) {
      console.log(err);
    }
    res.locals.facilities = rows;
    next();
  });
}

module.exports.regorder = function (req, res, next) {
  var memberSSN = req.app.locals.userid;
  var tier = req.body.faketier;
  var durationDays = req.body.fakeduration;
  var homeGym = req.body.fakegym;
  sql.run(`INSERT INTO Membership (memberSSN, tier, regDate, durationDays, homeGym) VALUES(?, ?, Date('now'), ?, ?)`, 
    [memberSSN,
     tier,
     durationDays,
     homeGym
    ], function(err) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        next();
      }
    });
}

module.exports.checkMembership = function (req, res, next) {
  var memberSSN = req.app.locals.userid;
  sql.get(`SELECT * FROM Membership WHERE memberSSN = ? AND (regDate BETWEEN DATE('now', '-'||durationDays||' days') AND DATE('now'))`, [memberSSN], function(err, result) {
    if (err) {
      console.log('Error! \n' + err);
      next(err);
    } else if (!result) {
      err = 'Membership not found';
      console.log(err);
      next(err);
    } else {
      console.log('Membership result: ' + result);
      res.locals.profile = result;
      console.log('Profile: ' + res.locals.profile);
      next();
    }
  });
}

module.exports.classes = function (req, res, next) {
  sql.all(`SELECT DISTINCT type FROM Classes`, [], function(err, rows) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.locals.classes = rows;
      next();
    }
  });
}

module.exports.subclasses = function (req, res, next) {
  sql.all(`SELECT name, type FROM Classes`, [], function(err, rows) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.locals.subclasses = rows;
      next();
    }
  });
}

module.exports.schedule = function (req, res, next) {
  var query = 
  `select classTime, durationMin, instructorName, facility, classRoom 
  from (
    select * from (
      select * from Schedule as S 
      inner join InstructorBooking as IB 
      on S.classTime = IB.classTime 
      where S.classRoom = IB.classRoom)
    inner join Instructor 
    on socialSecurityNumber = instructorSSN)
  inner join Room 
  on roomName = classRoom
  where className = ?
  and (classTime between DATETIME('now') and DATETIME('now', '+31 days'))`;

  var className = req.body.fakename;
  sql.all(query, [className], function(err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(rows);
      console.log(req.body.fakename);
      res.locals.schedule = rows;
      next();
    }
  });
}

module.exports.checkSchedule = function (req, res, next) {
  var className = req.body.fakename;
  var memberSSN = req.app.locals.userid;
  var query = `
  select distinct M.memberSSN, S.classTime, S.classRoom
  from Schedule as S
  inner join MemberBooking as M
  on S.classTime = M.classTime
  where S.className = ?
  and memberSSN = ?
  and S.classRoom = M.classRoom
  and (M.classTime between DATETIME('now') and DATETIME('now', '+31 days'));`;
  sql.all(query, [className, memberSSN], function(err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(rows);
      res.locals.memberBookings = rows;
      next();
    }

  });
}

module.exports.makeBooking = function (req, res, next) {
  var classRoom = req.body.fakeroom;
  var classTime = req.body.faketime;
  var memberSSN = req.app.locals.userid;

  if (req.body.fakeaction == "cancel") {
    var query = `
    delete from MemberBooking
    where memberSSN = ?
    and classTime = ?
    and classRoom = ?`;
  } else {
    var query = `
    insert into MemberBooking
    values(?, ?, ?)`;
  }
  sql.run(query, [memberSSN, classTime, classRoom], function (err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}