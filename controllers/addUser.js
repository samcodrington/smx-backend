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

  newUser.save().then(function(resolve,reject){
    if (resolve){ console.log("save succesfull");}
  });

};

module.exports = addUser;
