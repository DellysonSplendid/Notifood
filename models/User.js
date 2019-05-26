const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  password2: {
    required: true,
    type: String
  },
  profilePicture: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let User = mongoose.model("User", userSchema);
module.exports = User;
