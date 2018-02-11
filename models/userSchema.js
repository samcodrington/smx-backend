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
}, {timestamps: {createdAt: 'created_at'}//timestamps store UTC time by default
});

const User = mongoose.model(process.env.REACT_APP_USER_COLLECTION || "user", userSchema);

module.exports = User;
