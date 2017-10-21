const secret = require('../../credentials.js');
const mongoose = require('mongoose');
const Textbook = require("../models/textbook");

//ES6 Promises
mongoose.Promise = global.Promise;

var database = function(){
  mongoose.connect(secret);

  mongoose.connection.once("open",function(){
    console.log("connection has been made, now make fireworks...");
  }).on("error",function(error){
    console.log("error");
  });

  var text = new Textbook({
    name: "test"
  });

  text.save().then(function(){//create a promise on this method
  });//asynchronous process

}

module.exports = database;
