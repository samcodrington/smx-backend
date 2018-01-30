const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

exports.getOneTextbook = function(textbookID){
  return Textbook.findById(textbookID);
};
exports.getUserSavedTextbook = function(userID){
};
exports.getUserPostedTextbook = function(username){
};
