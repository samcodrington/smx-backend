var express = require('express');
var router = express.Router();
var addUser = require('../controllers/addUser');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//All routing methods are mounted on /users/
router.all('*',function(req,res, next){
  console.log("You've reached our user");
  console.log(req.body);
  next();
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});
/* POST users listing. */
router.post('/', urlencodedParser, function(req,res,next){
  res.send('Successfully signed up user');
  
  addUser(req.body);
  // need error handling // TODO
  next();
});


module.exports = router;
