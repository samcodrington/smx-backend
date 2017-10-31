const mongoose = require('mongoose');
const User = require("../models/user");

//adds user FrontendUser to the database with error checking
exports.addUser = function(FrontendUser){
  //perform basic error checking on user object
  console.log(ensureUsernameUnique(FrontendUser.username));
  if(ensureUsernameUnique(FrontendUser.username) == 0){
    console.log("ensure - if statement");
    //ensure that username is unique (i.e. hasn't already been taken)
    //this should throw an error
  }
  if(FrontendUser.password == undefined){
    //this should throw an error
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
    //this should throw an error
    console.log("invalid email");
  }
  if (FrontendUser.school == undefined){
    //could either implement this as a dropdown list or try to match the string
    //to a list of saved schools
  }

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




//returns a 1 if username is unique
ensureUsernameUnique = function(username){
  User.find({username: username}).then(function(result,error){
    if(result.name == username){ return 0; console.log("username already exists");}
    else { return 1; console.log("username is unique");}
    if (error){console.log("error - cannot determine unique user");}
  });
  console.log("end of username unique");
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
