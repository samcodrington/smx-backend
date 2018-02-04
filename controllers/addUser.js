const mongoose = require('mongoose');
const User = require("../models/userSchema");

//adds user FrontendUser to the database with error checking
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
        //console.log("USER TAKEN");
        return Promise.reject("User is taken");
      }
      else {
        //perform error checking on user
        return ensureUserValid(FrontendUser);
      }
  })
  .then( function(resolve){
    //Create instance of User model (Document) and parse in user data
    var newUser = new User({
      username: FrontendUser.username,
      password: FrontendUser.password,
      nameFirst: FrontendUser.nameFirst,
      nameLast: FrontendUser.nameLast,
      email: FrontendUser.email,
      school: FrontendUser.school,
    });
    //return promise on previous promise and saving record to database
    return Promise.all(resolve,newUser.save());
  });
};

//supporting functions for addUser function

//Returns a resolved promise based on whether the user parameters are validated
//rejects the promise if parameters are invalid
ensureUserValid = function(user){
    if(user.password == undefined){
      //this should throw an error to frontend
      return Promise.reject("No password");
    }
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
    if (ensureEmailValid(user.email) == 0){
      //this should throw an error to frontend
      return Promise.reject("invalid email");
    }
    if (user.school == undefined){
      //could either implement this as a dropdown list or try to match the string
      //to a list of saved schools
    }
    return Promise.resolve("User is validated");
}


//returns a 1 if email is valid
ensureEmailValid = function(email){
  //string is valid if it is in the form string@string.string
  var at = email.indexOf("@");
  var atLast = email.lastIndexOf("@");
  var periodLast = email.indexOf(".");
  //ensure only one occurence of @ sign
  //ensure a period (for web domain occcurs after @ sign)
  if (at == atLast && periodLast > atLast){
    return 1;
  }
  else {
    return 0;
  }
};
