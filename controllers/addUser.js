const mongoose = require('mongoose');
const User = require("../models/userSchema");

//adds user FrontendUser to the database with error checking
exports.addUserInfo = function(FrontendUser){
  return ensureUserValid(FrontendUser)
    .then( function(resolve){
      //update the user information
      console.log(FrontendUser._id);
      return User.findByIdAndUpdate(
        FrontendUser._id,
        {nameFirst: FrontendUser.nameFirst,
          nameLast: FrontendUser.nameLast,
          email: FrontendUser.email,
          school: FrontendUser.school
        }, {new: true});
  });
}

//adds user FrontendUser to the database with error checking
//this method solely adds username and password data
//this addUserInfo method takes care of the rest of the data
exports.addUser = function(FrontendUser){
  //perform basic error checking on user object
  //ensure that username is unique (i.e. hasn't already been taken)
return  User.findOne({username: FrontendUser.username})
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
        //make sure password is validated
        return ensurePasswordValid(FrontendUser);
      }
    }).then(function(resolve){
        //Create instance of User model (Document) and parse in user data
        var newUser = new User({
          username: FrontendUser.username,
          password: FrontendUser.password,
        });
        //return promise on previous promise and saving record to database
        return newUser.save();
      });
};

//supporting functions for addUser function

//Returns a resolved promise based on whether the user password is validated
//rejects the promise if password is invalid
ensurePasswordValid = function(user){
  if(user.password == undefined){
    //this should throw an error to frontend
    return Promise.reject("No password");
  }
  return Promise.resolve("Password is validated");
}

//Returns a resolved promise based on whether the user parameters are validated
//rejects the promise if parameters are invalid
ensureUserValid = function(user){
    if(user.nameFirst == undefined){
      //behaviour on no name being entered. My thought right now is that we
      //keep to nosql design and not waste storage by storing a default value
      //other checks could be done here though
      return Promise.reject("No first name");
    }
    if(user.nameLast == undefined){
      //See nameFirst
      return Promise.reject("No last name");
    }
    if (user.email == undefined){
      //this should throw an error to frontend
      return Promise.reject("No email");
    }
    if (user.school == undefined){
      //could either implement this as a dropdown list or try to match the string
      //to a list of saved schools
    }
    return Promise.resolve("User is validated");
}
