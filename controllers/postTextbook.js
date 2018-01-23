const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

//adds textBook FrontendTextbook to the database with error checking
exports.postTextbook = function(FrontendTextbook){
  //perform basic error checking on textbook object
  return ensureTextbookValid(FrontendTextbook)
  .then(function(resolve){
    //promise is resolved if textbook is valid
    //Create instance of Textbook model (Document) and parse in user data
    var newTextbook = new Textbook({
      title: FrontendTextbook.title,
      isbn: FrontendTextbook.isbn,
      publisher: FrontendTextbook.publisher,
      author: FrontendTextbook.author,
      price: FrontendTextbook.price,
    });
    //save textbook entry into the database
    return  newTextbook.save();
  })
  .then( function(resolve){
    //textbook saved properly, resolve object should
    //hold textbook data, including _id prop
    var user = {//example 13mtfb user
      id: "5a1c1b2562651033b86008c0"
    };
    //Saves the _id of the posted textbook into the postedtextbooks[] array
    //of the associated user
    return Promise.all([resolve,User.findByIdAndUpdate(user.id, {$push:{postedtextbooks: resolve._id}})]);
  });
};

//Returns a resolved promise based on whether the textbook parameters are validated
//rejects the promise if parameters are invalid
ensureTextbookValid = function(textbook){
  //The queried parameters are those that are required in the frontend form at the moment
  //Therefore only checking on the request is done
    if(textbook.title == undefined){
      //this should throw an error to frontend
      return Promise.reject("No title");
    }
    if(textbook.author == undefined){
      return Promise.reject("No author");
    }
    if(textbook.price == undefined){
      return Promise.reject("No price");
    }
    return Promise.resolve("textbook is validated");
}
