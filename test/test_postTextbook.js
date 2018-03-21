const assert = require("assert");
const addUser = require("../controllers/addUser.js");
const postTextbook = require("../controllers/postTextbook.js");
const User = require("../models/userSchema");
const Textbook = require("../models/textbookSchema");

//Assumes testMocha user from test_addUser exists in the database

//describe tests
describe("Posting Textbook (postTextbook() controller)",function(){

  var _id;

  //Add a valid user to the database
  before(function(done){
    var user = ({
      username: "testMocha",
      password: "test",
    });
    //before each test drop the test user
    User.deleteOne({username: user.username}).then(function(resolve){
    addUser.addUser(user).then(function(resolve){
      _id = resolve._id; //use the _id field for next tests
      done();
      }).catch(function(err){
        done(err);
      });
    });
  });

  it("Attempt to post a textbook",function(done){
    var textbook = ({
      title: "test",
      isbn: "999-999-999",
      publisher: "test",
      author: "test",
      price: "$9.99",
    });
    postTextbook.postTextbook(textbook,_id).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to post a textbook with no price",function(done){
    var textbook = ({
      title: "test",
      isbn: "999-999-999",
      publisher: "test",
      author: "test",
    });
    postTextbook.postTextbook(textbook,_id).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to post a textbook with no title",function(done){
    var textbook = ({
      isbn: "999-999-999",
      publisher: "test",
      author: "test",
      price: "$9.99",
    });
    postTextbook.postTextbook(textbook,_id).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to post a textbook with an invalid user ID",function(done){
    var textbook = ({
      title: "test",
      isbn: "999-999-999",
      publisher: "test",
      author: "test",
      price: "$9.99",
    });
    var id = "4";   //bogus ID
    postTextbook.postTextbook(textbook,id).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

});
