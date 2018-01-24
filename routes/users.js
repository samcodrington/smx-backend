var express = require('express');
var router = express.Router();

//Add userMethods
var userMethods = require('../controllers/addUser');
var addUser = userMethods.addUser;
var validateUserLogin = userMethods.validateUserLogin;

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//All routing methods are mounted on /users/
router.all('*',function(req,res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');


  //Logging comments
  console.log("Request made for (URL) " + req.baseURL);
  console.log("Request made for (PATH) " + req.path);
  console.log("Body is as follows");
  console.log(req.body);
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Get Request");
  res.send('respond with a resource');
  next();
});

/* POST users listing. */
router.post('/create', urlencodedParser, function(req,res,next){
  console.log("Post Request - Create");
  addUser(req.body).then(function(resolve){
      //user added Successfully
      res.send("Successfully signed up user");
      console.log("Successfully signed up user");
      next();
    }).catch( function(err){
      // need error handling
    console.log(err);
    res.send("Unsuccessfuly signed up user");
    console.log("Unsuccessfuly signed up user");
  });
});

/* POST validate user */
router.post('/validate', urlencodedParser, function(req,res,next){
  console.log("Post Request - Validate");
  validateUserLogin(req.body).then(function(resolve){
    if (resolve){
      //user is validated
      console.log("user is valid");
      res.send("user is valid");
      next();
    }
    else {
      //user is invalid
     return Promise.reject("user is invalid");
      res.send("user is invalid");
    }
  }).catch (function(err){
      console.log(err);
      res.send("error");
  });
  // change response based on validation token // TODO
});


module.exports = router;
