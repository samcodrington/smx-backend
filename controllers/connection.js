const secret = require('../credentials.js');
const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;


mongoose.connect(secret, {
    useMongoClient: true
});

mongoose.connection.once("open",function(){
  console.log("connection succesfull");
}).on("error",function(error){
  console.log("database connection error");
});

module.exports = mongoose;
