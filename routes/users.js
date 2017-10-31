var express = require('express');
var router = express.Router();
var addUser = require('../controllers/addUser');

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
  console.log("Post Request");
  addUser(req.body);
  // need error handling // TODO
  res.send('Successfully signed up user');
  next();
});


module.exports = router;
