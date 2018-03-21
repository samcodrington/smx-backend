var express = require('express');
var router = express.Router();


//Add textbook Methods
var textbookSearch = require('../controllers/searchTextbook');
var searchTextbook = textbookSearch.searchTextbook;
var textbookPost = require('../controllers/postTextbook');
var postTextbook = textbookPost.postTextbook;
var getTextbook = require('../controllers/getTextbook');
var getOneTextbook = getTextbook.getOneTextbook;
var deleteTextbook = require('../controllers/deleteTextbook');
var deleteTextbookFromUser = deleteTextbook.deleteTextbookFromUser;

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//All routing methods are mounted on /textbooks/
router.all('*',function(req,res, next){

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
  res.status(401).send("unable to post textbook: " + err);
  console.log("Error textbook not posted");
  });
})


/* GET one textbook */
router.get('/get/:ID', urlencodedParser, function(req,res,next){
  console.log("GET request - get a textbook");
  getOneTextbook(req.params.ID).then(function(resolve){
    console.log("resolve: " + JSON.stringify(resolve));
    res.send(resolve);
    console.log("Successfully getted textbook");
    next();
  }).catch( function(err){
    // need error handling
    console.log(err);
    res.send('-1');
    console.log("Error textbook not posted");
  });
})

/** DELETE one textbook -- sold */
router.delete('/delete/:ID', urlencodedParser, function(req,res,next){
  console.log("DELETE request - Mark Textbook sold");
  if(req.user){
    console.log ("user logged in"); //TODO deleteme
    deleteTextbookFromUser(req.user, req.params.ID)
    .then(function(resolve){
      res.send(resolve);
      console.log("Successfully Deleted Textbook");
    }).catch(function(err){
      // need error handling
      console.log(err);
      res.status(402).send("Error deleting textbook: "+ err);
    });
  } else {
    console.log("No User Logged In");
    res.status(401).send('No User Logged In');
  }
});


module.exports = router;
