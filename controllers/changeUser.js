const mongoose = require('mongoose');
const User = require("../models/userSchema");

//determines which fields were changed on the user schema and calls updateFields()
//a password or username field require additional calls to checkPassword() and
//checkUsername(), respectively
//due to the format of the user form. There are three possible use cases for this function call,
//which is passed as a integer in the second parameter of the function
// useCase == 1: Profile form (nameFirst,nameLast,email,school)
// useCase == 2: Account form (username, password)
// useCase == 3: Delete account
exports.changeUser = function(user, useCase){
  //determine which fields are being changed
  if (useCase===1){//Profile form
    return findByIdAndUpdate(user._id, {nameFirst: user.nameFirst, nameLast: user.nameLast, email: user.email, school: user.school});
  }
  else if (useCase===2){//Account form
    //Assume valid password determined by frontend
    if (!(user.username===undefined)){//username is being updated
      return checkUsername(user.username)
      .then(function(resolve){//new username is unique
        return Promise.all(resolve, findByIdAndUpdate(user._id, {username: user.username, password: user.password}));
      });
    }
    else { //only password change
      return findByIdAndUpdate(user._id, {password: user.password});
    }
  }
  else if (useCase===3){//Delete account

  }
  else {//invalid use case
    return Promise.reject("Invalid setting change");
  }
};

//supporting functions for changeUser function

//determines if the old password matches the current password stored in the database
//accepts user._id and user.password as parameters
// checkPassword = function(id,password){
//   return User.findById(id)
//   .then(function(resolve){
//     //a normal use case involves a logged in user with an existing record in the databse
//     //which should populate the resolve object.
//     if (resolve.password===password){
//       Promise.resolve("passwords match");
//     }
//     else {
//       Promise.reject("passwords do not match");
//     }
//   });
// }

//determines if the new username is unique in the database
//accepts user.username as a parameter
checkUsername = function(username){
  return  User.findOne({username: username})
  .then(function(resolve){
      //check to see if returned user record matches username
      //resolve returns a record if an entry exists, if not it returnes a
      //null object
      if (resolve){
          //this should throw an error to frontend
          console.log("USER TAKEN");
          return Promise.reject("User is taken");
        }
        else {
          //Return valid promise to changeUser function
          return Promise.resolve("user is unique");
        }
    });
}
