const assert = require("assert");
const changeUser = require("../controllers/changeUser.js");
const addUser = require("../controllers/addUser.js");
const User = require("../models/userSchema");

//Assumes testMocha user from test_addUser exists in the database

//describe tests
describe("Changing User (changeUser() controller)",function(){

  var _id;

  //Add the valid user to the database
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

  it("Attempt to change the users information in the database",function(done){
    var user = ({
      username: "testMocha",
      _id : _id,
      password: "test",
      nameFirst: "test3",
      nameLast: "test",
      email: "test@test.ca",
      school: "test",
    });
    changeUser.changeUser(user,1).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to change incomplete user's information in the database",function(done){
    var user = ({
      username: "testMocha",
      _id : _id,
      password: "test",
      nameLast: "test",
      email: "test@test.ca",
      school: "test",
    });
    changeUser.changeUser(user,1).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });


  it("Attempt to change user's username to one already taken",function(done){
    var user = ({
      username: "testMocha",
      _id : _id,
      password: "test",
    });
    changeUser.changeUser(user,2).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it("Attempt to delete Users account",function(done){
    var user = ({
      username: "testMocha",
      _id : _id,
      password: "test",
    });
    changeUser.changeUser(user,3).then(function(){
      done();
    }).catch(function(err){
      done(err);
    });
  });


});
