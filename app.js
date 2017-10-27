var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//require database
var db = require('./controllers/connection.js');
//require controllers
var addUser = require('./controllers/addUser.js');

var app = express();

//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', function(req,res,next){
  console.log("You've reached our backend");
  db();
  addUser(FrontendUser);
});
//app.use('/users', users);
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("This is our backend and it's working!")
  var err = new Error('Not Found');
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
  res.render('error');
});
 */

 //assume right now this is the object coming from the frontend
 var FrontendUser = {
   username: "13mtfb",
   password: "13mtfb",
   nameFirst: "Matt",
   nameLast: "Burton",
   email: "13mtfb@queensu.ca",
   school: "Queens University"
 };

module.exports = app;
