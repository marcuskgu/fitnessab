// since we're attempting to create a functional ui in html we went with node.js instead of java
// please send thoughts and prayers

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');

var statsRouter = require('./routes/stats');
var bookingsRouter = require('./routes/bookings');
var classesRouter = require('./routes/classes');
var orderRouter = require('./routes/order');

var adminRouter = require('./routes/admin');
var adminClassesRouter = require('./routes/admin/classes');
var adminInstructorsRouter = require('./routes/admin/instructors');
var adminScheduleRouter = require('./routes/admin/schedule');


var db = require('./database/db.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

app.use('/stats', statsRouter);
app.use('/bookings', bookingsRouter);
app.use('/classes', classesRouter);
app.use('/order', orderRouter);

app.use('/admin', adminRouter);
app.use('/admin/classes', adminClassesRouter);
app.use('/admin/instructors', adminInstructorsRouter);
app.use('/admin/schedule', adminScheduleRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
