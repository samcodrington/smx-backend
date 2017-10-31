const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and model
const userSchema = new Schema({
  username: String,
  password: String,
  nameFirst: String,
  nameLast: String,
  email: String,
  school: String,
  postedtextbooks: [],  //stores primary key of textbook records posted by user
  savedtextbooks: [] //stores primary key of textbook records saved by user (for purchasing)
}, {timestamps: {createdAt: 'created_at'}
});

const User = mongoose.model("user", userSchema);

module.exports = User;
