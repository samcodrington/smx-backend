const mongoose = require('mongoose');
const Textbook = require("../models/textbookSchema");
const User = require("../models/userSchema");

exports.deleteTextbook = function(textbookID){
    Textbook.findByIdAndRemove(textbookID)
    .then(function (resolve) {
        if (err) return handleError(err);
        // removed!
    });
}
exports.deleteTextbookFromUser = function(textbookID, UserID){
    User.findById(UserID, function(err, u){
        if (err) return "unable to find User"
        if (u.postedtextbooks.includes({"id": textbookID})){
            u.postedtextbooks.delete({"id": textbookID});
            return u;
        }
        else return "User does not have textbook";
    });    
}
exports.deleteAllUserTextbooks = function(UserID){
    return User.findByIdAndUpdate(UserID, {postedtextbooks: null});
}