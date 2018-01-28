var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const passport = require('passport');
const passportSetup = require('./config/passport');
const session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var textbooks = require('./routes/textbooks');
var auth = require('./routes/auth');

//require database
var db = require('./controllers/connection.js');

var app = express();

//allow origin variable for dev and providing
const allow_origin_url = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";


//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'blahblah', cookie: { maxAge: 5*60*1000} })); // maxAge is 5 minutes in ms

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", allow_origin_url)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.use('*', function(req,res,next){
  console.log("You've reached our backend");
  //ensure database connection was succesfull
  if (db.connection.readyState){
    console.log("database ready");
  }
  else {
    console.log("database unavailable");
  }
  //refresh user cookie if user still logged in
  if (req.user){
    console.log("User Logged in until: " + req.session.cookie.expires);
    req.session.touch();
    console.log("Updated cookie to: " + req.session.cookie.expires);
  }
  else console.log("No User logged in");
  next();
});

app.use('/textbooks/',textbooks); //All textbook requests got to routes/textbooks.js
app.use('/users/', users); //All user requests go to routes/users.js
app.use('/auth/', auth);
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

module.exports = app;
