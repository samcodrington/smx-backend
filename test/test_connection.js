const mongoose = require('mongoose');
const secret = require('../credentials.js');

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to the db before tests run
before(function(done){    //tells mocha to wait before running tests
  //Connect to mongodb
  mongoose.connect(secret, {
      useMongoClient: true
  });

  mongoose.connection.once("open",function(){
    console.log("Connected to test database");
    done(); //tell mocha it was succesfull
  }).on("error",function(error){
    console.log("database connection error");
  });

});

//Drop the characters collection before each test
//beforeEach(function(done){
  //drop the collection
  //mongoose.connection.collections.User.drop(function(){
  // done();
  //});
//});
