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
  //Logging comments
  console.log("Request made for " + req.baseURL);
  console.log("Body is as follows");
  console.log(req.body);
  next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Get Request");
  res.send('respond with a resource');
  next();
});

/* POST users listing. */
router.post('/create', urlencodedParser, function(req,res,next){
  console.log("Post Request - Create");
  addUser(req.body);
  // need error handling // TODO
  res.send('Successfully signed up user');
  next();
});

/* POST validate user */
router.post('/validate', urlencodedParser, function(req,res,next){
  console.log("Post Request - Validate");
  validateUserLogin(req.body).then(function(resolve,reject){
    if (resolve){
      //user is validated
      res.send("user is valid");
      next();
    }
    else {
      //user is invalid
      res.send("user is invalid");
      next();
    }
  });
  // change response based on validation token // TODO

});


module.exports = router;
