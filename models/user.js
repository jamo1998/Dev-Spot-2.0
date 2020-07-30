const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  username: {
    type: String,
    required: true,
  },
  bio: {
    type: String
  },
  githubURL: {
    type: String,
    required: true
  },
  linkedinURL: {
    type: String,
    required: true
  },
  portfolioURL: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;