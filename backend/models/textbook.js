const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and model
const textbookSchema = new Schema({
  title: String,
});

const Textbook = mongoose.model("textbook", textbookSchema);

module.exports = Textbook;
