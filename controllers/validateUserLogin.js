const mongoose = require('mongoose');
const User = require("../models/userSchema");

//Authenticates user requesting login by returning a promise on the database
//findOne method:
//resolve NULL - user is invalid
//otherwise user is valid
exports.validateUserLogin = function(user){
  //asssume user object contains username and password as parameters
return User.findOne({username: user.username, password: user.password});
};
