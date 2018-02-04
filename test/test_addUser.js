const assert = require("assert");
const addUser = require("../controllers/addUser.js");
const User = require("../models/userSchema");


//describe tests
describe("Adding User (addUser() function)",function(){

  //before each test drop the test user
  it("deletes the test user from the database", function(done){
    User.deleteOne({username: 'testMocha'}).then(function(){
      done();//tell mocha that test is done
    });
  });

  //create tests
  it("saves a user with an invalid email",function(done){
    var user = ({
      username: "testMocha",
      password: "test",
      nameFirst: "test1",
      nameLast: "test",
      email: "invalid",
      school: "test",
    });
    addUser.addUser(user).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("saves a user with a missing password field",function(done){
    var user = ({
      username: "testMocha",
      nameFirst: "test2",
      nameLast: "test",
      email: "test@test.ca",
      school: "test",
    });
    addUser.addUser(user).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  //create tests
  it("saves a valid user to the database",function(done){
    var user = ({
      username: "testMocha",
      password: "test",
      nameFirst: "test3",
      nameLast: "test",
      email: "test@test.ca",
      school: "test",
    });
    addUser.addUser(user).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  //create tests
  it("saves the same user to the database",function(done){
    var user = ({
      username: "testMocha",
      password: "test",
      nameFirst: "test4",
      nameLast: "test",
      email: "test@test.ca",
      school: "test",
    });
    addUser.addUser(user).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });


});
