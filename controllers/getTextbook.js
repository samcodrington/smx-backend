const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

var books = require('google-books-search');


//returns one textbook object based on its ID
exports.getOneTextbook = function(textbookID){
  var title;
  return Textbook.findById(textbookID).then(function(resolve){
    return Promise.all([resolve,getUserEmail(resolve.owner),thumbnail(resolve.title)]);
  })
};

//returns an array of textbook objects based on the IDs stored in the user
//document savedTextbooks[] array of the associated userID
exports.getUserSavedTextbook = function(userID){
  return User.findById(userID)
  .then( function(resolve){
      if (resolve){
      //convert the ID array into an objectID array for the find function
      const textbookObjectId = resolve.savedtextbooks.map( function(element){
        return new mongoose.Types.ObjectId(element);
      });
      //returns all textbooks which have an _id which matches
      return Textbook.find({'_id' : { $in: textbookObjectId } });
      }
      else {
        return Promise.reject("Cannot read saved textbooks of user");
      }
  })
};

//returns an array of textbook objects based on the IDs stored in the user
//document postedTextbooks[] array of the associated userID
exports.getUserPostedTextbook = function(userID){
  return User.findById(userID)
  .then( function(resolve){
      if (resolve){
      //convert the ID array into an objectID array for the find function
      const textbookObjectId = resolve.postedtextbooks.map( function(element){
        return new mongoose.Types.ObjectId(element);
      });
      //returns all textbooks which have an _id which matches
      return Textbook.find({'_id' : { $in: textbookObjectId } });
      }
      else {
        return Promise.reject("Cannot read posted textbooks of user");
      }
  })
};


//utility functions

//return the email of the user which owners the textbook
getUserEmail = function(id){
  return User.findById(id).then(function(resolve){
    return Promise.resolve(resolve.email);
  })
}

//use the google books api to return a textbook thumbnail
thumbnail = function(title){
 return new Promise(function(resolve,reject){
  books.search(title, function(err, data) {
    if (err !== null) return reject(err);
    //console.log(data);
    resolve(data[0].thumbnail.replace('zoom=1', 'zoom=0'));
  })
 });
}
