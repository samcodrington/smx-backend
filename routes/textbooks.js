var express = require('express');
var router = express.Router();


//Add textbook Methods
var textbookSearch = require('../controllers/searchTextbook');
var searchTextbook = textbookSearch.searchTextbook;
var textbookPost = require('../controllers/postTextbook');
var postTextbook = textbookPost.postTextbook;


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//All routing methods are mounted on /textbooks/
router.all('*',function(req,res, next){
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin, searchfield');


  //Logging comments
  console.log("Request made for (URL) in textbook " + req.baseURL);
  console.log("Request made for (PATH) in textbook " + req.path);
  next();
});


/* GET textbook search. */
router.get('/search', urlencodedParser, function(req,res,next){
  console.log("GET request - search textbooks");
  var searchString =req.headers.searchfield;
  searchTextbook(searchString).then(function(resolve){
    console.log("resolve:" + JSON.stringify(resolve));
    res.send(resolve);
    console.log("Successfully returned textbooks");
    next();
  }).catch( function(err){
    // need error handling
  console.log(err);
  res.send('-1');
  console.log("Error no textbooks returned");
  });
});

/* POST textbook post */
router.post('/post', urlencodedParser, function(req,res,next){
  console.log("POST request - post textbooks");
  console.log("textbook to save: ", req.body.textbook);
  //console.log("USER DATA: ");
  //console.log(JSON.stringify(req.user));
  postTextbook(req.body.textbook, req.user).then(function(resolve){
    console.log("resolve:" + JSON.stringify(resolve));
    res.send(resolve);
    console.log("Successfully posted textbook");
    next();
  }).catch( function(err){
    // need error handling
  console.log(err);
  res.send('-1');
  console.log("Error textbook not posted");
  });
})



module.exports = router;
