const sqlite3 = require('sqlite3').verbose();

var sql = new sqlite3.Database('./database/fitnessab.db');

sql.get("PRAGMA foreign_keys = ON")

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

  sql.get('SELECT EXISTS (SELECT * FROM Member WHERE socialSecurityNumber = ?) AS userfound', [socialSecurityNumber], function(err, row) {
    if (err) {
      console.log(socialSecurityNumber + ' does not exist')
      next(err);
    } else if (row.userfound > 0) {
      //res.locals.userdata = row;
      console.log('user exists:\n' + socialSecurityNumber);
      next();
    } else {
      err = "User does not exist";
      console.log(row);
      console.log(typeof row);
      console.log(row.userfound);
      next(err);
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
  sql.all(`SELECT * FROM Classes`, [], function(err, rows) {
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
  `select classTime, durationMin, instructorName, facility, classRoom, className 
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

  var className = req.body.fakename; //from classes.ejs
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
  } else if (req.body.fakeaction == "book") {
    var query = `
    insert into MemberBooking
    values(?, ?, ?)`;
  } else {
    err = "Invalid action, must be 'book' or 'cancel'";
    console.log(err);
    next(err);
  }
  sql.run(query, [memberSSN, classTime, classRoom], function (err) {
    if (err) {
      console.log(err);
      if (err.errno == 19) {
        console.log('Time: ' + classTime + '\nRoom: ' + classRoom)
        next('route')
      } else {
        next(err);
      }
    } else {
      next();
    }
  });
}

module.exports.doubleBooked = function (req, res, next) {
  console.log('Checking for double booked class...')

  var classTime = req.body.faketime;
  var memberSSN = req.app.locals.userid;

  console.log(classTime + ' ' + memberSSN)

  var query = `
  select className, classTime, facility from Schedule
  inner join (
    select * from MemberBooking
    inner join Room
    on classRoom = roomName)
  using(classTime, classRoom)
  where memberSSN = ?
  and classTime = ?`;

  sql.get(query, [memberSSN, classTime], function (err, row) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(row);
      res.locals.bookedClass = row;
      next();
    }
  });
}

module.exports.checkUserSchedule = function (req, res, next) {
  var query = `
  select className, classTime, instructorName, facility, classRoom from (
    select * from Schedule
    inner join (
      select * from MemberBooking
      inner join (
        select * from InstructorBooking
        inner join Instructor
        on instructorSSN = socialSecurityNumber)
      using(classTime, classRoom))
    using(classTime, classRoom))
  inner join Room
  on classRoom = roomName
  where memberSSN = ?
  and (classTime between DATETIME('now') and DATETIME('now', '+31 days'))`;
  var memberSSN = req.app.locals.userid;

  sql.all(query, [memberSSN], function (err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.locals.userSchedule = rows;
      console.log('User booked number of classes: ' + rows.length)
      next();
    }
  });
}

module.exports.getInstructors = function (req, res, next) {
  var query = `
  select * from Instructor order by instructorName`;

  sql.all(query, [], function (err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.locals.instructors = rows;
      next();
    }
  });
}

module.exports.addInstructor = function (req, res, next) {
  var query = `
  insert into Instructor values(?, ?, ?, ?)`;
  var instructorName = req.body.instructorName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var socialSecurityNumber = req.body.socialSecurityNumber;

  sql.run(query, [instructorName, email, phoneNumber, socialSecurityNumber], function (err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}

module.exports.editInstructor = function (req, res, next) {
  var query = `
  update Instructor
  set instructorName = ?,
  email = ?,
  phoneNumber = ?
  where socialSecurityNumber = ?`;
  var instructorName = req.body.instructorName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var socialSecurityNumber = req.body.socialSecurityNumber;

  sql.run(query, [instructorName, email, phoneNumber, socialSecurityNumber], function (err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}

module.exports.adminSchedule = function (req, res, next) {
  var query = `
  select * from Schedule
  inner join (
	  select classTime, classRoom, instructorName, instructorSSN 
	  from InstructorBooking 
	  inner join Instructor 
	  on instructorSSN = socialSecurityNumber)
  using (classTime, classRoom)
  where className = ?`;

  var className = req.body.className;

  sql.all(query, [className], function (err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.locals.schedule = rows;
      next();
    }
  });
}

module.exports.getRooms = function (req, res, next) {
  var query = `
  select * from Room
  order by facility, roomName`;

  sql.all(query, [], function (err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.locals.rooms = rows;
      next();
    }
  });
}

module.exports.createScheduleEntry = function (req, res, next) {
  var query = `
  insert into Schedule
  values(?, ?, ?, 60)`;

  var classRoom = req.body.rooms;
  var className = req.body.className;
  var classTime = req.body.date + ' ' + req.body.time;
  
  sql.run(query, [classRoom, className, classTime], function(err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}

module.exports.createInstructorBooking = function (req, res, next) {
  var query = `
  insert into InstructorBooking
  values(?, ?, ?)`;

  var classTime = req.body.date + ' ' + req.body.time;
  var instructorSSN = req.body.instructors;
  var classRoom = req.body.rooms;

  sql.run(query, [classTime, instructorSSN, classRoom], function(err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}

module.exports.deleteScheduleEntry = function (req, res, next) {
  var classTime = req.body.fclassTime;
  var classRoom = req.body.fclassRoom;

  var query = `
  delete from MemberBooking
  where classTime = ?
  and classRoom = ?`;

  sql.run(query, [classTime, classRoom], function(err) {
    if (err) {
      console.log('failed to delete from MemberBooking:');
      console.log(err);
    }
  });

  query = `
  delete from InstructorBooking
  where classTime = ?
  and classRoom = ?`;

  sql.run(query, [classTime, classRoom], function(err) {
    if (err) {
      console.log('failed to delete from InstructorBooking:');
      console.log(err);
    }
  });

  query = `
  delete from Schedule
  where classTime = ?
  and classRoom = ?`;

  sql.run(query, [classTime,classRoom], function(err) {
    if (err) {
      console.log('failed to delete from Schedule:');
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}

module.exports.addClass = function (req, res, next) {
  var query = `
  insert into Classes
  values(?, ?, 50)`;

  var type = req.body.type;
  var name = req.body.name;

  sql.run(query, [type, name], function(err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      next();
    }
  });
}