const assert = require("assert");
const addUser = require("../controllers/addUser.js");
const User = require("../models/userSchema");


//describe tests
describe("Adding User (addUser() controller)",function(){

  var _id;

  //before each test drop the test user
  it("Attempt to delete the test user from the database", function(done){
    User.deleteOne({username: 'testMocha'}).then(function(){
      done();//tell mocha that test is done
    });
  });

  //create tests
  it("Attempt to save a user without a password to the database",function(done){
    var user = ({
      username: "testMocha",
    });
    addUser.addUser(user).then(function(resolve){
      _id = resolve._id; //use the _id field for next tests
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to save a valid user to the database",function(done){
    var user = ({
      username: "testMocha",
      password: "test",
    });
    addUser.addUser(user).then(function(resolve){
      _id = resolve._id; //use the _id field for next tests
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to save the same user to the database",function(done){
    var user = ({
      username: "testMocha",
      password: "test"
    });
    addUser.addUser(user).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to save a user with a missing email",function(done){
    var user = ({
      username: "testMocha",
      password: "test",
      _id: _id,
      nameFirst: "test3",
      nameLast: "test",
      school: "test"
    });
    addUser.addUserInfo(user).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });


});
