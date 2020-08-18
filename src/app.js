var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var newsRouter = require('./routes/news');
var authMiddleware = require('./middlewares/auth');
var cors = require('cors')
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('/news', authMiddleware, newsRouter);

app.use(function(req, res, next) {
  const index = fs.readFileSync('./public/index.html').toString('utf-8');
  res.header('content-type', 'text/html')
  res.write(index);
  res.end();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  const { accept = '' } = req.headers
  if (accept === 'application/json') {
    res.json({
      message: err.message
    })
    return;
  }
  res.render('error');
});

module.exports = app;
