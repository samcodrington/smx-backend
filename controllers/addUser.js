const mongoose = require('mongoose');
const User = require("../models/user");


var addUser = function(FrontendUser){
//Parse frontend input into user schema
var newUser = new User({
  username: FrontendUser.username,
  password: FrontendUser.password,
  nameFirst: FrontendUser.nameFirst,
  nameLast: FrontendUser.nameLast,
  email: FrontendUser.email,
  school: FrontendUser.school,
});

newUser.save().then(function(){//create a promise on this method
  console.log("saved user to DB");
}).on("error",function(error){
  console.log("add user error");
});//asynchronous process

};

module.exports = addUser;
