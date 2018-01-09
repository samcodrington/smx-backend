const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");

//adds textBook FrontendTextbook to the database with error checking
exports.postTextbook = function(FrontendTextbook){
  //perform basic error checking on textbook object
  //Create instance of Textbook model (Document) and parse in user data
  console.log("title: ", FrontendTextbook.title);
  var newTextbook = new Textbook({
    title: FrontendTextbook.title,
    isbn: FrontendTextbook.isbn,
    publisher: FrontendTextbook.publisher,
    author: FrontendTextbook.author,
    price: FrontendTextbook.price,
  });
  return  newTextbook.save();
};
