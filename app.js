var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (app.get('env') === 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync.create().init({ui:false,files:['./src'],logSnippet:false});
  app.use(require('connect-browser-sync')(bs));
}
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules/')));
app.use(express.static(path.join(__dirname, '/src/')));

app.use('/', require('./routes/index'));

app.get('*',function(req, res){
    res.sendFile(path.join(__dirname,app.get('env') === 'development'?'/src/index-jit.html':'/src/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('catch 404');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Page Not Found');
});

module.exports = app;
