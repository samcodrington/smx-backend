const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and model
const textbookSchema = new Schema({
  title: String,
  isbn: String,
  publisher: String,
  author: String,
  price: String,
  associatedprogram: String,
  Condition: String,
  owner: String,            //primary key of user record that owns textbook
  Tags: [String]            //Optional tags field to for searching
});

const Textbook = mongoose.model("textbook", textbookSchema);

module.exports = Textbook;
