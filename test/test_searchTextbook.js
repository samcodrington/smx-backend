const assert = require("assert");
const addUser = require("../controllers/addUser.js");
const postTextbook = require("../controllers/postTextbook.js");
const deleteTextbook = require("../controllers/deleteTextbook.js");
const searchTextbook = require("../controllers/searchTextbook.js");
const User = require("../models/userSchema");
const Textbook = require("../models/textbookSchema");
const mongoose = require('mongoose');

//Assumes testMocha user from test_addUser exists in the database

//describe tests
describe("search Textbook (searchTextbook() controller)",function(){

  var _uid;
  var _tid;

  //Add a valid user and textbook to the database
  before(function(done){
    var user = ({
      username: "testMocha",
      password: "test",
    });
    var textbook = ({
      title: "test",
      isbn: "999-999-999",
      publisher: "test",
      author: "test",
      price: "$9.99",
    });
    //before each test drop the test user
    User.deleteOne({username: user.username}).then(function(resolve){
      addUser.addUser(user).then(function(resolve){
        _uid = resolve._id; //use the _id field for next tests
      }).then(function(resolve){
        postTextbook.postTextbook(textbook,_uid).then(function(resolve){
          _tid = resolve[0]._id; //parse posted textbook ID
          done();
        }).catch(function(err){
          done(err);
        });
      })
    });
  });

  it("Attempt to search with a searchstring",function(done){
    searchTextbook.searchTextbook("test").then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });


  it("Attempt to search with a blank searchstring",function(done){
    searchTextbook.searchTextbook("").then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

});
