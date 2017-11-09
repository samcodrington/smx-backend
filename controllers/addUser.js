const mongoose = require('mongoose');
const User = require("../models/user");

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
        console.log("USER TAKEN");
        return Promise.reject("User is taken");
      }
      else {
        console.log("USER UNIQUE");
        //perform error checking on user
        if(FrontendUser.password == undefined){
          //this should throw an error to frontend
          return Promise.reject("No password");
        }
        if(FrontendUser.nameFirst == undefined){
          //behaviour on no name being entered. My thought right now is that we
          //keep to nosql design and not waste storage by storing a default value
          //other checks could be done here though
        }
        if(FrontendUser.nameLast == undefined){
          //See nameFirst
        }
        if (ensureEmailValid(FrontendUser.email) == 0){
          //this should throw an error to frontend
          console.log("invalid email");
        }
        if (FrontendUser.school == undefined){
          //could either implement this as a dropdown list or try to match the string
          //to a list of saved schools
        }
        return Promise.resolve("User validated");
      }
  })
  .then( function(resolve){
    //Parse frontend input into user schema
    var newUser = new User({
      username: FrontendUser.username,
      password: FrontendUser.password,
      nameFirst: FrontendUser.nameFirst,
      nameLast: FrontendUser.nameLast,
      email: FrontendUser.email,
      school: FrontendUser.school,
    });
    return Promise.all(resolve,newUser.save());
  });
};

//Authenticates user requesting login by returning a promise on the database
//findOne method:
//resolve NULL - user is invalid
//otherwise user is valid
exports.validateUserLogin = function(user){
  //asssume user object contains username and password as parameters
return User.findOne({username: user.username, password: user.password});
};


//returns a 1 if email is valid
ensureEmailValid = function(email){
  //string is valid if it is in the form string@string.string
  var at = email.indexOf("@");
  var atLast = email.lastIndexOf("@");
  var periodLast = email.indexOf(".");
  //ensure only one occurence of @ sign
  //ensure a period (for web domain occcurs after @ sign)
  if (at == atLast && periodLast > atLast){
    console.log("valid email")
    return 1;
  }
  else {
    return 0;
  }
};
