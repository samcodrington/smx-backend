//const secret = require('../credentials.js');
const mongoose = require('mongoose');

var connect_id = process.env.connect_id || secret;

//ES6 Promises
mongoose.Promise = global.Promise;


mongoose.connect(connect_id, {
    useMongoClient: true
});

mongoose.connection.once("open",function(){
  console.log("connection succesfull");
}).on("error",function(error){
  console.log("database connection error");
});

module.exports = mongoose;
