const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");

//returns an array of textbook documents which match the search parameter
exports.searchTextbook = function(searchField){
  //perform basic error checking on the searchField variable
  if (searchField === ''){
    //return promise error
  }
  //parse a regular expression to use in search query
  var searchString = parseRegularExpression(searchField);
  console.log("searchString=" + searchString);
  return  Textbook.find({$or:[
    {title: searchString},
    {isbn: searchString},
    {publisher: searchString},
    {author: searchString},
    {associatedprogram: searchString},
    {Condition: searchString}
    //Ignore for now
    //{price: searchString},
    //owner: searchString,            //primary key of user record that owns textbook
    //Tags: [String]            //Optional tags field to for searching
  ]})
  .then(function(resolve){
    console.log(JSON.stringify(resolve));
    console.log("Number of results: "+resolve.length);
    //call orderResponse with resolve object
    if (!isEmpty(resolve)){ //resolve promise if object not emptpy, i.e. at least one result was found
    return Promise.resolve(resolve);
    }
    else {
    return Promise.reject("No results!");
    }
  });
};


//returns a regular expression which ignores whitespace and capitalization
parseRegularExpression = function(string){
  //to implement
  //replace ignores difference between word spacing in searchsting and matches
  var ignoreSpace = string.replace(/\s+/,"\\s+");
  //modifier i ignore capitalization
  return new RegExp(ignoreSpace, 'i');
  //return string
};

//returns an ordered object array based on relevent parameters
orderResponse = function(textbookArray){
  //to implement
};

//return true if search result has no entries
isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
