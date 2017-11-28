var express = require('express');
var router = express.Router();


//Add textbook Methods
var textbookMethods = require('../controllers/searchTextbook');
var searchTextbook = textbookMethods.searchTextbook;



var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//All routing methods are mounted on /textbooks/
router.all('*',function(req,res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin, searchfield');


  //Logging comments
  console.log("Request made for (URL) in textbook " + req.baseURL);
  console.log("Request made for (PATH) in textbook " + req.path);
  console.log("searchField is as follows");
  console.log(req.headers.searchfield);
  next();
});


/* GET textbook search. */
router.get('/search', urlencodedParser, function(req,res,next){
  console.log("GET request - search textbooks");
  var searchString =req.headers.searchfield;
  searchTextbook(searchString).then(function(resolve){
    console.log("resolve:" + JSON.stringify(resolve));
    res.send(JSON.stringify(resolve));
    console.log("Successfully returned textbooks");
    next();
  }).catch( function(err){
    // need error handling
  console.log(err);
  res.send("Error no textbooks returned");
  console.log("Error no textbooks returned");
  });
});

module.exports = router;
