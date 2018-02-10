const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

//returns one textbook object based on its ID
exports.getOneTextbook = function(textbookID){
  var email;
  return Textbook.findById(textbookID).then(function(resolve){
    return Promise.all([resolve,getUserEmail(resolve.owner)]);
  })
};

//returns an array of textbook objects based on the IDs stored in the user
//document savedTextbooks[] array of the associated userID
exports.getUserSavedTextbook = function(userID){
  return User.findById(userID)
  .then( function(resolve){
      //convert the ID array into an objectID array for the find function
      const textbookObjectId = resolve.savedtextbooks.map( function(element){
        return new mongoose.Types.ObjectId(element);
      });
      //returns all textbooks which have an _id which matches
      return Textbook.find({'_id' : { $in: textbookObjectId } });
  })
};

//returns an array of textbook objects based on the IDs stored in the user
//document postedTextbooks[] array of the associated userID
exports.getUserPostedTextbook = function(userID){
  return User.findById(userID)
  .then( function(resolve){
      //convert the ID array into an objectID array for the find function
      const textbookObjectId = resolve.postedtextbooks.map( function(element){
        return new mongoose.Types.ObjectId(element);
      });
      //returns all textbooks which have an _id which matches
      return Textbook.find({'_id' : { $in: textbookObjectId } });
  })
};


//utility functions

//return the email of the user which owners the textbook
getUserEmail = function(id){
  return User.findById(id).then(function(resolve){
    return Promise.resolve({email: resolve.email});
  })
}
